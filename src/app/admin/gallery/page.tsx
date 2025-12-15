
import { getGalleryItems, deleteGalleryItem } from "@/actions/gallery";
import GalleryForm from "@/components/admin/GalleryForm";
import Image from "next/image";

export default async function AdminGalleryPage() {
    const items = await getGalleryItems();

    // Categorization Logic (Mirroring public page)
    const portfolioCategories = ['business', 'corporate', 'cafe', 'restaurant', 'brand', 'shop'];

    const portfolioItems = items.filter((item: any) =>
        portfolioCategories.includes(item.category.toLowerCase()) || item.category.toLowerCase().includes('business')
    );

    const inspirationItems = items.filter((item: any) =>
        !portfolioItems.includes(item)
    );

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Gallery</h1>

            <GalleryForm />

            <h2 className="text-xl font-bold mt-8 mb-4">Portfolio (Our Work)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {portfolioItems.map((item: any) => (
                    <GalleryItemCard key={item.id} item={item} />
                ))}
            </div>

            <h2 className="text-xl font-bold mt-12 mb-4">Inspiration (Ideas)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {inspirationItems.map((item: any) => (
                    <GalleryItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

function GalleryItemCard({ item }: { item: any }) {
    return (
        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ position: 'relative', height: '150px' }}>
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div style={{ padding: '1rem' }}>
                <p style={{ fontWeight: 'bold' }}>{item.title}</p>
                <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>{item.category}</p>

                <form action={async () => {
                    'use server'
                    await deleteGalleryItem(item.id)
                }}>
                    <button type="submit" style={{ color: 'red', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                        Delete
                    </button>
                </form>
            </div>
        </div>
    )
}
