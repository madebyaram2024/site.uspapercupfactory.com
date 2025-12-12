
import { getUserOrders, createOrder } from '@/app/actions/orders';

export default async function DashboardPage() {
    const orders = await getUserOrders();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>My Orders</h1>
                {/* Simple Create Order Form Trigger */}
                <form action={createOrder} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input type="hidden" name="details" value="New Website Order" />
                    <button className="btn btn-primary">New Order (+)</button>
                </form>
            </div>

            {orders.length === 0 ? (
                <div style={{ padding: '4rem', background: 'white', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                    <h3>No active orders</h3>
                    <p style={{ margin: '1rem 0' }}>Ready to create your custom cup?</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.map((order: any) => (
                        <div key={order.id} style={{ padding: '1.5rem', background: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--color-navy)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Order #{order.id.slice(-6).toUpperCase()}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div style={{
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    background: order.status === 'PENDING' ? '#FFF3E0' : '#E8F5E9',
                                    color: order.status === 'PENDING' ? '#E65100' : '#2E7D32'
                                }}>
                                    {order.status}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
                                <div>
                                    <strong>{order.quantity} cups</strong> • ${order.totalAmount.toString()} (Est)
                                </div>
                                {order.status === 'MOCKUP_READY' && (
                                    <button className="btn btn-secondary">Review Mockup</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
