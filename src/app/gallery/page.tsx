
import Navbar from '@/components/Navbar';
import { getGalleryItems } from '@/actions/gallery';

export const dynamic = 'force-dynamic'; // Ensure we always get fresh data

export default async function GalleryPage() {
    const items = await getGalleryItems();

    // Categorization Logic
    const portfolioCategories = ['business', 'corporate', 'cafe', 'restaurant', 'brand', 'shop'];
    // All others go to Inspiration

    const portfolioItems = items.filter((item: any) =>
        portfolioCategories.includes(item.category.toLowerCase()) || item.category.toLowerCase().includes('business')
    );

    // Everything else is Inspiration (Parties, Weddings, etc.)
    const inspirationItems = items.filter((item: any) =>
        !portfolioItems.includes(item)
    );

    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 20px' }}>

                {/* PORTFOLIO SECTION */}
                <section style={{ marginBottom: '6rem' }}>
                    <h1 className="section-title">Our Work</h1>
                    <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                        Trusted by coffee shops, restaurants, and brands across the country.
                        See how custom cups help businesses stand out.
                    </p>

                    {portfolioItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#888', background: '#f9f9f9', borderRadius: '8px' }}>
                            <p>No business portfolio items uploaded yet.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {portfolioItems.map((item: any) => (
                                <GalleryCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </section>

                {/* INSPIRATION SECTION */}
                <section>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ color: 'var(--color-gold)', fontWeight: 'bold', letterSpacing: '1px' }}>GET INSPIRED</span>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-navy)', marginTop: '0.5rem' }}>Ideas for Your Next Event</h2>
                        <p style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
                            From weddings to block parties, discover how custom cups add a personal touch to any gathering.
                        </p>
                    </div>

                    {inspirationItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#888', background: '#f9f9f9', borderRadius: '8px' }}>
                            <p>No inspiration references uploaded yet.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {inspirationItems.map((item: any) => (
                                <GalleryCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </section>

            </main>
        </>
    );
}

// Helper Component to reduce code duplication
function GalleryCard({ item }: { item: any }) {
    return (
        <div style={{
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
    );
}
