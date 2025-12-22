
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

});

export async function POST(req: Request) {
    try {
        const { productName, quantity, unitAmount, stockType,
            designInstructions, artworkUrls, cupSize, proofingOption
        } = await req.json();

        if (!productName || !quantity || !unitAmount) {
            return NextResponse.json({ error: 'Missing required product details' }, { status: 400 });
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${productName} (${stockType} Stock, ${cupSize})`,
                        description: `Quantity: ${quantity.toLocaleString()}. Instructions: ${designInstructions || 'None'}.`,
                        metadata: {
                            stock_type: stockType,
                            cup_size: cupSize,
                            design_instructions: designInstructions
                        }
                    },
                    unit_amount: Math.round(unitAmount * 100),
                },
                quantity: 1,
            }
        ];

        // Add Proofing Upgrades
        if (proofingOption === 'photo') {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Printed Cup Photo Proof',
                        description: 'We will print one cup, take a photo, and email it to you for approval.',
                    },
                    unit_amount: 999, // $9.99
                },
                quantity: 1,
            });
        } else if (proofingOption === 'physical') {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Mailed Physical Sample',
                        description: 'We will print one cup and mail it to you for approval (includes shipping).',
                    },
                    unit_amount: 1999, // $19.99
                },
                quantity: 1,
            });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['US'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 1499, currency: 'usd' },
                        display_name: 'Standard Ground Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 5 },
                            maximum: { unit: 'business_day', value: 7 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 3500, currency: 'usd' },
                        display_name: 'Expedited Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 2 },
                            maximum: { unit: 'business_day', value: 3 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 6500, currency: 'usd' },
                        display_name: 'Overnight Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 1 },
                            maximum: { unit: 'business_day', value: 1 },
                        },
                    },
                },
            ],
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/shop`,
            metadata: {
                productName,
                quantity: quantity.toString(),
                stockType: stockType || 'White',
                cupSize: cupSize || 'Unknown',
                designInstructions: designInstructions || 'N/A',
                proofingOption: proofingOption || 'digital',
                artwork_urls: Array.isArray(artworkUrls) ? artworkUrls.join(', ').substring(0, 490) : (artworkUrls || 'N/A'),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error('Stripe Checkout Error:', err);

        // Check for missing key specific error or generic
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('Missing STRIPE_SECRET_KEY in environment variables.');
            return NextResponse.json({ error: 'Server configuration error: Missing Stripe Key' }, { status: 500 });
        }

        return NextResponse.json({
            error: err.message || 'An error occurred during checkout setup',
            details: err.type ? `Stripe Error Type: ${err.type}` : undefined
        }, { status: 500 });
    }
}
