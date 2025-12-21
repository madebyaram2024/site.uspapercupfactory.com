'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroCarouselProps {
    images: string[];
    interval?: number;
}

export default function HeroCarousel({ images, interval = 4000 }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    if (!images || images.length === 0) return null;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            {images.map((src, index) => (
                <div
                    key={src + index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        zIndex: index === currentIndex ? 1 : 0
                    }}
                >
                    <Image
                        src={src}
                        alt={`Gallery Inspiration ${index + 1}`}
                        fill
                        priority={index === 0}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            ))}

            {/* Visual Indicator (Optional) */}
            <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                display: 'flex',
                gap: '0.5rem',
                zIndex: 10
            }}>
                {images.length > 1 && images.slice(0, 16).map((_, idx) => (
                    <div
                        key={idx}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: idx === currentIndex ? 'var(--color-red)' : 'rgba(255,255,255,0.5)',
                            transition: 'all 0.3s ease'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
