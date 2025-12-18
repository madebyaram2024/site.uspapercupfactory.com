'use client';

import React, { useEffect } from 'react';
import SocialShare from './SocialShare';

interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: {
        imageUrl: string;
        title: string;
        category: string;
    } | null;
}

export default function GalleryModal({ isOpen, onClose, item }: GalleryModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen || !item) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 32, 74, 0.95)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                cursor: 'zoom-out'
            }}
            onClick={onClose}
        >
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-navy)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    zIndex: 1010,
                    transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
                ✕
            </button>

            <div
                style={{
                    maxWidth: '1200px',
                    width: '100%',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'default'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                    />
                </div>

                <div style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    color: 'white',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <span style={{
                        color: 'var(--color-gold)',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        letterSpacing: '2px',
                        marginBottom: '0.5rem'
                    }}>{item.category}</span>
                    <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1.5rem', textTransform: 'none' }}>{item.title}</h2>

                    <div style={{ background: 'white', padding: '8px', borderRadius: '50px', display: 'flex', alignItems: 'center' }}>
                        <SocialShare
                            url="/gallery"
                            title={`Custom Cup: ${item.title}`}
                            description={`Inspiration for your next custom paper cup: ${item.title}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
