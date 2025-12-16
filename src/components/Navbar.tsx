
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header style={{
            height: 'var(--header-height)',
            background: 'white',
            color: 'var(--color-navy)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%'
            }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                        src="/images/US_PAPER_CUP_FACTORY_LOGO_WB_HORIZONTAL.png"
                        alt="US Paper Cup Factory"
                        width={300}
                        height={60}
                        style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/shop" style={{ fontWeight: 500 }}>Shop</Link>
                    <Link href="/innovation" style={{ fontWeight: 500 }}>Innovation</Link>
                    <Link href="/gallery" style={{ fontWeight: 500 }}>Gallery</Link>
                    <Link href="/about" style={{ fontWeight: 500 }}>About Us</Link>
                    <Link href="/blog" style={{ fontWeight: 500 }}>Blog</Link>
                    <Link href="/contact" style={{ fontWeight: 500 }}>Contact</Link>

                    <div style={{ width: '1px', height: '20px', background: '#eee' }}></div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/api/auth/signin" className="btn" style={{ padding: '8px 20px', fontSize: '0.9rem', background: 'white', border: '1px solid var(--color-navy)' }}>Log In</Link>
                        <Link href="/api/auth/signin" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Sign Up</Link>
                    </div>
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="mobile-only"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
                >
                    <div style={{ width: '25px', height: '3px', background: 'var(--color-navy)', marginBottom: '5px' }}></div>
                    <div style={{ width: '25px', height: '3px', background: 'var(--color-navy)', marginBottom: '5px' }}></div>
                    <div style={{ width: '25px', height: '3px', background: 'var(--color-navy)' }}></div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--header-height)',
                    left: 0,
                    right: 0,
                    background: 'white',
                    padding: '2rem',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    borderTop: '1px solid #eee'
                }}>
                    <Link href="/shop" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Shop</Link>
                    <Link href="/innovation" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Innovation</Link>
                    <Link href="/gallery" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Gallery</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>About Us</Link>
                    <Link href="/blog" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Blog</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 500 }}>Contact</Link>

                    <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #eee' }} />

                    <Link href="/api/auth/signin" onClick={() => setIsOpen(false)} className="btn" style={{ textAlign: 'center', padding: '12px', border: '1px solid var(--color-navy)' }}>Log In</Link>
                    <Link href="/api/auth/signin" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ textAlign: 'center', padding: '12px' }}>Sign Up</Link>
                </div>
            )}
        </header>
    );
}
