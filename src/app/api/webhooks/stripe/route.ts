
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia', // Use latest or matching version
});

const prisma = new PrismaClient();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    if (!webhookSecret) {
        console.error('Missing STRIPE_WEBHOOK_SECRET');
        return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error('Webhook signature verification failed.', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            await handleCheckoutSessionCompleted(session);
        } catch (error) {
            console.error('Error handling checkout session:', error);
            return NextResponse.json({ error: 'Error processing order' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Guest User';

    if (!customerEmail) {
        throw new Error('No email found in session');
    }

    // 1. Upsert User (Handle Guest Checkout)
    const user = await prisma.user.upsert({
        where: { email: customerEmail },
        update: {}, // No updates if exists
        create: {
            email: customerEmail,
            name: customerName,
            password: '', // No password for guest (prevent login until reset?) or generate random
            role: 'USER',
        },
    });

    const meta = session.metadata || {};

    // 2. Create Order
    // Unit Amount is in cents in Stripe, DB typically stores Decimal or Float. 
    // Schema says `totalAmount Decimal`.
    const totalAmount = (session.amount_total || 0) / 100;

    const order = await prisma.order.create({
        data: {
            userId: user.id,
            status: 'PAID', // Direct to PAID since this is success webhook
            totalAmount: totalAmount,
            quantity: parseInt(meta.quantity || '0', 10),
            details: `Product: ${meta.productName}. Stock: ${meta.stockType}. Size: ${meta.cupSize}. Instructions: ${meta.designInstructions}. Proofing: ${meta.proofingOption}`,
            // Create Mockup Relation inline
            mockups: {
                create: {
                    imageUrl: (meta.artwork_urls || '').split(', ')[0] || '', // Use first image as main
                    status: 'PENDING_REVIEW',
                    userComments: meta.designInstructions
                }
            }
        }
    });

    console.log(`Order ${order.id} created for user ${user.email}`);
}
