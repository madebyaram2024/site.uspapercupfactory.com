
'use client';

import { useState, useEffect } from 'react';

export default function QCPage() {
    const [logs, setLogs] = useState<string[]>([]);

    // Simulate incoming AI logs
    useEffect(() => {
        const messages = [
            "Scanning Order #1024... NO DEFECTS DETECTED (99.9%)",
            "Analyzing Cup Rim Alignment... PASS",
            "Color Calibration Check... SEAMLESS",
            "Checking Bottom Seal Integrity... 100% SEAL",
            "Order #1025 Entering Optical Scanner...",
            "AI Vision: 200 items verified in last 10s"
        ];

        const interval = setInterval(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            const time = new Date().toLocaleTimeString();
            setLogs(prev => [`[${time}] ${randomMsg}`, ...prev].slice(0, 15));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>Quality Control Agent <span style={{ fontSize: '1rem', background: '#e6ffe6', color: 'green', padding: '5px 10px', borderRadius: '20px', verticalAlign: 'middle', marginLeft: '10px' }}>● LIVE</span></h1>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>System Status</div>
                    <div style={{ fontWeight: 'bold', color: 'green' }}>OPERATIONAL</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Camera Feeds Panel */}
                <div style={{ background: 'black', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Optical Camera Array (Main Line)</span>
                        <span style={{ color: 'red', animation: 'pulse 1s infinite' }}>● REC</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {[1, 2, 3, 4].map(cam => (
                            <div key={cam} style={{
                                height: '200px',
                                background: '#1a1a1a',
                                border: '1px solid #333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <span style={{ opacity: 0.5 }}>CAM 0{cam} - FEED SIGNAL</span>
                                <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.8rem', fontFamily: 'monospace', color: '#0f0' }}>
                                    Targeting...
                                </div>
                                {/* Crosshair overlay */}
                                <div style={{ position: 'absolute', border: '1px solid rgba(0,255,0,0.3)', width: '50px', height: '50px' }}></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Analysis Log */}
                <div style={{ background: '#1a1a1a', color: '#0f0', padding: '1rem', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                        AI_AGENT_V4.2 OUTPUT STREAM
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden', fontSize: '0.85rem' }}>
                        {logs.map((log, i) => (
                            <div key={i} style={{ marginBottom: '0.5rem', opacity: 1 - (i * 0.05) }}>
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Scanned Today</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>14,205</div>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Defects Caught</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'green' }}>0</div>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Accuracy Rate</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>99.98%</div>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Uptime</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>42d 12h</div>
                </div>
            </div>
        </div>
    );
}
