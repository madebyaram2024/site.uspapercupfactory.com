'use client';

import React, { useState } from 'react';
import { FacebookIcon, XIcon, LinkIcon, ShareIcon } from './SocialIcons';

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
    const [copied, setCopied] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const shareData = {
        title: title,
        text: description || title,
        url: typeof window !== 'undefined' ? `${window.location.origin}${url}` : url,
    };

    const handleNativeShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                setShowOptions(!showOptions);
            }
        } catch (err) {
            console.error('Error sharing:', err);
            setShowOptions(true);
        }
    };

    const copyToClipboard = async () => {
        try {
            const fullUrl = `${window.location.origin}${url}`;
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            setShowOptions(false);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const shareOnFB = () => {
        const fullUrl = encodeURIComponent(`${window.location.origin}${url}`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`, '_blank');
        setShowOptions(false);
    };

    const shareOnX = () => {
        const fullUrl = encodeURIComponent(`${window.location.origin}${url}`);
        const text = encodeURIComponent(title);
        window.open(`https://twitter.com/intent/tweet?url=${fullUrl}&text=${text}`, '_blank');
        setShowOptions(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={handleNativeShare}
                style={{
                    background: 'rgba(0,32,74,0.05)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-navy)',
                    transition: 'all 0.2s ease',
                }}
                title="Share"
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,32,74,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,32,74,0.05)')}
            >
                <ShareIcon size={20} />
            </button>

            {showOptions && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    right: '0',
                    marginBottom: '10px',
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    zIndex: 100,
                    minWidth: '150px',
                    border: '1px solid #eee'
                }}>
                    <button onClick={shareOnFB} style={optionButtonStyle}>
                        <FacebookIcon size={16} color="var(--color-navy)" /> Facebook
                    </button>
                    <button onClick={shareOnX} style={optionButtonStyle}>
                        <XIcon size={16} color="var(--color-navy)" /> X (Twitter)
                    </button>
                    <button onClick={copyToClipboard} style={optionButtonStyle}>
                        <LinkIcon size={16} color="var(--color-navy)" />
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            )}
        </div>
    );
}

const optionButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: '10px 16px',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '0.9rem',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'var(--color-navy)',
    transition: 'background 0.2s',
    fontWeight: '500'
};
