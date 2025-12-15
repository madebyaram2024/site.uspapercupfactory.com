
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/admin'
import Link from 'next/link'
import { addMockup } from '@/actions/admin'

const prisma = new PrismaClient()

async function getOrder(id: string) {
    await requireAdmin()
    return await prisma.order.findUnique({
        where: { id },
        include: {
            user: true,
            mockups: { orderBy: { createdAt: 'desc' } }
        }
    })
}

interface Props {
    params: { id: string }
}

export default async function AdminOrderDetailPage({ params }: Props) {
    const { id } = await params
    const order = await getOrder(id)

    if (!order) return <div>Order not found</div>

    async function handleAddMockup(formData: FormData) {
        'use server'
        if (!order) return;
        const imageUrl = formData.get('imageUrl') as string
        const comments = formData.get('comments') as string
        if (!imageUrl) return

        await addMockup(order.id, imageUrl, comments)
    }

    return (
        <div>
            <div style={{ marginBottom: "2rem" }}>
                <Link href="/admin/orders" style={{ textDecoration: "none", color: "#666" }}>
                    &larr; Back to Orders
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Order #{order.id}</h1>

            <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #eee' }}>
                <h3 style={{ marginTop: 0 }}>Customer Info</h3>
                <p><strong>Name:</strong> {order.user?.name || 'Guest'}</p>
                <p><strong>Email:</strong> {order.user?.email}</p>
                <p><strong>Total:</strong> ${Number(order.totalAmount).toFixed(2)}</p>
                <p><strong>Details:</strong> {order.details || 'N/A'}</p>
            </div>

            <h2 className="text-2xl font-bold mb-4">Mockups</h2>

            {order.mockups.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {order.mockups.map(mock => (
                        <div key={mock.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <img src={mock.imageUrl} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                            <div style={{ padding: '1rem' }}>
                                <strong>Status:</strong> {mock.status} <br />
                                <small style={{ color: '#666' }}>{new Date(mock.createdAt).toLocaleDateString()}</small>
                                {mock.userComments && (
                                    <div style={{ marginTop: '0.5rem', background: '#fff5f5', padding: '0.5rem', borderRadius: '4px', fontSize: '0.9rem', color: 'red' }}>
                                        <strong>User Feedback:</strong> {mock.userComments}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: '#666', marginBottom: '2rem' }}>No mockups for this order yet.</p>
            )}

            <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                <h3 style={{ marginTop: 0, color: '#0369a1' }}>Add New Mockup</h3>
                <form action={handleAddMockup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="Image URL (e.g. https://...)"
                        required
                        style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <textarea
                        name="comments"
                        placeholder="Designer notes (optional)"
                        style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', height: '100px' }}
                    />
                    <button type="submit" style={{ padding: '0.8rem', background: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Upload Mockup
                    </button>
                </form>
            </div>
        </div>
    )
}
