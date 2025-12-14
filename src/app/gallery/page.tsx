
import Navbar from '@/components/Navbar';
import { getGalleryItems } from '@/actions/gallery';

export const dynamic = 'force-dynamic'; // Ensure we always get fresh data

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 20px' }}>
                <h1 className="section-title">Design Gallery</h1>
                <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                    Explore what&apos;s possible. From elegant wedding scripts to bold corporate branding,
                    our gallery shows the range of our professional design capabilities.
                </p>

                {items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                        <p>No designs uploaded yet. Check back soon!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {items.map((item: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                            <div key={item.id} style={{
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-md)',
                                background: 'white'
                            }}>
                                <div style={{
                                    height: '250px',
                                    background: 'var(--gray-200)',
                                    position: 'relative'
                                }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{
                                        textTransform: 'uppercase',
                                        fontSize: '0.8rem',
                                        color: 'var(--color-navy)',
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem'
                                    }}>{item.category}</div>
                                    <h3 style={{ fontSize: '1.25rem' }}>{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
