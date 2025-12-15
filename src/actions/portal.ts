
'use server';

import { auth } from "@/../auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUserOrders() {
    const session = await auth();
    if (!session?.user?.email) return [];

    const user = await db.user.findUnique({
        where: { email: session.user.email },
        include: {
            orders: {
                include: { mockups: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    return user?.orders || [];
}

export async function getMockup(mockupId: string) {
    const session = await auth();
    if (!session?.user?.email) return null;

    const mockup = await db.mockup.findUnique({
        where: { id: mockupId },
        include: { order: true }
    });

    if (!mockup) return null;

    // Verify ownership via Order -> User Email
    const orderOwner = await db.user.findUnique({
        where: { id: mockup.order.userId }
    });

    if (orderOwner?.email !== session.user.email) {
        return null; // Unauthorized
    }

    return mockup;
}

export async function updateMockupStatus(mockupId: string, status: 'APPROVED' | 'CHANGES_REQUESTED', comment?: string) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    await db.mockup.update({
        where: { id: mockupId },
        data: {
            status,
            userComments: comment // Store feedback if any
        }
    });

    revalidatePath(`/portal/mockups/${mockupId}`);
    revalidatePath("/portal");
}
