
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
    return (
        <aside style={{
            width: '250px',
            backgroundColor: 'var(--color-navy)',
            color: 'white',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Admin Panel</h2>

            <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li><Link href="/admin" style={{ display: 'block', padding: '0.5rem', borderRadius: '4px' }} className="hover:bg-white/10">Dashboard</Link></li>
                    <li><Link href="/admin/blog" style={{ display: 'block', padding: '0.5rem', borderRadius: '4px' }} className="hover:bg-white/10">Blog</Link></li>
                    <li><Link href="/admin/gallery" style={{ display: 'block', padding: '0.5rem', borderRadius: '4px' }} className="hover:bg-white/10">Gallery</Link></li>
                    <li><Link href="/admin/orders" style={{ display: 'block', padding: '0.5rem', borderRadius: '4px' }} className="hover:bg-white/10">Orders</Link></li>
                    <li><Link href="/admin/mockups" style={{ display: 'block', padding: '0.5rem', borderRadius: '4px' }} className="hover:bg-white/10">Mockups</Link></li>
                    <li><Link href="/admin/settings" style={{ display: 'block', padding: '0.5rem', borderRadius: '4px' }} className="hover:bg-white/10">Settings</Link></li>
                </ul>
            </nav>

            <footer>
                <Link href="/" style={{ display: 'block', marginBottom: '1rem', opacity: 0.7 }}>← Back to Site</Link>
                {/* SignOut implementation would ideally be a form or client component calling signOut() */}
            </footer>
        </aside>
    );
}
