
import Link from 'next/link';
// import Image from 'next/image';


import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';

export default function ShopPage() {
    return (
        <>
            <Navbar />
            <main style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h1 className="section-title" style={{ marginBottom: '2rem' }}>Shop Custom Cups</h1>
                    <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.2rem', color: '#666' }}>
                        Choose your quantity. All orders include <strong>Free Custom Design</strong> and <strong>Free Shipping</strong> (USA).
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {/* 25 Cups */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ height: '220px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/25.png?v=3" alt="25 Cups" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)' }}>25 Cups</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$50.00</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>$2.00 / cup</p>
                            <BuyButton productName="25 Cups" quantity={25} unitAmount={50.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
                        </div>

                        {/* 50 Cups */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ height: '220px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/50.png?v=3" alt="50 Cups" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)' }}>50 Cups</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$75.00</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>$1.50 / cup</p>
                            <BuyButton productName="50 Cups" quantity={50} unitAmount={75.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
                        </div>

                        {/* 100 Cups */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ height: '220px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/100.png?v=3" alt="100 Cups" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)' }}>100 Cups</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$100.00</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>$1.00 / cup</p>
                            <BuyButton productName="100 Cups" quantity={100} unitAmount={100.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
                        </div>

                        {/* 250 Cups */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ height: '220px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/250.png?v=3" alt="250 Cups" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)' }}>250 Cups</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$187.50</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>$0.75 / cup</p>
                            <BuyButton productName="250 Cups" quantity={250} unitAmount={187.50} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
                        </div>

                        {/* 500 Cups */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', border: '2px solid var(--color-gold)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-gold)', color: 'white', padding: '4px 12px', fontSize: '0.9rem', fontWeight: 'bold', borderRadius: '20px' }}>MOST POPULAR</div>
                            <div style={{ height: '220px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/500.png?v=3" alt="500 Cups" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)' }}>500 Cups</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$250.00</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>$0.50 / cup</p>
                            <BuyButton productName="500 Cups" quantity={500} unitAmount={250.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
                        </div>

                        {/* 1000 Cups */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ height: '220px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/1000.png?v=3" alt="1000 Cups" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)' }}>1,000 Cups</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$200.00</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>$0.20 / cup</p>
                            <BuyButton productName="1,000 Cups" quantity={1000} unitAmount={200.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
                        </div>

                        {/* 5000 Cups */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ height: '220px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/5000.png?v=3" alt="5000 Cups" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)' }}>5,000 Cups</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$750.00</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>$0.15 / cup</p>
                            <BuyButton productName="5,000 Cups" quantity={5000} unitAmount={750.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
                        </div>


                        {/* 10000+ Cups */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ height: '220px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/10000.png?v=3" alt="10000 Cups" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', color: 'var(--color-navy)' }}>10,000+ Cups</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>From $1,000</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>$0.10 / cup</p>
                            <a href="/contact" className="btn btn-primary" style={{ width: '100%' }}>Contact for Quote</a>
                        </div>
                    </div>


                    {/* How It Works Section */}
                    <div style={{ marginTop: '6rem', maxWidth: '900px', margin: '6rem auto 0' }}>
                        <h2 className="section-title" style={{ marginBottom: '3rem' }}>How It Works</h2>

                        {/* Step 1 */}
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', alignItems: 'flex-start', textAlign: 'left' }}>
                            <div style={{
                                flexShrink: 0, width: '50px', height: '50px',
                                background: 'var(--color-navy)', color: 'white',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Oswald'
                            }}>1</div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>You Order & Share Vision</h3>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>
                                    Select your quantity above. During checkout, tell us your occasion, preferred colors, and upload any logos.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', alignItems: 'flex-start', textAlign: 'left' }}>
                            <div style={{
                                flexShrink: 0, width: '50px', height: '50px',
                                background: 'var(--color-red)', color: 'white',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Oswald'
                            }}>2</div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>We Design & Proof</h3>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>
                                    Our AI-assisted design team creates a custom proof for you within 24 hours. You review it online.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', alignItems: 'flex-start', textAlign: 'left' }}>
                            <div style={{
                                flexShrink: 0, width: '50px', height: '50px',
                                background: 'var(--color-gold)', color: 'white',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Oswald'
                            }}>3</div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>We Print & Ship</h3>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666' }}>
                                    Once approved, we manufacture your cups in our US facility and ship them directly to your door.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <a href="/pricelist" target="_blank" className="btn" style={{
                            background: 'white',
                            border: '2px solid var(--color-navy)',
                            color: 'var(--color-navy)',
                            fontWeight: 'bold',
                            padding: '12px 30px',
                            display: 'inline-block',
                            borderRadius: 'var(--radius-sm)',
                            textDecoration: 'none'
                        }}>
                            📄 View Printable Price List
                        </a>
                    </div>
                </div>
            </main >
        </>
    );
}
