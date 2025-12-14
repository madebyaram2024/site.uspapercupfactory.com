
'use client';

import { useState } from 'react';
import { register } from '@/actions/register';
import Link from 'next/link';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await register({ name, email, password });

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess("Account created! Please log in.");
                // Optional: Redirect
            }
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', color: '#00204A', marginBottom: '0.5rem' }}>Create Account</h1>
                <p style={{ color: '#666' }}>Join US Paper Cup Factory</p>
            </div>

            {error && (
                <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            {success && (
                <div style={{ background: '#dcfce7', color: '#166534', padding: '10px', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                    {success} <br /> <Link href="/auth/login" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Log In Now</Link>
                </div>
            )}

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem', color: '#333' }}>Full Name</label>
                    <input name="name" type="text" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem', color: '#333' }}>Email</label>
                    <input name="email" type="email" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem', color: '#333' }}>Password</label>
                    <input name="password" type="password" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>

                <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '0.5rem' }}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                Already have an account? <Link href="/auth/login" style={{ color: '#00204A', fontWeight: 600 }}>Log In</Link>
            </div>
        </div>
    );
}
