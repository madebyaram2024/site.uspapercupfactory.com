
import { auth } from "@/../auth";
import Navbar from '@/components/Navbar';
// import { redirect } from 'next/navigation'; // Uncomment for prod

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();
    // if (!session) redirect('/api/auth/signin');

    return (
        <>
            <Navbar />
            <div style={{ background: 'var(--gray-100)', minHeight: 'calc(100vh - 80px)', padding: '2rem 0' }}>
                <div className="container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    {/* Sidebar */}
                    <aside style={{ width: '250px', background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                            {session?.user?.name || 'Customer'} Portal
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <a href="/dashboard" style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--color-navy)' }}>My Orders</a>
                            <a href="/dashboard/settings" style={{ padding: '0.5rem', color: '#666' }}>Settings</a>
                        </nav>
                    </aside>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
