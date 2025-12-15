
import { getAllOrders } from "@/actions/orders";

export default async function AdminOrdersPage() {
    const orders = await getAllOrders();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Orders</h1>

            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>User</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Mockups</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: any) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    {order.user?.name || order.user?.email || 'Guest'}
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{order.user?.email}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>{order.mockups?.length || 0}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        background: order.paid ? '#e6fffa' : '#fff5f5',
                                        color: order.paid ? '#047857' : '#c53030'
                                    }}>
                                        {order.paid ? 'Paid' : 'Unpaid'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    ${(order.amount / 100).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No orders found.</div>}
            </div>
        </div>
    );
}
