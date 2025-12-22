
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
        image: "/images/hospitality-food-service-custom-cups.png",
        alt: "Custom branded paper cups for hospitality and food service businesses"
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
        image: "/images/automotive-service-custom-cups.png",
        alt: "Premium branded paper cups for automotive dealership customer waiting rooms"
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
        image: "/images/professional-services-custom-cups.png",
        alt: "Elegant custom paper cups for law firms and professional service offices"
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
        image: "/images/retail-lifestyle-custom-cups.png",
        alt: "Customized paper cups for boutique retail and lifestyle brand marketing"
    },
    {
        title: "One Love LA OC",
        tagline: "Doing our part to help the homeless community in Los Angeles and Orange County.",
        items: [
            "We Organize Food Drives",
            "Apparel Donation & Distribution",
            "Direct Skid Row Outreach",
            "Volunteer with Us",
            "Contact: onelove@uspapercupfactory.com"
        ],
        image: "/images/community-outreach-one-love-la-oc.png",
        alt: "US Paper Cup Factory community outreach and charity efforts in LA and OC"
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
        image: "/images/wholesale-partners-custom-cups.png",
        alt: "Wholesale custom paper cup production for print brokers and marketing agencies"
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
                            {/* Image Container */}
                            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#f8f9fa', overflow: 'hidden' }}>
                                {industry.image ? (
                                    <Image
                                        src={industry.image}
                                        alt={industry.alt || `${industry.title} Showcase`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
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
                                )}
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
          .industry-card {
            flex-direction: column-reverse !important;
          }
        }
      `}</style>
        </section>
    );
}
