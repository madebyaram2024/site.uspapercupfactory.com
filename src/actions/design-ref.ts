'use server'

import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

export async function validateRefCode(code: string) {
    if (!code || code.length !== 7) {
        return { success: false, error: 'Invalid code format. Must be 7 digits.' }
    }

    const ref = await db.designRef.findUnique({
        where: { code }
    })

    if (!ref) {
        return { success: false, error: 'Reference code not found.' }
    }

    return { success: true, fileUrl: ref.fileUrl, description: ref.description }
}

export async function createRefCode(fileUrl: string, description?: string) {
    await requireAdmin();

    // Generate a random 7-digit code
    const generateCode = () => Math.floor(1000000 + Math.random() * 9000000).toString();

    let code = generateCode();
    let isUnique = false;
    let attempts = 0;

    // Ensure uniqueness
    while (!isUnique && attempts < 10) {
        const existing = await db.designRef.findUnique({ where: { code } });
        if (!existing) {
            isUnique = true;
        } else {
            code = generateCode();
            attempts++;
        }
    }

    if (!isUnique) {
        return { success: false, error: 'Failed to generate unique code. Please try again.' }
    }

    const ref = await db.designRef.create({
        data: {
            code,
            fileUrl,
            description
        }
    })

    return { success: true, code: ref.code }
}

export async function deleteRefCode(id: string) {
    await requireAdmin();
    await db.designRef.delete({ where: { id } });
    return { success: true }
}

export async function getAllRefCodes() {
    await requireAdmin();
    return await db.designRef.findMany({ orderBy: { createdAt: 'desc' } });
}
