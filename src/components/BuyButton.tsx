
'use client';

import { useState } from 'react';

interface BuyButtonProps {
    productName: string;
    quantity: number;
    unitAmount: number; // in dollars (e.g., 50.00)
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function BuyButton({ productName, quantity, unitAmount, className, style, children }: BuyButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Steps: 'stock', 'size', 'design', 'instructions', 'upload'
    const [step, setStep] = useState<'stock' | 'size' | 'design' | 'instructions' | 'upload'>('stock');

    // Selections
    const [stockType, setStockType] = useState<'White' | 'Craft'>('White');
    const [cupSize, setCupSize] = useState<string>('');
    const [_preference, setPreference] = useState<'upload' | 'design' | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [instructions, setInstructions] = useState('');
    const [artworkFile, setArtworkFile] = useState<File | null>(null);

    const handleInitialClick = () => {
        setIsModalOpen(true);
        setStep('stock'); // Always start at stock selection
    };

    const handleStockSelect = (type: 'White' | 'Craft') => {
        if (type === 'Craft') return; // Disabled for now
        setStockType(type);
        setStep('size');
    };

    const handleSizeSelect = (size: string) => {
        setCupSize(size);
        setStep('design');
    };

    const handlePreferenceSelect = (choice: 'upload' | 'design') => {
        setPreference(choice);
        if (choice === 'design') {
            setStep('instructions');
        } else {
            setStep('upload');
        }
    };

    const handleInstructionsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        initiateCheckout(stockType, cupSize, 'Professional Design', instructions);
    };

    const handleUploadSubmit = async () => {
        if (!artworkFile) {
            alert('Please select a file to upload.');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', artworkFile);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const uploadData = await uploadRes.json();

            if (!uploadData.url) {
                throw new Error(uploadData.error || 'Upload failed');
            }

            // Proceed to checkout with URL
            initiateCheckout(stockType, cupSize, 'Upload Own Artwork', 'See attached artwork.', uploadData.url);

        } catch (error) {
            console.error('Upload Error:', error);
            alert('File upload failed. Please try again.');
            setIsLoading(false);
        }
    };

