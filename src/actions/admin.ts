import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";

const prisma = db;

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

export async function addMockup(orderId: string, imageUrl: string, comment?: string) {
    await requireAdmin();

    await db.mockup.create({
        data: {
            orderId,
            imageUrl,
            adminComments: comment,
            status: "PENDING_REVIEW"
        }
    });

    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath(`/admin/mockups`);
    revalidatePath(`/portal/mockups`); // In case user is viewing list
}
