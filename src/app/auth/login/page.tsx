
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
                setLoading(false);
            } else {
                window.location.href = "/dashboard";
            }
        } catch (err) {
            setError("Something went wrong");
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
                <h1 style={{ fontSize: '1.8rem', color: '#00204A', marginBottom: '0.5rem' }}>Welcome Back</h1>
                <p style={{ color: '#666' }}>Sign in to continue</p>
            </div>

            {error && (
                <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem', color: '#333' }}>Email</label>
                    <input name="email" type="email" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem', color: '#333' }}>Password</label>
                    <input name="password" type="password" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>

                <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '0.5rem' }}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            {/* Google Login - Disabled until Client ID provided
            <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                <span style={{ color: '#666', fontSize: '0.85rem' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
            </div>

            <button
                onClick={() => signIn('google')}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    color: '#333',
                    fontWeight: 500
                }}
            >
                <img src="https://authjs.dev/img/providers/google.svg" width="20" height="20" alt="Google" />
                Sign in with Google
            </button>
            */}

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                Don&apos;t have an account? <Link href="/auth/register" style={{ color: '#00204A', fontWeight: 600 }}>Sign Up</Link>
            </div>
        </div>
    );
}
