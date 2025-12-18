
import Navbar from '@/components/Navbar';
import { getBlogPost } from '@/actions/blog';
import { notFound } from 'next/navigation';
import SocialShare from '@/components/SocialShare';

interface Props {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <article className="container" style={{ padding: '4rem 20px', maxWidth: '800px' }}>
                <p style={{ color: 'var(--color-red)', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>Allowed Blog</p>
                <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '1rem', color: 'var(--color-navy)' }}>{post.title}</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ color: '#666' }}>
                        Published on {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <SocialShare
                        url={`/blog/${post.slug}`}
                        title={post.title}
                        description={`Check out this article from US Paper Cup Factory: ${post.title}`}
                    />
                </div>

                {post.imageUrl && (
                    <div style={{ marginBottom: '3rem', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />
                    </div>
                )}

                <div className="prose" style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </>
    );
}
