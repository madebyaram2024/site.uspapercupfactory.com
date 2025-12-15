
'use server'

import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/admin'

const prisma = new PrismaClient()

export async function getAdminStats() {
    await requireAdmin();

    const [orderCount, userCount, blogCount, galleryCount] = await Promise.all([
        prisma.order.count(),
        prisma.user.count(),
        prisma.blogPost.count(),
        prisma.galleryItem.count()
    ]);

    return {
        orders: orderCount,
        users: userCount,
        posts: blogCount,
        gallery: galleryCount
    };
}
