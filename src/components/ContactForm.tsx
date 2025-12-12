
'use client';

import { useState } from 'react';
import { submitContact } from '@/actions/contact';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const message = formData.get('message') as string;

        const res = await submitContact({ name, email, phone, message });

        if (res.error) {
            setError(res.error);
        } else {
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div style={{ background: '#dcfce7', color: '#166534', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem' }}>Message Sent!</h3>
                <p>We'll get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} style={{ marginTop: '1rem', background: 'transparent', border: '1px solid currentColor', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', color: 'inherit' }}>Send Another</button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {error && <div style={{ color: 'red', fontSize: '0.9rem' }}>{error}</div>}
            <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                <input type="text" id="name" name="name" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Your Name" />
            </div>
            <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                <input type="email" id="email" name="email" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="your@email.com" />
            </div>
            <div>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone (Optional)</label>
                <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="(555) 123-4567" />
            </div>
            <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                <textarea id="message" name="message" required rows={5} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Tell us about your project..."></textarea>
            </div>
            <button disabled={loading} type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
                {loading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
