
'use client';

import React, { useEffect } from 'react';

interface PricelistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PricelistModal({ isOpen, onClose }: PricelistModalProps) {

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem'
        }} onClick={onClose}>
            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
            }} onClick={(e) => e.stopPropagation()}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'none',
                        border: 'none',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        lineHeight: 1,
                        color: '#666'
                    }}
                >
                    &times;
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', color: '#0a192f', marginBottom: '0.5rem' }}>US PAPER CUP FACTORY</h2>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'normal', color: '#666' }}>Official Price List</h3>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #ddd', fontSize: '0.95rem' }}>
                    <thead>
                        <tr style={{ background: '#0a192f', color: 'white' }}>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Quantity</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Price Per Cup</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { q: '25 cups', ppc: '$2.00', total: '$50.00' },
                            { q: '50 cups', ppc: '$1.50', total: '$75.00' },
                            { q: '100 cups', ppc: '$1.00', total: '$100.00' },
                            { q: '250 cups', ppc: '$0.75', total: '$187.50' },
                            { q: '500 cups', ppc: '$0.50', total: '$250.00' },
                            { q: '1,000 cups', ppc: '$0.20', total: '$200.00' },
                            { q: '5,000 cups', ppc: '$0.15', total: '$750.00' },
                            { q: '10,000+ cups', ppc: '$0.10', total: 'Starting at $1,000' },
                        ].map((row, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{row.q}</td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{row.ppc}</td>
                                <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{row.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: '#666' }}>
                    <p>All prices include custom full-color printing. Shipping calculated at checkout.</p>
                </div>

                <div className="no-print" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <button onClick={() => window.print()} className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Print This Page</button>
                    <button onClick={onClose} className="btn" style={{ padding: '8px 20px', fontSize: '0.9rem', marginLeft: '10px', border: '1px solid #ccc' }}>Close</button>
                </div>
            </div>
        </div>
    );
}
