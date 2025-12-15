
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

    // Steps: 'stock' -> 'size' -> 'details' -> 'proofing'
    const [step, setStep] = useState<'stock' | 'size' | 'details' | 'proofing'>('stock');

    // Selections
    const [stockType, setStockType] = useState<'White' | 'Craft'>('White');
    const [cupSize, setCupSize] = useState<string>('');
    const [instructions, setInstructions] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [proofingOption, setProofingOption] = useState<'digital' | 'photo' | 'physical'>('digital');

    const handleInitialClick = () => {
        setIsModalOpen(true);
        setStep('stock');
    };

    const handleStockSelect = (type: 'White' | 'Craft') => {
        if (type === 'Craft') return;
        setStockType(type);
        setStep('size');
    };

    const handleSizeSelect = (size: string) => {
        setCupSize(size);
        setStep('details');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            // Limit to 5 files total
            if (files.length + newFiles.length > 5) {
                alert('You can only upload a maximum of 5 files.');
                return;
            }
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('proofing');
    };

    const handleFinalSubmit = async () => {
        setIsLoading(true);
        try {
            // Upload all files first
            const uploadedUrls: string[] = [];

            if (files.length > 0) {
                const uploadPromises = files.map(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                    const data = await res.json();
                    if (data.url) return data.url;
                    throw new Error(data.error || 'Upload failed');
                });

                const results = await Promise.all(uploadPromises);
                uploadedUrls.push(...results);
            }

            // Initiate Checkout
            initiateCheckout(stockType, cupSize, instructions, uploadedUrls, proofingOption);

        } catch (error: any) {
            console.error('Process Error:', error);
            alert(`Failed: ${error.message || 'Something went wrong.'}`);
            setIsLoading(false);
        }
    };

    const initiateCheckout = async (stock: string, size: string, designInstr: string, artworkUrls: string[], proofing: string) => {
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName,
                    quantity,
                    unitAmount,
                    stockType: stock,
                    cupSize: size,
                    designInstructions: designInstr,
                    artworkUrls,
                    proofingOption: proofing,
                }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                alert(`Checkout Failed: ${data.error || 'Something went wrong.'}`);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Connection failed. Please try again.');
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setStep('stock');
            setStockType('White');
            setCupSize('');
            setInstructions('');
            setFiles([]);
            setProofingOption('digital');
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

            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, backdropFilter: 'blur(5px)'
                }} onClick={closeModal}>

                    <div style={{
                        background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-md)',
                        maxWidth: '550px', width: '90%', position: 'relative',
                        boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto'
                    }} onClick={e => e.stopPropagation()}>

                        <button onClick={closeModal} style={{
                            position: 'absolute', top: '15px', right: '15px',
                            background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999'
                        }}>&times;</button>

                        {/* STEP 1: STOCK */}
                        {step === 'stock' && (
                            <>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-navy)', textAlign: 'center' }}>Select Paper Type</h2>
                                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>Choose the base material for your cups.</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <button onClick={() => handleStockSelect('White')} className="hover-border-navy" style={{
                                        padding: '1.5rem', background: 'white', border: '2px solid var(--color-navy)',
                                        borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'white', border: '1px solid #ddd', borderRadius: '50%' }}></div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-navy)' }}>White</div>
                                                <div style={{ fontSize: '0.9rem', color: '#888' }}>Standard bright white paper base.</div>
                                            </div>
                                        </div>
                                        <span style={{ color: 'var(--color-navy)', fontWeight: 'bold' }}>Select &rarr;</span>
                                    </button>
                                    <button disabled style={{
                                        padding: '1.5rem', background: '#f5f5f5', border: '2px solid #ddd',
                                        borderRadius: 'var(--radius-sm)', cursor: 'not-allowed', textAlign: 'left',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.7
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', background: '#d2b48c', borderRadius: '50%' }}></div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#666' }}>Craft</div>
                                                <div style={{ fontSize: '0.9rem', color: '#999' }}>Eco-friendly brown paper look.</div>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', background: '#e0e0e0', padding: '4px 8px', borderRadius: '4px' }}>COMING SOON</span>
                                    </button>
                                </div>
                            </>
                        )}

                        {/* STEP 2: SIZE */}
                        {step === 'size' && (
                            <>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--color-navy)', textAlign: 'center' }}>Select Cup Size</h2>
                                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666' }}>Selected: <strong>{stockType} Paper</strong></p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                    {['8oz', '10oz', '12oz', '14oz', '16oz'].map(s => {
                                        const avail = ['8oz', '10oz', '12oz'].includes(s);
                                        return (
                                            <button key={s} onClick={() => avail && handleSizeSelect(s)} disabled={!avail}
                                                className={avail ? "hover-border-navy" : ""}
                                                style={{
                                                    padding: '1.25rem', background: avail ? 'white' : '#f5f5f5',
                                                    border: avail ? '2px solid #eee' : '2px solid #ddd', borderRadius: 'var(--radius-sm)',
                                                    cursor: avail ? 'pointer' : 'not-allowed', fontSize: '1.25rem', fontWeight: 'bold',
                                                    color: avail ? 'var(--color-navy)' : '#999', position: 'relative',
                                                    gridColumn: s === '16oz' ? 'span 2' : 'auto'
                                                }}>
                                                {s} {!avail && <span style={{ display: 'block', fontSize: '0.6rem', marginTop: '4px' }}>OUT OF STOCK</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button onClick={() => setStep('stock')} style={{ marginTop: '2rem', background: 'none', border: 'none', textDecoration: 'underline', color: '#666', cursor: 'pointer', width: '100%' }}>&larr; Back</button>
                            </>
                        )}

                        {/* STEP 3: DETAILS (New Unified Step) */}
                        {step === 'details' && (
                            <form onSubmit={handleDetailsSubmit}>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-navy)', textAlign: 'center' }}>Customize Your Design</h2>
                                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666', fontSize: '0.9rem' }}>
                                    Upload any digital files you may have to help us design the perfect paper cup.
                                </p>

                                {/* File Upload */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                                        Upload Assets (Optional)
                                    </label>
                                    <div style={{ border: '2px dashed #ddd', padding: '1rem', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fafafa' }}>
                                        <input
                                            type="file"
                                            id="file-upload"
                                            multiple
                                            accept="image/*,.pdf,.ai,.eps,.svg"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="file-upload" style={{ cursor: 'pointer', color: 'var(--color-blue)', fontWeight: 'bold', display: 'block', padding: '10px' }}>
                                            + Click to Add Files
                                        </label>
                                        {files.length > 0 && (
                                            <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                                                {files.map((f, i) => (
                                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', padding: '4px 0', borderBottom: '1px solid #eee' }}>
                                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{f.name}</span>
                                                        <span onClick={() => removeFile(i)} style={{ color: 'red', cursor: 'pointer' }}>&times;</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>Max 5 files. (PDF, AI, EPS, PNG, JPG)</p>
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                                        Design Brief / Instructions
                                    </label>
                                    <textarea
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                        placeholder="Describe what you want your cups to look like. Mention colors, positioning, or any specific details..."
                                        rows={4}
                                        style={{ width: '100%', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="button" onClick={() => setStep('size')} className="btn" style={{ flex: 1, background: '#f0f0f0', color: '#333' }}>Back</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Next: Proofing &rarr;</button>
                                </div>
                            </form>
                        )}

                        {/* STEP 4: PROOFING (New Step) */}
                        {step === 'proofing' && (
                            <div>
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-navy)', textAlign: 'center' }}>Proofing & Finalize</h2>
                                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                                    Select how you would like to approve your design.
                                </p>

                                {/* Rush Order Alert */}
                                <div style={{ background: '#fff0f0', borderLeft: '4px solid #ff4d4d', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px' }}>
                                    <strong style={{ color: '#d32f2f' }}>Need a Rush Order?</strong>
                                    <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.5rem' }}>
                                        Please contact us before ordering to confirm delivery availability.<br />
                                        Call/Text: <strong>747.338.8959</strong> or Email: <strong>rushorders@uspapercupfactory.com</strong>
                                    </p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                    {/* Option 1: Digital */}
                                    <label style={{
                                        display: 'flex', alignItems: 'center', padding: '1rem',
                                        border: proofingOption === 'digital' ? '2px solid var(--color-navy)' : '1px solid #ddd',
                                        background: proofingOption === 'digital' ? '#f0f4ff' : 'white',
                                        borderRadius: '8px', cursor: 'pointer'
                                    }}>
                                        <input type="radio" name="proofing" checked={proofingOption === 'digital'} onChange={() => setProofingOption('digital')} />
                                        <div style={{ marginLeft: '1rem' }}>
                                            <div style={{ fontWeight: 'bold' }}>Digital Mockup (Free)</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>High-quality PDF proof sent to your email.</div>
                                        </div>
                                    </label>

                                    {/* Option 2: Photo */}
                                    <label style={{
                                        display: 'flex', alignItems: 'center', padding: '1rem',
                                        border: proofingOption === 'photo' ? '2px solid var(--color-navy)' : '1px solid #ddd',
                                        background: proofingOption === 'photo' ? '#f0f4ff' : 'white',
                                        borderRadius: '8px', cursor: 'pointer'
                                    }}>
                                        <input type="radio" name="proofing" checked={proofingOption === 'photo'} onChange={() => setProofingOption('photo')} />
                                        <div style={{ marginLeft: '1rem' }}>
                                            <div style={{ fontWeight: 'bold' }}>Printed Cup Photo (+$9.99)</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>We print one cup and email you a photo.</div>
                                        </div>
                                    </label>

                                    {/* Option 3: Physical */}
                                    <label style={{
                                        display: 'flex', alignItems: 'center', padding: '1rem',
                                        border: proofingOption === 'physical' ? '2px solid var(--color-navy)' : '1px solid #ddd',
                                        background: proofingOption === 'physical' ? '#f0f4ff' : 'white',
                                        borderRadius: '8px', cursor: 'pointer'
                                    }}>
                                        <input type="radio" name="proofing" checked={proofingOption === 'physical'} onChange={() => setProofingOption('physical')} />
                                        <div style={{ marginLeft: '1rem' }}>
                                            <div style={{ fontWeight: 'bold' }}>Mailed Physical Sample (+$19.99)</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>Actual printed cup mailed to your address.</div>
                                        </div>
                                    </label>
                                </div>

                                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem', background: '#fafafa', padding: '0.5rem', borderRadius: '4px' }}>
                                    <strong>Policy:</strong> First round of changes is free. Subsequent rounds are $19.00 each.
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => setStep('details')} className="btn" style={{ flex: 1, background: '#f0f0f0', color: '#333' }}>Back</button>
                                    <button onClick={handleFinalSubmit} disabled={isLoading} className="btn btn-primary" style={{ flex: 2 }}>
                                        {isLoading ? 'Processing...' : `Pay $${(quantity * (unitAmount / quantity) + (proofingOption === 'photo' ? 9.99 : proofingOption === 'physical' ? 19.99 : 0)).toFixed(2)}`}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
