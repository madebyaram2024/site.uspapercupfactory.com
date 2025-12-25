'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()
import { requireAdmin } from '@/lib/admin'

export async function getBlogPosts() {
    return await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' },
        where: { published: true }
    })
}

export async function getAllBlogPosts() {
    return await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function getFeaturedBlogPost() {
    return await prisma.blogPost.findFirst({
        where: { isFeatured: true, published: true },
        orderBy: { updatedAt: 'desc' }
    })
}

export async function getBlogPost(slug: string) {
    return await prisma.blogPost.findUnique({
        where: { slug }
    })
}

export async function addBlogPost(formData: FormData) {
    await requireAdmin();
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const imageUrl = formData.get('imageUrl') as string
    const isFeatured = formData.get('isFeatured') === 'true'
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    if (isFeatured) {
        // Unmark other featured posts
        await prisma.blogPost.updateMany({
            where: { isFeatured: true },
            data: { isFeatured: false }
        })
    }

    await prisma.blogPost.create({
        data: {
            title,
            slug,
            content,
            imageUrl,
            published: true, // Auto publish for MVP
            isFeatured
        }
    })

    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
}

export async function updateBlogPost(id: string, formData: FormData) {
    await requireAdmin();
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const imageUrl = formData.get('imageUrl') as string
    const isFeatured = formData.get('isFeatured') === 'true'

    if (isFeatured) {
        // Unmark other featured posts
        await prisma.blogPost.updateMany({
            where: { isFeatured: true, id: { not: id } },
            data: { isFeatured: false }
        })
    }

    await prisma.blogPost.update({
        where: { id },
        data: {
            title,
            content,
            imageUrl,
            isFeatured,
            updatedAt: new Date()
        }
    })

    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath(`/blog/${id}`)
    revalidatePath('/admin/blog')
}

export async function deleteBlogPost(id: string) {
    await requireAdmin();
    await prisma.blogPost.delete({
        where: { id }
    })

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
}