    const initiateCheckout = async (stock: string, size: string, designPref: string, designInstr: string, artworkUrl?: string) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName,
                    quantity,
                    unitAmount,
                    stockType: stock,
                    cupSize: size,
                    designPreference: designPref,
                    designInstructions: designInstr,
                    artworkUrl: artworkUrl, // Pass to backend
                }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                alert(`Checkout Failed: ${data.error || 'Something went wrong initiating checkout.'}`);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please check your connection.');
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Reset state for next time
        setTimeout(() => {
            setStep('stock');
            setStockType('White');
            setCupSize('');
            setPreference(null);
            setInstructions('');
            setArtworkFile(null);
        }, 300);
    };

    return (
        <>
            <button
                className={className}
                style={style}
                onClick={handleInitialClick}
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : (children || 'Order Now')}
            </button>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }} onClick={closeModal}>

                    {/* Modal Content */}
                    <div style={{
                        background: 'white',
                        padding: '2.5rem',
                        borderRadius: 'var(--radius-md)',
                        maxWidth: '500px',
                        width: '90%',
                        position: 'relative',
                        boxShadow: 'var(--shadow-lg)'
                    }} onClick={e => e.stopPropagation()}>

                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute', top: '15px', right: '15px',
                                background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer',
                                color: '#999'
                            }}
                        >
                            &times;
                        </button>

                        {/* STEP 1: STOCK SELECTION */}
                        {step === 'stock' && (
                            <>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--color-navy)', textAlign: 'center' }}>
                                    Select Paper Type
                                </h2>
                                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
                                    Choose the base material for your cups.
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <button
                                        onClick={() => handleStockSelect('White')}
                                        className="hover-border-navy"
                                        style={{
                                            padding: '1.5rem',
                                            background: 'white',
                                            border: '2px solid var(--color-navy)',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'white', border: '1px solid #ddd', borderRadius: '50%' }}></div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-navy)' }}>White</div>
                                                <div style={{ fontSize: '0.9rem', color: '#888' }}>Standard bright white paper base.</div>
                                            </div>
                                        </div>
                                        <span style={{ color: 'var(--color-navy)', fontWeight: 'bold' }}>Select &rarr;</span>
                                    </button>

                                    <button
                                        disabled
                                        style={{
                                            padding: '1.5rem',
                                            background: '#f5f5f5',
                                            border: '2px solid #ddd',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'not-allowed',
                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            opacity: 0.7
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', background: '#d2b48c', borderRadius: '50%' }}></div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#666' }}>Craft</div>
                                                <div style={{ fontSize: '0.9rem', color: '#999' }}>Eco-friendly brown paper look.</div>
                                            </div>
                                        </div>
                                        <span style={{ color: '#666', fontWeight: 'bold', fontSize: '0.9rem', background: '#e0e0e0', padding: '4px 8px', borderRadius: '4px' }}>COMING SOON</span>
                                    </button>
                                </div>
                            </>
                        )}


                        {/* STEP 2: SIZE SELECTION */}
                        {step === 'size' && (
                            <>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--color-navy)', textAlign: 'center' }}>
                                    Select Cup Size
                                </h2>
                                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '1.1rem' }}>
                                    Selected: <strong>{stockType} Paper</strong>
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                    {[
                                        { label: '8oz', available: true },
                                        { label: '10oz', available: true },
                                        { label: '12oz', available: true },
                                        { label: '14oz', available: false },
                                        { label: '16oz', available: false },
                                    ].map((sizeObj) => (
                                        <button
                                            key={sizeObj.label}
                                            onClick={() => sizeObj.available && handleSizeSelect(sizeObj.label)}
                                            className={sizeObj.available ? "hover-border-navy" : ""}
                                            disabled={!sizeObj.available}
                                            style={{
                                                padding: '1.25rem',
                                                background: sizeObj.available ? 'white' : '#f5f5f5',
                                                border: sizeObj.available ? '2px solid #eee' : '2px solid #ddd',
                                                borderRadius: 'var(--radius-sm)',
                                                cursor: sizeObj.available ? 'pointer' : 'not-allowed',
                                                fontSize: '1.25rem',
                                                fontWeight: 'bold',
                                                color: sizeObj.available ? 'var(--color-navy)' : '#999',
                                                textAlign: 'center',
                                                transition: 'all 0.2s',
                                                gridColumn: sizeObj.label === '16oz' ? 'span 2' : 'auto',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {sizeObj.label}
                                            {!sizeObj.available && (
                                                <div style={{
                                                    fontSize: '0.6rem',
                                                    background: '#999',
                                                    color: 'white',
                                                    padding: '2px 0',
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}>
                                                    Coming Soon
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setStep('stock')}
                                    style={{ marginTop: '2rem', width: '100%', background: 'none', border: 'none', textDecoration: 'underline', color: '#666', cursor: 'pointer' }}
                                >
                                    &larr; Back to Paper Selection
                                </button>
                            </>
                        )}


                        {/* STEP 3: DESIGN PREFERENCE */}
                        {step === 'design' && (
                            <>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--color-navy)', textAlign: 'center' }}>
                                    Design Options
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '1.1rem' }}>
                                        Selected: <strong>{stockType} {cupSize}</strong>
                                    </p>

                                    <button
                                        onClick={() => handlePreferenceSelect('upload')}
                                        className="hover-border-navy"
                                        style={{
                                            padding: '1.5rem',
                                            background: 'white',
                                            border: '2px solid #eee',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>📂</span>
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-navy)' }}>I have my own artwork</div>
                                            <div style={{ fontSize: '0.9rem', color: '#888' }}>Upload your logo or design file now.</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handlePreferenceSelect('design')}
                                        className="hover-border-navy"
                                        style={{
                                            padding: '1.5rem',
                                            background: 'white',
                                            border: '2px solid #eee',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>🎨</span>
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-navy)' }}>Create a design for me</div>
                                            <div style={{ fontSize: '0.9rem', color: '#888' }}>Our pro designers will create it for Free.</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setStep('size')}
                                        style={{ marginTop: '1rem', background: 'none', border: 'none', textDecoration: 'underline', color: '#666', cursor: 'pointer' }}
                                    >
                                        &larr; Back to Size Selection
                                    </button>
                                </div>
                            </>
                        )}

                        {/* STEP 4: DESIGN INSTRUCTIONS (For 'Create a design for me') */}
                        {step === 'instructions' && (
                            <>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--color-navy)', textAlign: 'center' }}>
                                    Design Details
                                </h2>
                                <form onSubmit={handleInstructionsSubmit}>
                                    <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                                        Tell us a bit about what you need. (e.g. &quot;Business Logo&quot;, &quot;Happy Birthday Sarah&quot;, specific colors, etc.)
                                    </p>
                                    <textarea
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                        placeholder="Enter your design instructions here..."
                                        rows={4}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            marginBottom: '1.5rem',
                                            fontSize: '1rem'
                                        }}
                                        required
                                    />
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            type="button"
                                            onClick={() => setStep('design')}
                                            className="btn"
                                            style={{ flex: 1, background: '#f0f0f0', color: '#333' }}
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{ flex: 2 }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {/* STEP 5: UPLOAD ARTWORK (For 'I have my own artwork') */}
                        {step === 'upload' && (
                            <>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--color-navy)', textAlign: 'center' }}>
                                    Upload Artwork
                                </h2>
                                <p style={{ marginBottom: '1.5rem', color: '#666', textAlign: 'center' }}>
                                    Please upload your logo or design file (PNG, JPG, PDF, AI, EPS).
                                </p>

                                <div style={{ marginBottom: '2rem' }}>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf,.ai,.eps"
                                        onChange={(e) => setArtworkFile(e.target.files ? e.target.files[0] : null)}
                                        style={{ display: 'block', width: '100%', padding: '10px', border: '1px dashed #ccc', borderRadius: '4px' }}
                                    />
                                    {artworkFile && (
                                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'green' }}>Selected: {artworkFile.name}</p>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setStep('design')}
                                        className="btn"
                                        style={{ flex: 1, background: '#f0f0f0', color: '#333' }}
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleUploadSubmit}
                                        className="btn btn-primary"
                                        style={{ flex: 2 }}
                                        disabled={isLoading || !artworkFile}
                                    >
                                        {isLoading ? 'Uploading...' : 'Upload & Checkout'}
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}
        </>
    );
}
