
'use client'

import { useState } from "react";
import { updateAdminPassword } from "@/actions/admin-auth";

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        try {
            await updateAdminPassword(formData);
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            (document.getElementById('password-form') as HTMLFormElement).reset();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to update password' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: '600px' }}>
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <section style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>
                    Security: Change Password
                </h2>

                <form id="password-form" action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>

                    {message && (
                        <div style={{
                            padding: '1rem',
                            borderRadius: '4px',
                            background: message.type === 'success' ? '#e6fffa' : '#fff5f5',
                            color: message.type === 'success' ? '#047857' : '#c53030',
                            border: `1px solid ${message.type === 'success' ? '#b2f5ea' : '#feb2b2'}`,
                            fontSize: '0.9rem'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: 'var(--color-navy)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            marginTop: '0.5rem'
                        }}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </section>
        </div>
    );
}
