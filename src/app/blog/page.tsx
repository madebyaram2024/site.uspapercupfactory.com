
import Navbar from '@/components/Navbar';
import { getBlogPosts } from '@/actions/blog';
import Link from 'next/link';
import SocialShare from '@/components/SocialShare';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog | Custom Paper Cup Industry News & Tips",
    description: "Stay updated with the latest news, design tips, and manufacturing insights from the US Paper Cup Factory.",
    alternates: {
        canonical: '/blog',
    },
};

export const dynamic = 'force-dynamic';

export default async function BlogListPage() {
    const posts = await getBlogPosts();

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://uspapercupfactory.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://uspapercupfactory.com/blog',
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navbar />
            <main className="container" style={{ padding: '4rem 20px' }}>
                <h1 className="section-title">Latest News & Tips</h1>
                <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                    Updates from the manufacturing floor, design tips for your event, and customer success stories.
                </p>

                <div className="blog-list-container">
                    {posts.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>No articles published yet.</p>}

                    {posts.map((post: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                        <Link href={`/blog/${post.slug}`} key={post.id} className="blog-card-horizontal">
                            <div className="blog-card-image-wrap">
                                {post.imageUrl ? (
                                    <img src={post.imageUrl} alt={post.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        US PAPER CUP
                                    </div>
                                )}
                            </div>
                            <div className="blog-card-content">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', textTransform: 'none', lineHeight: '1.2' }}>{post.title}</h2>
                                        <div style={{ fontSize: '0.95rem', color: '#666', marginBottom: '1.5rem' }}>{new Date(post.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div>
                                        <SocialShare
                                            url={`/blog/${post.slug}`}
                                            title={post.title}
                                            description={`Check out this article from US Paper Cup Factory: ${post.title}`}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: 'auto', color: 'var(--color-navy)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Read Article
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
