import Navbar from '@/components/Navbar';
import { getGalleryItems } from '@/actions/gallery';
import GalleryGrid from '@/components/GalleryGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Gallery | Custom Printed Paper Cup Examples",
    description: "Browse our gallery of custom printed paper cups. See examples of our high-quality printing and design work for various brands and events.",
    alternates: {
        canonical: '/gallery',
    },
};

export const dynamic = 'force-dynamic'; // Ensure we always get fresh data

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <>
            <Navbar />
            <main style={{ padding: '6rem 0' }}>
                <div className="container">
                    <section>
                        <h1 className="section-title">Gallery</h1>
                        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                            Precision manufactured, custom designed paper cups for every brand and occasion.
                        </p>

                        <GalleryGrid items={items.map(item => ({
                            id: item.id,
                            imageUrl: item.imageUrl,
                            title: item.title,
                            category: item.category
                        }))} />
                    </section>
                </div>
            </main>
        </>
    );
}
