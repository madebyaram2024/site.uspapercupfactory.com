'use client';

import React, { useState } from 'react';
import GalleryModal from './GalleryModal';

interface GalleryItem {
    id: string;
    imageUrl: string;
    title: string;
    category: string;
}

interface GalleryGridProps {
    items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (item: GalleryItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        style={{
                            aspectRatio: '1/1',
                            position: 'relative',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            backgroundColor: '#f8f8f8',
                            transition: 'all 0.3s ease'
                        }}
                        className="gallery-card-container"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease'
                            }}
                            className="gallery-thumb"
                        />

                        {/* Hover Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,32,74,0.4)',
                            opacity: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'opacity 0.3s ease',
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }} className="gallery-overlay">
                            Quick View
                        </div>
                    </div>
                ))}
            </div>

            <GalleryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
            />

            <style jsx>{`
                .gallery-card-container:hover .gallery-thumb {
                    transform: scale(1.1);
                }
                .gallery-card-container:hover .gallery-overlay {
                    opacity: 1;
                }
                @media (max-width: 768px) {
                    .gallery-overlay {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}
