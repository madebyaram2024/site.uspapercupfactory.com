'use client';

import { useState } from 'react';
import { createRefCode, deleteRefCode } from '@/actions/design-ref';
import { useRouter } from 'next/navigation';

export default function DesignRefManager({ initialRefs }: { initialRefs: any[] }) {
    const router = useRouter();
    const [refs, setRefs] = useState(initialRefs);
    const [fileUrl, setFileUrl] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await createRefCode(fileUrl, description);
            if (res.success) {
                setSuccess(`Created Code: ${res.code}`);
                setFileUrl('');
                setDescription('');
                router.refresh(); // Refresh server data
                // Optimistic update (optional, but refresh is safer for ID)
            } else {
                setError(res.error || 'Failed to create code');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;

        try {
            await deleteRefCode(id);
            setRefs(prev => prev.filter(r => r.id !== id));
            router.refresh();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="admin-card">
            <h2 className="text-xl font-bold mb-4">Manage PRFRN Codes</h2>

            <form onSubmit={handleCreate} className="mb-8 p-4 bg-white rounded shadow">
                <h3 className="font-bold mb-2">Generate New Code</h3>
                <div className="flex gap-4 mb-2">
                    <input
                        type="text"
                        placeholder="File URL (e.g. from S3 or Upload)"
                        value={fileUrl}
                        onChange={e => setFileUrl(e.target.value)}
                        className="border p-2 rounded flex-1"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description (Optional)"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="border p-2 rounded flex-1"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Generating...' : 'Generate Code'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2 font-bold">{success}</p>}
            </form>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-3">Code</th>
                            <th className="p-3">File URL</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Created</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {refs.map(ref => (
                            <tr key={ref.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-mono font-bold text-blue-600">{ref.code}</td>
                                <td className="p-3 text-sm truncate max-w-xs">{ref.fileUrl}</td>
                                <td className="p-3 text-sm">{ref.description || '-'}</td>
                                <td className="p-3 text-sm">{new Date(ref.createdAt).toLocaleDateString()}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDelete(ref.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {refs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">No codes found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
