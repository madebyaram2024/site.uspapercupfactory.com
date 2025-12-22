import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';

export const metadata: Metadata = {
    title: "Shop Custom Paper Cups | Low MOQ (25+) | US Paper Cup Factory",
    description: "Order high-quality custom printed paper cups starting at just 25 units. Includes 1 free professional design, 1 free revision, and a free 3D mockup with every order.",
};

const products = [
    { qty: "25 Cups", price: 50.00, perCup: "$2.00", img: "/images/order-quantity-25-custom-cups.png", alt: "25 Custom Printed Paper Cups - Starter Pack", features: ["1 Free Professional Design", "1 Free Revision"] },
    { qty: "50 Cups", price: 75.00, perCup: "$1.50", img: "/images/order-quantity-50-custom-cups.png", alt: "50 Custom Printed Paper Cups - Preferred for Small Businesses", features: ["1 Free Professional Design", "1 Free Revision"] },
    { qty: "100 Cups", price: 100.00, perCup: "$1.00", img: "/images/order-quantity-100-custom-cups.png", alt: "100 Custom Printed Paper Cups - Perfect for Events", features: ["1 Free Professional Design", "1 Free Revision"] },
    { qty: "250 Cups", price: 187.50, perCup: "$0.75", img: "/images/order-quantity-250-custom-cups.png", alt: "250 Custom Printed Paper Cups - Professional Branding Tier", features: ["1 Free Professional Design", "1 Free Revision"] },
    { qty: "500 Cups", price: 250.00, perCup: "$0.50", img: "/images/order-quantity-500-custom-cups.png", alt: "500 Custom Printed Paper Cups - Bulk Order Savings", features: ["1 Free Professional Design", "1 Free Revision"], isPopular: true },
    { qty: "1,000 Cups", price: 200.00, perCup: "$0.20", img: "/images/order-quantity-1000-custom-cups.png", alt: "1,000 Custom Printed Paper Cups - High Volume Solutions", features: ["1 Free Professional Design", "1 Free Revision"] },
    { qty: "5,000 Cups", price: 750.00, perCup: "$0.15", img: "/images/order-quantity-5000-custom-cups.png", alt: "5,000 Custom Printed Paper Cups - Industrial Scale Production", features: ["1 Free Professional Design", "1 Free Revision"] },
];

