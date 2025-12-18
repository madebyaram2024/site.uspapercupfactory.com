
import Navbar from '@/components/Navbar';
import { getBlogPosts } from '@/actions/blog';
import Link from 'next/link';
import SocialShare from '@/components/SocialShare';

export const dynamic = 'force-dynamic';

export default async function BlogListPage() {
    const posts = await getBlogPosts();

    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 20px' }}>
                <h1 className="section-title">Latest News & Tips</h1>
                <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                    Updates from the manufacturing floor, design tips for your event, and customer success stories.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                    {posts.length === 0 && <p style={{ textAlign: 'center', color: '#666', gridColumn: '1/-1' }}>No articles published yet.</p>}

                    {posts.map((post: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                        <Link href={`/blog/${post.slug}`} key={post.id} style={{ display: 'block' }}>
                            <div style={{
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-sm)',
                                background: 'white',
                                height: '100%',
                                transition: 'transform 0.2s',
                                // Note: Inline hover doesn't work, standard CSS needed for animation
                            }} className="blog-card">
                                <div style={{
                                    height: '200px',
                                    background: 'var(--gray-200)',
                                    position: 'relative'
                                }}>
                                    {post.imageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            US PAPER CUP
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textTransform: 'none' }}>{post.title}</h3>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>{new Date(post.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div>
                                        <SocialShare
                                            url={`/blog/${post.slug}`}
                                            title={post.title}
                                            description={`Check out this article from US Paper Cup Factory: ${post.title}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
