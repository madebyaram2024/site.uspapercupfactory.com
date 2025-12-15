'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()
import { requireAdmin } from '@/lib/admin'

export async function getGalleryItems() {
    return await prisma.galleryItem.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function addGalleryItem(formData: FormData) {
    await requireAdmin();
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const imageUrl = formData.get('imageUrl') as string

    if (!title || !category || !imageUrl) {
        throw new Error('Missing fields')
    }

    await prisma.galleryItem.create({
        data: {
            title,
            category,
            imageUrl,
        }
    })

    revalidatePath('/gallery')
    revalidatePath('/admin/gallery')
}

export async function deleteGalleryItem(id: string) {
    await requireAdmin();
    await prisma.galleryItem.delete({
        where: { id }
    })

    revalidatePath('/gallery')
    revalidatePath('/admin/gallery')
}
