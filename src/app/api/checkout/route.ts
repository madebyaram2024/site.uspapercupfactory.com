
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion: '2024-12-18.acacia', // Removed to fix build error
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productName, price, quantity, unitAmount, designPreference, designInstructions, stockType, cupSize } = body;

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${productName} (${stockType} Stock, ${cupSize})`,
                            description: `Quantity: ${quantity.toLocaleString()}. Design: ${designPreference}. Instructions: ${designInstructions}`,
                            // images: ['https://example.com/cup-image.png'], // Optional: Add dynamic images later
                        },
                        unit_amount: Math.round(unitAmount * 100), // Stripe expects amounts in cents
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/shop`,
            metadata: {
                productName,
                quantity: quantity.toString(),
                stockType: stockType || 'White',
                cupSize: cupSize || 'Unknown',
                designPreference, // 'Upload Own' or 'Professional Design'
                designInstructions: designInstructions || 'N/A', // The user's text input
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
