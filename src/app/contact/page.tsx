
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { FacebookIcon, InstagramIcon, TikTokIconClean } from '@/components/SocialIcons';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | US Paper Cup Factory",
    description: "Get in touch with US Paper Cup Factory for questions about custom orders, designs, or sample requests. We're here to help you create the perfect cup.",
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://uspapercupfactory.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Contact',
                item: 'https://uspapercupfactory.com/contact',
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navbar />
            <main style={{ paddingBottom: '4rem' }}>
                {/* Contact Hero */}
                <section style={{
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <Image
                        src="/images/contact_hero.jpg?v=final"
                        alt="Contact US Paper Cup Factory"
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                    />
                    <div style={{
                        background: 'rgba(10, 25, 47, 0.6)',
                        padding: '3rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        maxWidth: '700px',
                        backdropFilter: 'blur(5px)', // Glassmorphism blur
                        color: 'white',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <h1 className="section-title" style={{ color: 'white', marginBottom: '1rem' }}>Contact Us</h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.95, lineHeight: 1.6 }}>
                            Have a question about a custom order? Need help with your design?
                            Our team is here to help you create the perfect cup.
                        </p>
                    </div>
                </section>

                <section className="container" style={{ marginTop: '4rem' }}>
                    <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

                        {/* Contact Form */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>Send a Message</h2>
                            <ContactForm />
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>Get In Touch</h2>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-red)' }}>Sales & Support</h3>
                                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Address:</strong> 11185 Condor Ave, Huntington Beach, CA 92708</p>
                                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Email:</strong> sales@uspapercupfactory.com</p>
                                <p style={{ fontSize: '1.1rem' }}><strong>Phone:</strong> (714) 594-9573</p>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>Mon-Fri, 9am - 5pm</p>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-navy)' }}>Social Media</h3>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a href="#" className="btn-social" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: '#f0f0f0', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'var(--color-navy)', fontWeight: 600 }}>
                                        <InstagramIcon size={20} color="var(--color-navy)" /> <span>Instagram</span>
                                    </a>
                                    <a href="#" className="btn-social" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: '#f0f0f0', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'var(--color-navy)', fontWeight: 600 }}>
                                        <FacebookIcon size={20} color="var(--color-navy)" /> <span>Facebook</span>
                                    </a>
                                    <a href="#" className="btn-social" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: '#f0f0f0', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'var(--color-navy)', fontWeight: 600 }}>
                                        <TikTokIconClean size={20} color="var(--color-navy)" /> <span>TikTok</span>
                                    </a>
                                </div>
                            </div>

                            <div style={{ padding: '2rem', background: 'var(--color-gold)', borderRadius: 'var(--radius-md)', color: 'white' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Need Samples?</h3>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Want to see and feel the quality before you buy? Request a free sample pack today.
                                </p>
                                <button className="btn" style={{ background: 'white', color: 'var(--color-gold)', border: 'none' }}>Request Samples</button>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </>
    );
}
