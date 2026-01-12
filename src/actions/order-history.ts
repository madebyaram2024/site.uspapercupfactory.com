import { auth } from '../../auth'
import { db } from '@/lib/db'

export async function getLastOrders() {
    const session = await auth();

    if (!session?.user?.id) {
        return [];
    }

    const orders = await db.order.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 3,
        include: {
            mockups: true
        }
    });

    return orders.map(order => ({
        id: order.id,
        date: order.createdAt,
        quantity: order.quantity,
        total: order.totalAmount,
        details: order.details,
        status: order.status
    }));
}
