"use client";

import { useEffect, useRef } from 'react';

interface ScrollVideoProps {
    src: string;
    className?: string;
    style?: React.CSSProperties;
    poster?: string;
}

export default function ScrollVideo({ src, className, style, poster }: ScrollVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start playing when video enters view (50% threshold)
                    video.play().catch(error => {
                        console.warn("Video autoplay failed or was interrupted:", error);
                    });
                    // Once it starts playing, we can stop observing if we only want it to play once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5, // 50% of the video must be visible
            rootMargin: '0px'
        });

        observer.observe(video);

        return () => {
            if (video) observer.unobserve(video);
            observer.disconnect();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            className={className}
            style={style}
            muted
            playsInline
            preload="metadata"
            poster={poster}
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}
