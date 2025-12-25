
'use client'

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import { addBlogPost, updateBlogPost } from "@/actions/blog";
import { useRouter } from "next/navigation";

interface BlogPostFormProps {
    initialData?: {
        id?: string
        title: string
        content: string
        imageUrl: string | null
        isFeatured: boolean
    }
}

export default function BlogPostForm({ initialData }: BlogPostFormProps) {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        formData.set('content', content);
        formData.set('imageUrl', imageUrl);
        formData.set('isFeatured', isFeatured.toString());

        try {
            if (initialData?.id) {
                await updateBlogPost(initialData.id, formData);
            } else {
                await addBlogPost(formData);
            }
            router.push('/admin/blog');
        } catch (error) {
            console.error(error);
            alert("Failed to save post");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
            <form action={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title</label>
                    <input
                        name="title"
                        defaultValue={initialData?.title}
                        required
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1.1rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Featured Image</label>
                    <ImageUploader onUpload={setImageUrl} />
                    {imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', height: '200px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '4px' }} />
                    )}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Content</label>
                    <RichTextEditor content={content} onChange={setContent} />
                </div>

                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                        type="checkbox"
                        id="isFeatured"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <label htmlFor="isFeatured" style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                        Mark as Featured Story (Highlights this post on the Homepage)
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        style={{ padding: '0.75rem 1.5rem', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: '0.75rem 1.5rem', background: 'var(--color-navy)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {loading ? 'Saving...' : (initialData ? 'Update Post' : 'Create Post')}
                    </button>
                </div>
            </form>
        </div>
    )
}
