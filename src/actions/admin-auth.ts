'use server'

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { hash, compare } from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateAdminPassword(formData: FormData) {
    const session = await requireAdmin();
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
        throw new Error("New passwords do not match");
    }

    if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    if (!session?.user?.email) {
        throw new Error("Unauthorized: Email missing from session");
    }

    const admin = await db.user.findUnique({
        where: { email: session.user.email }
    });

    if (!admin || !admin.password) {
        throw new Error("Admin user not found or password not set");
    }

    const isValid = await compare(currentPassword, admin.password);
    if (!isValid) {
        throw new Error("Current password is incorrect");
    }

    const hashedPassword = await hash(newPassword, 12);

    await db.user.update({
        where: { id: admin.id },
        data: { password: hashedPassword }
    });

    revalidatePath('/admin/settings');
    return { success: true };
}
