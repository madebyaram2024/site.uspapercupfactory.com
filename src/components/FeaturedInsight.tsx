'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedInsightProps {
    post: {
        title: string;
        slug: string;
        content: string;
        imageUrl: string | null;
        createdAt: Date;
    };
}

export default function FeaturedInsight({ post }: FeaturedInsightProps) {
    // Basic excerpt logic
    const plainText = post.content.replace(/<[^>]*>?/gm, '');
    const excerpt = plainText.slice(0, 180).trim() + '...';

    return (
        <section className="featured-insight-section" style={{ padding: '6rem 0', background: '#fff' }}>
            <div className="container">
                <div style={{ marginBottom: '3rem' }}>
                    <span style={{
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        letterSpacing: '2px',
                        color: 'var(--color-red)',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.5rem'
                    }}>
                        FROM THE FACTORY FLOOR
                    </span>
                    <div style={{ width: '60px', height: '3px', background: 'var(--color-navy)' }}></div>
                </div>

                <div className="featured-card" style={{
                    display: 'flex',
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                    border: '1px solid #f0f0f0',
                    minHeight: '400px'
                }}>
                    {/* Left Side: Image (40%) */}
                    <div className="featured-image-container" style={{
                        flex: '0 0 40%',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {post.imageUrl ? (
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', background: 'var(--color-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                US PAPER CUP
                            </div>
                        )}
                    </div>

                    {/* Right Side: Content (60%) */}
                    <div className="featured-content" style={{
                        flex: '1',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            letterSpacing: '1.5px',
                            color: '#888',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            display: 'block'
                        }}>
                            MANUFACTURING INSIGHT
                        </span>

                        <h3 style={{
                            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                            fontWeight: '800',
                            color: 'var(--color-navy)',
                            lineHeight: '1.2',
                            marginBottom: '1.5rem',
                            fontFamily: 'inherit'
                        }}>
                            {post.title}
                        </h3>

                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.7',
                            marginBottom: '2rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {excerpt}
                        </p>

                        <div>
                            <Link href={`/blog/${post.slug}`} className="featured-cta" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: 'var(--color-red)',
                                fontWeight: '700',
                                textDecoration: 'none',
                                fontSize: '1.1rem',
                                transition: 'gap 0.3s ease'
                            }}>
                                Read the Full Story
                                <span style={{ fontSize: '1.3rem' }}>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 991px) {
                    .featured-card {
                        flex-direction: column !important;
                    }
                    .featured-image-container {
                        flex: none !important;
                        height: 300px !important;
                        width: 100% !important;
                    }
                    .featured-content {
                        padding: 2rem !important;
                    }
                }
                .featured-cta:hover {
                    gap: 15px !important;
                }
            `}</style>
        </section>
    );
}
