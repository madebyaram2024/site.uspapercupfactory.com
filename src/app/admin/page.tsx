
export default function AdminDashboard() {
    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {/* Stat Cards */}
                <div style={{ padding: '1.5rem', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-md)' }}>
                    <h3>Waitling List</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>0</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'white', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                    <h3>Active Orders</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-navy)' }}>0</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'white', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                    <h3>Gallery Items</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-navy)' }}>0</div>
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h2>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button className="btn btn-primary">Add Gallery Image</button>
                    <button className="btn btn-secondary">Write Blog Post</button>
                </div>
            </div>
        </div>
    );
}
