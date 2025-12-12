
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/Website-logo.png?v=4"
                        alt="US Paper Cup Factory"
                        style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
                    />
                </Link>

                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/shop" style={{ fontWeight: 500, color: 'var(--color-navy)' }}>Shop</Link>
                    <Link href="/innovation" style={{ fontWeight: 500, color: 'var(--color-navy)' }}>Innovation</Link>
                    <Link href="/gallery" style={{ fontWeight: 500, color: 'var(--color-navy)' }}>Gallery</Link>
                    <Link href="/about" style={{ fontWeight: 500, color: 'var(--color-navy)' }}>About Us</Link>
                    <Link href="/blog" style={{ fontWeight: 500, color: 'var(--color-navy)' }}>Blog</Link>
                    <Link href="/contact" style={{ fontWeight: 500, color: 'var(--color-navy)' }}>Contact</Link>
                </nav>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/contact" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>LIVE CHAT</Link>
                    <Link href="/api/auth/signin" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>SIGN UP / LOG IN</Link>
                </div>
            </div>
        </header >
    );
}
