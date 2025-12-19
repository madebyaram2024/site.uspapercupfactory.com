
"use client";

import Image from 'next/image';

const industries = [
    {
        title: "Hospitality & Food Service",
        tagline: "Turn every to-go order into a walking advertisement for your brand.",
        items: [
            "Coffee Shops & Roasters",
            "Restaurants & Bistros",
            "Juice Bars & Smoothie Shops",
            "Bakeries & Donut Shops",
            "Food Trucks & Breweries"
        ],
        // Image placeholder: 16:9 aspect ratio
        image: "/images/industries/hospitality.jpg"
    },
    {
        title: "Automotive & Service Centers",
        tagline: "Elevate your customer waiting room experience with premium branding.",
        items: [
            "Auto Dealerships",
            "Auto Repair & Body Shops",
            "Car Washes & Detailers",
            "Tire Centers",
            "Motorcycle Dealers"
        ],
        image: "/images/industries/automotive.jpg"
    },
    {
        title: "Professional Services",
        tagline: "Impress high-value clients with attention to detail in every cup.",
        items: [
            "Real Estate Offices",
            "Law Firms & Attorneys",
            "Financial Institutions",
            "Medical & Dental Offices",
            "Co-working Spaces"
        ],
        image: "/images/industries/professional.jpg"
    },
    {
        title: "Retail & Lifestyle",
        tagline: "Extend your unique customer experience beyond the checkout counter.",
        items: [
            "Beauty Salons & Spas",
            "Barbershops",
            "Furniture & Flooring Stores",
            "Boutique Retailers",
            "Gyms & Fitness Centers"
        ],
        image: "/images/industries/retail.jpg"
    },
    {
        title: "Events & Promotions",
        tagline: "Make a memorable impact at trade shows, weddings, and campaigns.",
        items: [
            "Trade Show Exhibitors",
            "Political Campaigns",
            "Weddings & Event Planners",
            "Corporate Conferences",
            "Festivals & Pop-ups"
        ],
        image: "/images/industries/events.jpg"
    },
    {
        title: "Partners & Wholesale",
        tagline: "Reliable production and white-label shipping for brokers and agencies.",
        items: [
            "Print Brokers",
            "Marketing Agencies",
            "Restaurant Supply (Cash & Carry)",
            "Event Caterers"
        ],
        image: "/images/industries/wholesale.jpg"
    }
];

export default function IndustriesServed() {
    return (
        <section id="industries" style={{ padding: '6rem 0', background: 'var(--color-navy)', color: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title" style={{ color: 'white' }}>Industries We Serve</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                        We provide custom branded solutions tailored for businesses across all sectors.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem'
                }} className="grid-responsive">
                    {industries.map((industry, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            className="industry-card"
                        >
                            {/* Image Placeholder */}
                            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#f8f9fa' }}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ccc',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    padding: '20px'
                                }}>
                                    {industry.title} Showcase Image
                                </div>
                            </div>

                            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-navy)', marginBottom: '0.5rem', textTransform: 'none' }}>
                                    {industry.title}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: 'var(--color-red)',
                                    marginBottom: '1.5rem',
                                    lineHeight: '1.4'
                                }}>
                                    {industry.tagline}
                                </p>

                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    marginTop: 'auto'
                                }}>
                                    {industry.items.map((item, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            marginBottom: '0.6rem',
                                            fontSize: '0.95rem',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            <span style={{ color: 'var(--color-red)', fontWeight: 'bold' }}>✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .industry-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }
        .section-title::after {
          background-color: var(--color-gold) !important;
        }
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
