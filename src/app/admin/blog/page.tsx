
import { getAllBlogPosts, deleteBlogPost } from "@/actions/blog";
import Link from "next/link";

export default async function AdminBlogPage() {
    const posts = await getAllBlogPosts();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="text-3xl font-bold">Manage Blog</h1>
                <Link
                    href="/admin/blog/new"
                    style={{ background: 'var(--color-navy)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}
                >
                    + New Post
                </Link>
            </div>

            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Title</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Published</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{post.title}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '999px',
                                        fontSize: '0.8rem',
                                        background: post.published ? '#e6fffa' : '#fff5f5',
                                        color: post.published ? '#047857' : '#c53030'
                                    }}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <Link href={`/admin/blog/${post.id}`} style={{ marginRight: '1rem', color: '#3182ce' }}>Edit</Link>
                                    <form action={async () => {
                                        'use server'
                                        await deleteBlogPost(post.id)
                                    }} style={{ display: 'inline-block' }}>
                                        <button type="submit" style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {posts.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No blog posts found.</div>}
            </div>
        </div>
    );
}
