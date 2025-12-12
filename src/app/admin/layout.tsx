
import { auth } from "@/../auth";
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();

    // Basic Protection: Redirect if not logged in.
    // Real App: Check session.user.role === 'ADMIN'
    if (!session?.user) {
        redirect('/api/auth/signin');
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: '250px',
                background: 'var(--color-navy)',
                color: 'white',
                padding: '2rem'
            }}>
                <div style={{ fontSize: '1.5rem', fontFamily: 'Oswald', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    ADMIN <span style={{ color: 'var(--color-red)' }}>PANEL</span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link href="/admin" style={{ opacity: 0.8 }}>Dashboard Home</Link>
                    <Link href="/admin/gallery" style={{ opacity: 0.8 }}>Manage Gallery</Link>
                    <Link href="/admin/blog" style={{ opacity: 0.8 }}>Manage Blog</Link>
                    <Link href="/admin/orders" style={{ opacity: 0.8 }}>Orders & Mockups</Link>
                    <Link href="/admin/qc" style={{ opacity: 0.8, color: '#4dff4d', fontWeight: 'bold' }}>● QC Agent (Live)</Link>
                    <div style={{ margin: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>
                    <Link href="/" style={{ opacity: 0.5, fontSize: '0.9rem' }}>← Back to Site</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, background: '#f4f4f4', padding: '2rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', minHeight: '80vh' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
