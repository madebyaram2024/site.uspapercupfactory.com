
import { getAdminStats } from "@/actions/admin";

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <StatsCard title="Total Orders" value={stats.orders} color="#3b82f6" />
                <StatsCard title="Registered Users" value={stats.users} color="#10b981" />
                <StatsCard title="Blog Posts" value={stats.posts} color="#8b5cf6" />
                <StatsCard title="Gallery Items" value={stats.gallery} color="#f59e0b" />
            </div>
        </div>
    );
}

function StatsCard({ title, value, color }: { title: string, value: number, color: string }) {
    return (
        <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            borderTop: `4px solid ${color}`
        }}>
            <h3 style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{title}</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111' }}>{value}</p>
        </div>
    )
}
