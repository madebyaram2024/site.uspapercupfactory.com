
import { addGalleryItem, deleteGalleryItem, getGalleryItems } from '@/actions/gallery';

export default async function GalleryAdminPage() {
    const items = await getGalleryItems();

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Manage Gallery</h1>

            {/* Add New Item Form */}
            <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ marginBottom: '1rem' }}>Add New Design</h3>
                <form action={addGalleryItem} style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>
                    <input name="title" placeholder="Design Title (e.g. Summer Wedding)" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} required />
                    <select name="category" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Other">Other</option>
                    </select>
                    <input name="imageUrl" placeholder="Image URL (Placeholder for now)" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} required />
                    <button type="submit" className="btn btn-primary">Add to Gallery</button>
                </form>
            </div>

            {/* List Existing (Management) */}
            <h3 style={{ marginBottom: '1rem' }}>Existing Items</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {items.length === 0 && <p>No items yet.</p>}
                {items.map((item: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '50px', height: '50px', background: '#ccc', borderRadius: '4px', overflow: 'hidden' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{item.category}</div>
                            </div>
                        </div>
                        <form action={deleteGalleryItem.bind(null, item.id)}>
                            <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
