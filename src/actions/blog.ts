'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

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

export async function getBlogPost(slug: string) {
    return await prisma.blogPost.findUnique({
        where: { slug }
    })
}

export async function addBlogPost(formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const imageUrl = formData.get('imageUrl') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    await prisma.blogPost.create({
        data: {
            title,
            slug,
            content,
            imageUrl,
            published: true // Auto publish for MVP
        }
    })

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
}

export async function deleteBlogPost(id: string) {
    await prisma.blogPost.delete({
        where: { id }
    })

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
}
