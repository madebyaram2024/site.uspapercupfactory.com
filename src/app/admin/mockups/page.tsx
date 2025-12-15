
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/admin'
import Link from 'next/link'

const prisma = new PrismaClient()

async function getMockups() {
    await requireAdmin();
    return await prisma.mockup.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            order: {
                include: { user: true }
            }
        }
    })
}

export default async function AdminMockupsPage() {
    const mockups = await getMockups();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Mockups</h1>

            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>User</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockups.map((mockup: any) => (
                            <tr key={mockup.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{new Date(mockup.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    <Link href={`/admin/orders`} style={{ color: 'blue', textDecoration: 'underline' }}>
                                        #{mockup.orderId.slice(-6).toUpperCase()}
                                    </Link>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {mockup.order?.user?.email || 'Guest'}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {mockup.status === 'APPROVED' ?
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>Approved</span> :
                                        mockup.status === 'CHANGES_REQUESTED' ?
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>Changes Req</span> :
                                            <span style={{ color: 'orange', fontWeight: 'bold' }}>{mockup.status}</span>
                                    }
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <a href={mockup.imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>View Image</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {mockups.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No mockups found.</div>}
            </div>
        </div>
    );
}