export default function ShopPage() {
    return (
        <>
            <Navbar />
            <main style={{ padding: '6rem 0' }} className="animate-fade-in-up">
                <div className="container">
                    {/* Hero Section */}
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                            Premium Custom Paper Cups
                        </h1>
                        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Transform your brand with professional, USA-made custom cups. Ordering starts at just <strong>25 units</strong>. Every order includes a free professional design, one free revision, and a 3D mockup.
                        </p>
                    </div>

                    {/* Pricing Grid */}
                    <div className="shop-grid">
                        {products.map((product, idx) => (
                            <div key={idx} className={`shop-card ${product.isPopular ? 'shop-card-popular' : ''}`}>
                                {product.isPopular && <div className="popular-badge">MOST POPULAR</div>}

                                <div style={{ height: '240px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    <Image
                                        src={product.img}
                                        alt={product.alt}
                                        width={280}
                                        height={280}
                                        style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}
                                    />
                                </div>

                                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{product.qty}</h3>
                                <div className="price-tag">${product.price.toFixed(2)}</div>
                                <div className="unit-price">{product.perCup} per cup</div>

                                <ul className="feature-list">
                                    {product.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="feature-item">
                                            <svg className="feature-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                    <li className="feature-item">
                                        <svg className="feature-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Free 3D Mockup
                                    </li>
                                </ul>

                                <BuyButton
                                    productName={product.qty}
                                    quantity={parseInt(product.qty.replace(/,/g, ''))}
                                    unitAmount={product.price}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '16px' }}
                                >
                                    GET MOCKUP & ORDER
                                </BuyButton>
                            </div>
                        ))}

                        {/* Enterprise Tier */}
                        <div className="shop-card" style={{ background: 'var(--color-navy)', color: 'white' }}>
                            <div style={{ height: '240px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    src="/images/order-quantity-10000-custom-cups.png"
                                    alt="Custom Paper Cups - Enterprise Bulk Solutions"
                                    width={280}
                                    height={280}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>10,000+ Units</h3>
                            <div className="price-tag" style={{ color: 'var(--color-gold)' }}>Custom Quote</div>
                            <div className="unit-price" style={{ color: 'rgba(255,255,255,0.7)' }}>Tailored volume pricing</div>

                            <ul className="feature-list">
                                <li className="feature-item" style={{ color: 'white' }}>
                                    <svg className="feature-icon" style={{ color: 'var(--color-gold)' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    White-Label Manufacturing
                                </li>
                                <li className="feature-item" style={{ color: 'white' }}>
                                    <svg className="feature-icon" style={{ color: 'var(--color-gold)' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Dedicated Account Support
                                </li>
                                <li className="feature-item" style={{ color: 'white' }}>
                                    <svg className="feature-icon" style={{ color: 'var(--color-gold)' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Priority Production
                                </li>
                            </ul>

                            <a href="/contact" className="btn btn-secondary" style={{ width: '100%', borderColor: 'white', color: 'white', padding: '16px' }}>
                                GET ENTERPRISE QUOTE
                            </a>
                        </div>
                    </div>

                    {/* Value Prop Section */}
                    <div style={{ marginTop: '10rem', padding: '5rem', background: 'var(--color-navy)', borderRadius: 'var(--radius-lg)', color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}>
                            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M200 0L244.903 155.097L400 200L244.903 244.903L200 400L155.097 244.903L0 200L155.097 155.097L200 0Z" fill="white" />
                            </svg>
                        </div>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Professional Service Standard</h2>
                            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem', color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>
                                Every order placed with US Paper Cup Factory is handled with premium white-glove service. We don't just print cups; we build your brand's physical identity.
                            </p>
                            <div className="grid-3-cols" style={{ gap: '3rem' }}>
                                {[
                                    { title: "Universal Design", desc: "Our in-house design team ensures your logo looks perfect on every curve. 1 free design and 1 free revision included with every order." },
                                    { title: "No Hidden Fees", desc: "What you see is what you pay. Zero setup costs, zero film fees, and transparent unit pricing across all tiers." },
                                    { title: "Domestic Shipping", desc: "Proudly manufactured in Huntington Beach, CA. We offer various shipping options at checkout to ensure your order arrives exactly when you need it." }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <h4 style={{ color: 'var(--color-gold)', fontSize: '1.3rem', marginBottom: '1rem' }}>{item.title}</h4>
                                        <p style={{ lineHeight: '1.6', fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* How It Works Flow */}
                    <div style={{ marginTop: '10rem' }}>
                        <h2 className="section-title">Design to Delivery in 3 Easy Steps</h2>
                        <div className="flow-container">
                            {[
                                {
                                    num: 1,
                                    title: "Select & Secure",
                                    desc: "Choose your quantity and place your order. Our team immediately receives your asset requirements.",
                                    icon: "🛒"
                                },
                                {
                                    num: 2,
                                    title: "Collaborative Design",
                                    desc: "We craft a high-resolution 3D mockup of your cup. Review, request edits, and approve when it's perfect.",
                                    icon: "🎨"
                                },
                                {
                                    num: 3,
                                    title: "Precision Print",
                                    desc: "Your order hits the floor in our CA facility. We manufacture, quality-check, and ship directly to you.",
                                    icon: "🏭"
                                }
                            ].map((step, idx) => (
                                <div key={idx} className="flow-step">
                                    <div className="step-icon-wrap">
                                        <div className="step-number">{step.num}</div>
                                        {step.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{step.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '8rem', textAlign: 'center' }}>
                        <a href="/pricelist" target="_blank" className="btn btn-secondary" style={{ padding: '20px 50px', fontSize: '1.1rem' }}>
                            📄 View Full Printable Price List
                        </a>
                    </div>
                </div>
            </main >
        </>
    );
}
