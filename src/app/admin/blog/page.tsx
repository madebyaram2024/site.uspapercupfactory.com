
import { addBlogPost, deleteBlogPost, getAllBlogPosts } from '@/actions/blog';

export default async function BlogAdminPage() {
    const posts = await getAllBlogPosts();

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Manage Blog</h1>

            {/* Add New Post Form */}
            <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ marginBottom: '1rem' }}>Write New Post</h3>
                <form action={addBlogPost} style={{ display: 'grid', gap: '1rem', maxWidth: '800px' }}>
                    <input name="title" placeholder="Blog Post Title" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} required />
                    <input name="imageUrl" placeholder="Cover Image URL (Optional)" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <textarea
                        name="content"
                        placeholder="Write your content here... (Supports Markdown)"
                        style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '200px', fontFamily: 'monospace' }}
                        required
                    />
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        Tip: Use # for headers, **bold**, *italics*, and [link](url).
                    </div>
                    <button type="submit" className="btn btn-primary">Publish Post</button>
                </form>
            </div>

            {/* List Existing (Management) */}
            <h3 style={{ marginBottom: '1rem' }}>Existing Posts</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {posts.length === 0 && <p>No blog posts yet.</p>}
                {posts.map((post: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                    <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{post.title}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>/{post.slug} • {post.published ? 'Published' : 'Draft'}</div>
                        </div>
                        <form action={deleteBlogPost.bind(null, post.id)}>
                            <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
