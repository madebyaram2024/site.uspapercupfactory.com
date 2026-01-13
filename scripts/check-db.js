
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const galleryCount = await prisma.galleryItem.count();
    const blogCount = await prisma.blogPost.count();
    const publishedBlogCount = await prisma.blogPost.count({ where: { published: true } });

    console.log('Gallery Items:', galleryCount);
    console.log('Total Blog Posts:', blogCount);
    console.log('Published Blog Posts:', publishedBlogCount);
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
