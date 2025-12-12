
import Navbar from '@/components/Navbar';
import { FacebookIcon, InstagramIcon, TikTokIconClean } from '@/components/SocialIcons';

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingBottom: '4rem' }}>
                {/* Contact Hero */}
                <section style={{
                    backgroundImage: 'url("/images/contact_header.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        background: 'rgba(10, 25, 47, 0.85)',
                        padding: '3rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        maxWidth: '700px',
                        backdropFilter: 'blur(5px)',
                        color: 'white'
                    }}>
                        <h1 className="section-title" style={{ color: 'white', marginBottom: '1rem' }}>Contact Us</h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.95, lineHeight: 1.6 }}>
                            Have a question about a custom order? Need help with your design?
                            Our team is here to help you create the perfect cup.
                        </p>
                    </div>
                </section>

                <section className="container" style={{ marginTop: '4rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

                        {/* Contact Form */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>Send a Message</h2>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                                    <input type="text" id="name" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Your Name" />
                                </div>
                                <div>
                                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                                    <input type="email" id="email" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone (Optional)</label>
                                    <input type="tel" id="phone" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="(555) 123-4567" />
                                </div>
                                <div>
                                    <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                                    <textarea id="message" rows={5} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Tell us about your project..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>Send Message</button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>Get In Touch</h2>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-red)' }}>Sales & Support</h3>
                                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Email:</strong> sales@uspapercupfactory.com</p>
                                <p style={{ fontSize: '1.1rem' }}><strong>Phone:</strong> +1 (747) 338-8959</p>
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
