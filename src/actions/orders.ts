'use server'

import { PrismaClient } from '@prisma/client'
import { auth } from '@/../auth'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function getUserOrders() {
    const session = await auth();
    if (!session?.user?.id) return [];

    return await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        include: { mockups: true }
    })
}

export async function createOrder(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Not authenticated");

    const quantity = parseInt(formData.get('quantity') as string) || 25;
    const details = formData.get('details') as string;

    await prisma.order.create({
        data: {
            userId: session.user.id,
            quantity,
            details,
            status: 'PENDING'
        }
    })

    revalidatePath('/dashboard');
}

export async function approveMockup(mockupId: string, orderId: string) {
    // Verify user owns this order logic here... for MVP assuming authorized
    await prisma.mockup.update({
        where: { id: mockupId },
        data: { status: 'APPROVED' }
    });

    await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PRINTING' }
    });

    revalidatePath('/dashboard');
}
