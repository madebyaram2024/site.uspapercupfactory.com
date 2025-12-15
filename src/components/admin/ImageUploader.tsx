
'use client'

import { useState } from 'react'

export default function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setError('')

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (!res.ok) throw new Error('Upload failed')

            const data = await res.json()
            onUpload(data.url)
        } catch (err) {
            console.error(err)
            setError('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Upload Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                style={{ display: 'block', width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            {uploading && <p style={{ fontSize: '0.9rem', color: '#666' }}>Uploading...</p>}
            {error && <p style={{ fontSize: '0.9rem', color: 'red' }}>{error}</p>}
        </div>
    )
}
