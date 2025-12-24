'use client';

import Link from 'next/link';
import { FacebookIcon, InstagramIcon, TikTokIconClean } from './SocialIcons';
import { useState } from 'react';
import PricelistModal from './PricelistModal';

export default function Footer() {
    const [showPricelist, setShowPricelist] = useState(false);

    return (
        <footer style={{ background: '#0a192f', color: '#e6f1ff', paddingTop: '6rem', paddingBottom: '3rem', borderTop: '4px solid var(--color-red)' }}>
            <PricelistModal isOpen={showPricelist} onClose={() => setShowPricelist(false)} />

            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>

                    {/* Brand Column */}
                    <div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', color: 'white' }}>US PAPER CUP FACTORY</h3>
                        <p style={{ lineHeight: '1.8', opacity: 0.8, marginBottom: '2rem', fontSize: '1.05rem' }}>
                            We are the premier manufacturer of custom printed paper cups in the United States.
                            Dedicated to quality, speed, and American manufacturing.
                        </p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <span style={{ fontSize: '1.5rem' }}>🇺🇸</span>
                            <span style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>PROUDLY MADE IN USA</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.1rem' }}>Home</Link></li>
                            <li><Link href="/shop" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.1rem' }}>Shop Custom Cups</Link></li>
                            <li><Link href="/blog" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.1rem' }}>Blog</Link></li>
                            <li><Link href="/innovation" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.1rem' }}>Our Innovation</Link></li>
                            <li><Link href="/gallery" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.1rem' }}>Design Gallery</Link></li>
                            <li><Link href="/about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s', fontSize: '1.1rem' }}>About Us</Link></li>
                            <li>
                                <button
                                    onClick={() => setShowPricelist(true)}
                                    style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', textDecoration: 'underline', transition: 'color 0.2s', fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'inherit' }}
                                >
                                    Printable Price List
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>Get in Touch</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <li style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', fontSize: '1.1rem' }}>
                                <span style={{ color: 'var(--color-red)' }}>📍</span> <span>11185 Condor Ave, Huntington Beach, CA 92708</span>
                            </li>
                            <li style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '1.1rem' }}>
                                <span style={{ color: 'var(--color-red)' }}>✉️</span> <a href="mailto:sales@uspapercupfactory.com" style={{ color: 'inherit', textDecoration: 'none' }}>sales@uspapercupfactory.com</a>
                            </li>
                            <li style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '1.1rem' }}>
                                <span style={{ color: 'var(--color-red)' }}>📞</span> <a href="tel:+17145949573" style={{ color: 'inherit', textDecoration: 'none' }}>(714) 594-9573</a>
                            </li>
                        </ul>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="https://www.instagram.com/us_paper_cup_factory/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', transition: 'background 0.2s' }}>
                                <InstagramIcon size={20} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61585209849866" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', transition: 'background 0.2s' }}>
                                <FacebookIcon size={20} />
                            </a>
                            <a href="#" aria-label="TikTok" style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '50%', display: 'flex', transition: 'background 0.2s' }}>
                                <TikTokIconClean size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6, fontSize: '0.9rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>&copy; {new Date().getFullYear()} US Paper Cup Factory. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
                        <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
