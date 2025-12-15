
import BlogPostForm from "@/components/admin/BlogPostForm";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface EditBlogPostPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
    const { id } = await params;
    const post = await db.blogPost.findUnique({
        where: { id }
    });

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
            <BlogPostForm initialData={post} />
        </div>
    );
}
