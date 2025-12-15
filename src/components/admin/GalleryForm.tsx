
'use client'

import { addGalleryItem } from "@/actions/gallery";
import ImageUploader from "./ImageUploader";
import { useState } from "react";

export default function GalleryForm() {
    const [imageUrl, setImageUrl] = useState('');

    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Add New Item</h3>
            <form action={addGalleryItem}>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem' }}>Title</label>
                        <input name="title" required placeholder="Project Name" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem' }}>Category</label>
                        <select name="category" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                            <option value="Business">Business (Portfolio)</option>
                            <option value="Cafe">Cafe (Portfolio)</option>
                            <option value="Restaurant">Restaurant (Portfolio)</option>
                            <option value="Corporate">Corporate (Portfolio)</option>
                            <option value="Wedding">Wedding (Inspiration)</option>
                            <option value="Birthday">Birthday (Inspiration)</option>
                            <option value="Event">Event (Inspiration)</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem' }}>Image</label>
                    <ImageUploader onUpload={setImageUrl} />
                    <input type="hidden" name="imageUrl" value={imageUrl} />
                </div>

                <button
                    type="submit"
                    disabled={!imageUrl}
                    style={{
                        marginTop: '1rem',
                        padding: '0.75rem 1.5rem',
                        background: imageUrl ? 'var(--color-navy)' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: imageUrl ? 'pointer' : 'not-allowed'
                    }}
                >
                    Add to Gallery
                </button>
            </form>
        </div>
    )
}
