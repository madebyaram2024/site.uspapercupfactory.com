
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { validateRefCode } from '@/actions/design-ref';
import { getLastOrders } from '@/actions/order-history';

const quantities = [
    { qty: 25, price: 50.00, perCup: '$2.00' },
    { qty: 50, price: 87.50, perCup: '$1.75' },
    { qty: 100, price: 150.00, perCup: '$1.50' },
    { qty: 250, price: 250.00, perCup: '$1.00' },
    { qty: 500, price: 250.00, perCup: '$0.50' },
    { qty: 1000, price: 250.00, perCup: '$0.25' },
    { qty: 5000, price: 1000.00, perCup: '$0.20' },
    { qty: 10000, price: 1500.00, perCup: '$0.15', isPlus: true }
];

const sizes = [
    { id: '8oz', label: '8oz', available: true },
    { id: '10oz', label: '10oz', available: true },
    { id: '12oz', label: '12oz', available: true },
    { id: '14oz', label: '14oz', available: true },
    { id: '16oz', label: '16oz', available: false }
];

const paperAvailability: Record<string, { White: boolean; Craft: boolean }> = {
    '8oz': { White: true, Craft: false },
    '10oz': { White: true, Craft: false },
    '12oz': { White: true, Craft: false },
    '14oz': { White: true, Craft: true },
    '16oz': { White: false, Craft: false },
};

export default function OrderConfigurator() {
    const [selectedSize, setSelectedSize] = useState('12oz');
    const [selectedPaper, setSelectedPaper] = useState('White');
    const [selectedQty, setSelectedQty] = useState(quantities[2]); // Default 100
    const [instructions, setInstructions] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [designOption, setDesignOption] = useState<'upload' | 'request' | 'reorder' | 'ref_code'>('upload');
    const [proofingOption, setProofingOption] = useState<'digital' | 'photo' | 'physical'>('digital');
    const [isLoading, setIsLoading] = useState(false);

    // PRFRN State
    const [refCode, setRefCode] = useState('');
    const [refCodeError, setRefCodeError] = useState('');
    const [refCodeSuccess, setRefCodeSuccess] = useState('');

    // Order History State
    const [pastOrders, setPastOrders] = useState<any[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    // Reset paper selection if the newly selected size doesn't support the current paper
    useEffect(() => {
        const available = paperAvailability[selectedSize];
        if (selectedPaper === 'Craft' && !available.Craft) {
            setSelectedPaper('White');
        }
    }, [selectedSize, selectedPaper]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            if (files.length + newFiles.length > 5) {
                alert('Maximum 5 files allowed.');
                return;
            }
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const handleRefCodeSubmit = async () => {
        setRefCodeError('');
        setRefCodeSuccess('');

        if (refCode.length !== 7) {
            setRefCodeError('Code must be 7 digits.');
            return;
        }

        const res = await validateRefCode(refCode);
        if (res.success) {
            setRefCodeSuccess(`Code Validated! File loaded.`);
            // In a real app we might want to show the file name or thumbnail
        } else {
            setRefCodeError(res.error || 'Invalid code.');
        }
    };

    const fetchPastOrders = async () => {
        setIsLoadingOrders(true);
        try {
            const orders = await getLastOrders();
            setPastOrders(orders);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setIsLoadingOrders(false);
        }
    };

    useEffect(() => {
        if (designOption === 'reorder') {
            fetchPastOrders();
        }
    }, [designOption]);

    const handleReorderSelect = (order: any) => {
        // Auto-select size and quantity based on past order
        // Note: Logic depends on how strictly we want to match legacy data
        if (order.details?.includes('8oz')) setSelectedSize('8oz');
        if (order.details?.includes('10oz')) setSelectedSize('10oz');
        // ... simplistic matching, can be improved

        // Use a rough match for quantity
        const qtyMatch = quantities.find(q => q.qty === order.quantity);
        if (qtyMatch) setSelectedQty(qtyMatch);

        alert(`Loaded specs from Order #${order.id.slice(-6)}`);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        let total = selectedQty.price;
        if (proofingOption === 'photo') total += 9.99;
        if (proofingOption === 'physical') total += 19.99;
        return total.toFixed(2);
    };

    const handleOrder = async () => {
        setIsLoading(true);
        try {
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

            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: `${selectedQty.qty} Cups`,
                    quantity: selectedQty.qty,
                    unitAmount: selectedQty.price,
                    stockType: selectedPaper,
                    cupSize: selectedSize,
                    designInstructions: instructions || `Design Option: ${designOption} ${refCode ? `(Ref: ${refCode})` : ''}`,
                    artworkUrls: uploadedUrls,
                    proofingOption: proofingOption,
                }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Checkout failed');
            }
        } catch (error: any) {
            console.error('Order Error:', error);
            alert(`Failed to start order: ${error.message}`);
            setIsLoading(false);
        }
    };

    return (
        <section id="order" className="configurator-section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title">Configure Your Order</h2>
                    <p>Select your options and get an instant price. All orders include Concierge Design as standard.</p>
                </div>

                <div className="configurator-grid">
                    {/* LEFT: SELECTIONS */}
                    <div className="configurator-selections">

                        {/* SIZE SELECTION */}
                        <div className="selection-group">
                            <label className="selection-label">1. CHOOSE YOUR SIZE</label>
                            <div className="size-grid">
                                {sizes.map(size => (
                                    <button
                                        key={size.id}
                                        onClick={() => size.available && setSelectedSize(size.id)}
                                        className={`size-btn ${selectedSize === size.id ? 'active' : ''} ${!size.available ? 'disabled' : ''}`}
                                    >
                                        {size.label}
                                        {!size.available && <span className="status-tag">Coming Soon</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* PAPER SELECTION */}
                        <div className="selection-group">
                            <label className="selection-label">2. CHOOSE YOUR PAPER</label>
                            <div className="paper-grid">
                                <button
                                    onClick={() => setSelectedPaper('White')}
                                    className={`paper-btn ${selectedPaper === 'White' ? 'active' : ''}`}
                                >
                                    <div className="paper-swatch white"></div>
                                    <span>Premium White</span>
                                </button>
                                <button
                                    onClick={() => paperAvailability[selectedSize].Craft && setSelectedPaper('Craft')}
                                    className={`paper-btn ${selectedPaper === 'Craft' ? 'active' : ''} ${!paperAvailability[selectedSize].Craft ? 'disabled' : ''}`}
                                >
                                    <div className="paper-swatch craft"></div>
                                    <span>Eco Kraft</span>
                                    {!paperAvailability[selectedSize].Craft && <span className="status-tag">Coming Soon</span>}
                                </button>
                            </div>
                        </div>

                        {/* QUANTITY SELECTION */}
                        <div className="selection-group">
                            <label className="selection-label">3. CHOOSE QUANTITY</label>
                            <div className="qty-grid">
                                {quantities.map(q => (
                                    <button
                                        key={q.qty}
                                        onClick={() => setSelectedQty(q)}
                                        className={`qty-btn ${selectedQty.qty === q.qty ? 'active' : ''}`}
                                    >
                                        <span className="qty-val">{q.qty.toLocaleString()}{(q as any).isPlus ? '+' : ''}</span>
                                        <span className="qty-per-cup">{q.perCup}/ea</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* DESIGN OPTIONS */}
                        <div className="selection-group">
                            <label className="selection-label">4. DESIGN & ARTWORK</label>
                            <div className="design-options-grid">
                                <button
                                    onClick={() => setDesignOption('upload')}
                                    className={`design-opt-btn ${designOption === 'upload' ? 'active' : ''}`}
                                >
                                    <span className="opt-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                    </span>
                                    <div className="opt-text">
                                        <strong>Upload Artwork</strong>
                                        <p>I have my own files</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setDesignOption('request')}
                                    className={`design-opt-btn ${designOption === 'request' ? 'active' : ''}`}
                                >
                                    <span className="opt-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </span>
                                    <div className="opt-text">
                                        <strong>Pro Design + AI</strong>
                                        <p>Expert AI-optimized design</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setDesignOption('reorder')}
                                    className={`design-opt-btn ${designOption === 'reorder' ? 'active' : ''}`}
                                >
                                    <span className="opt-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="23 4 23 10 17 10" />
                                            <polyline points="1 20 1 14 7 14" />
                                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                                        </svg>
                                    </span>
                                    <div className="opt-text">
                                        <strong>Reorder</strong>
                                        <p>Use my last design</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setDesignOption('ref_code')}
                                    className={`design-opt-btn ${designOption === 'ref_code' ? 'active' : ''}`}
                                >
                                    <span className="opt-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                        </svg>
                                    </span>
                                    <div className="opt-text">
                                        <strong>Ref. Code</strong>
                                        <p>Enter 7-digit PRFRN</p>
                                    </div>
                                </button>
                            </div>

                            {designOption === 'ref_code' && (
                                <div className="ref-code-area animate-fade-in">
                                    <div className="ref-input-group">
                                        <input
                                            type="text"
                                            placeholder="Enter 7-digit code (e.g. 1234567)"
                                            value={refCode}
                                            onChange={(e) => setRefCode(e.target.value.replace(/\D/g, '').slice(0, 7))}
                                            className="ref-input"
                                        />
                                        <button onClick={handleRefCodeSubmit} className="btn-verify">Verify</button>
                                    </div>
                                    {refCodeError && <p className="ref-error">{refCodeError}</p>}
                                    {refCodeSuccess && <p className="ref-success">{refCodeSuccess}</p>}
                                </div>
                            )}

                            {designOption === 'reorder' && (
                                <div className="reorder-area animate-fade-in">
                                    {isLoadingOrders ? (
                                        <p>Loading your past orders...</p>
                                    ) : pastOrders.length > 0 ? (
                                        <div className="past-orders-list">
                                            {pastOrders.map(order => (
                                                <div key={order.id} className="past-order-item" onClick={() => handleReorderSelect(order)}>
                                                    <strong>#{order.id.slice(-6)}</strong>
                                                    <span>{new Date(order.date).toLocaleDateString()}</span>
                                                    <span>{order.quantity} cups</span>
                                                    <span>${order.total.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No recent orders found. Please ensure you are logged in.</p>
                                    )}
                                </div>
                            )}

                            {designOption === 'upload' && (
                                <div className="file-upload-area animate-fade-in">
                                    <input type="file" id="file-input" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                                    <label htmlFor="file-input" className="file-input-label">
                                        <span>+ Add Files (PDF, AI, EPS, JPG, PNG)</span>
                                    </label>
                                    {files.map((f, i) => (
                                        <div key={i} className="file-tag">
                                            <span>{f.name}</span>
                                            <button onClick={() => removeFile(i)}>&times;</button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {(designOption === 'request' || designOption === 'upload') && (
                                <div className="instructions-area animate-fade-in">
                                    <textarea
                                        placeholder="Add any specific design instructions or requests..."
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: SUMMARY CARD */}
                    <div className="configurator-summary">
                        <div className="summary-card">
                            <div className="summary-header">
                                <h3>ORDER SUMMARY</h3>
                                <div className="live-price">${calculateTotal()}</div>
                            </div>

                            <div className="summary-details">
                                <div className="summary-item">
                                    <span>Product:</span>
                                    <strong>{selectedQty.qty.toLocaleString()}{(selectedQty as any).isPlus ? '+' : ''} Custom Paper Cups</strong>
                                </div>
                                <div className="summary-item">
                                    <span>Size:</span>
                                    <strong>{selectedSize}</strong>
                                </div>
                                <div className="summary-item">
                                    <span>Paper:</span>
                                    <strong>{selectedPaper}</strong>
                                </div>
                                <div className="summary-item">
                                    <span>Design Service:</span>
                                    <strong style={{ color: 'var(--color-red)' }}>INCLUDED (FREE)</strong>
                                </div>
                            </div>

                            <div className="proofing-options">
                                <label className="selection-label" style={{ fontSize: '0.8rem', padding: '0' }}>SELECT PROOFING METHOD</label>
                                <div className="proofing-grid">
                                    <label className={`proofing-item ${proofingOption === 'digital' ? 'active' : ''}`}>
                                        <input type="radio" checked={proofingOption === 'digital'} onChange={() => setProofingOption('digital')} />
                                        <div className="proofing-info">
                                            <strong>Digital Mockup</strong>
                                            <span>3D Render via Email (Free)</span>
                                        </div>
                                    </label>
                                    <label className={`proofing-item ${proofingOption === 'photo' ? 'active' : ''}`}>
                                        <input type="radio" checked={proofingOption === 'photo'} onChange={() => setProofingOption('photo')} />
                                        <div className="proofing-info">
                                            <strong>Production Photo Proof</strong>
                                            <span>Photo of first cup via email (+$9.99)</span>
                                        </div>
                                    </label>
                                    <label className={`proofing-item ${proofingOption === 'physical' ? 'active' : ''}`}>
                                        <input type="radio" checked={proofingOption === 'physical'} onChange={() => setProofingOption('physical')} />
                                        <div className="proofing-info">
                                            <strong>Mailed Physical Sample</strong>
                                            <span>Actual cup shipped to you (+$19.99)</span>
                                        </div>
                                    </label>
                                </div>
                            </div>



                            {/* Rush Order Alert */}
                            <div className="rush-alert">
                                <strong>Need a Rush Order?</strong>
                                <p>Call/Text: 714.594.9573 before ordering</p>
                            </div>

                            <button
                                onClick={handleOrder}
                                disabled={isLoading}
                                className="btn btn-primary order-btn"
                            >
                                {isLoading ? 'Processing...' : 'PROCEED TO CHECKOUT'}
                            </button>

                            <div className="policy-notice">
                                <p>First 1 free design & 1 revision included. Additional edits $19 ea.</p>
                            </div>

                            <div className="trust-footer">
                                <p>✓ Secure Stripe Checkout</p>
                                <p>✓ Made in California, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .configurator-section {
                    padding: 8rem 0;
                    background: var(--color-off-white);
                }
                .configurator-grid {
                    display: grid;
                    grid-template-columns: 1.25fr 0.75fr;
                    gap: 3rem;
                    align-items: start;
                }
                .selection-group {
                    margin-bottom: 3rem;
                    background: white;
                    padding: 2rem;
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-sm);
                }
                .selection-label {
                    display: block;
                    font-family: 'Oswald', sans-serif;
                    font-size: 0.9rem;
                    letter-spacing: 0.1em;
                    color: var(--color-navy);
                    margin-bottom: 1.5rem;
                }
                
                /* Size Buttons */
                .size-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1rem;
                }
                .size-btn {
                    padding: 1rem;
                    border: 1px solid #ddd;
                    background: white;
                    border-radius: var(--radius-sm);
                    font-weight: bold;
                    color: var(--color-navy);
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }
                .size-btn:hover:not(.disabled) {
                    border-color: var(--color-gold);
                    background: #fffcf8;
                }
                .size-btn.active {
                    background: var(--color-navy);
                    color: white;
                    border-color: var(--color-navy);
                }
                .size-btn.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    background: #f5f5f5;
                }
                .status-tag {
                    position: absolute;
                    top: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--color-gold);
                    color: var(--color-navy);
                    font-size: 0.6rem;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 900;
                    white-space: nowrap;
                    text-transform: uppercase;
                }

                /* Paper Buttons */
                .paper-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                .paper-btn {
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    border: 1px solid #ddd;
                    background: white;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }
                .paper-btn.active {
                    border-color: var(--color-navy);
                    background: #f0f4ff;
                    box-shadow: 0 4px 12px rgba(0,32,74,0.1);
                }
                .paper-btn.disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .paper-swatch {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 1px solid #ddd;
                }
                .paper-swatch.white { background: white; }
                .paper-swatch.craft { background: #d2b48c; }

                /* Qty Buttons */
                .qty-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                }
                .qty-btn {
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border: 1px solid #ddd;
                    background: white;
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .qty-btn:hover {
                    border-color: var(--color-red);
                }
                .qty-btn.active {
                    background: var(--color-red);
                    color: white;
                    border-color: var(--color-red);
                }
                .qty-val { font-weight: 800; font-size: 1.1rem; }
                .qty-per-cup { font-size: 0.7rem; opacity: 0.8; }

                /* Design Options */
                .design-options-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .design-opt-btn {
                    padding: 1.5rem 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 0.75rem;
                    border: 1px solid #ddd;
                    background: white;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .design-opt-btn.active {
                    border-color: var(--color-navy);
                    background: #f0f4ff;
                }
                .opt-icon { font-size: 1.5rem; }
                .opt-text strong { display: block; font-size: 0.85rem; margin-bottom: 2px; }
                .opt-text p { font-size: 0.7rem; color: #666; margin: 0; }

                .file-upload-area {
                    margin-top: 1.5rem;
                    border: 2px dashed #ddd;
                    padding: 1.5rem;
                    border-radius: var(--radius-sm);
                    text-align: center;
                    background: #fafafa;
                }
                .file-input-label {
                    cursor: pointer;
                    color: var(--color-red);
                    font-weight: bold;
                    display: block;
                }
                .file-tag {
                    display: flex;
                    justify-content: space-between;
                    background: white;
                    padding: 6px 12px;
                    border-radius: 4px;
                    border: 1px solid #eee;
                    margin-top: 8px;
                    font-size: 0.8rem;
                }
                .file-tag button { background: none; border: none; color: red; cursor: pointer; font-size: 1.1rem; }

                .instructions-area { margin-top: 1rem; }
                .instructions-area textarea {
                    width: 100%;
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: var(--radius-sm);
                    font-family: inherit;
                    resize: vertical;
                }

                /* Summary Card */
                .summary-card {
                    background: var(--color-navy);
                    color: white;
                    padding: 3rem;
                    border-radius: var(--radius-lg);
                    position: sticky;
                    top: 120px;
                    box-shadow: var(--shadow-lg);
                }
                .summary-header {
                    text-align: center;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 2rem;
                    margin-bottom: 2rem;
                }
                .summary-header h3 { color: white; margin-bottom: 1rem; font-size: 1rem; }
                .live-price { font-size: 3.5rem; font-family: 'Oswald', sans-serif; color: var(--color-gold); line-height: 1; }
                
                .summary-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.7);
                }
                .summary-item strong { color: white; }

                .proofing-options {
                    margin: 2.5rem 0;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .proofing-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-top: 1rem;
                }
                .proofing-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .proofing-item:hover { background: rgba(255,255,255,0.1); }
                .proofing-item.active { border-color: var(--color-gold); background: rgba(200, 173, 127, 0.1); }
                .proofing-info { display: flex; flex-direction: column; }
                .proofing-info strong { font-size: 0.85rem; }
                .proofing-info span { font-size: 0.75rem; opacity: 0.7; }

                .order-btn {
                    width: 100%;
                    padding: 1.5rem;
                    font-size: 1.25rem;
                    margin-top: 1rem;
                    background: var(--color-gold) !important;
                    color: var(--color-navy) !important;
                }
                .order-btn:hover { background: #e0c69d !important; }

                .rush-alert {
                    background: rgba(255, 77, 77, 0.1);
                    border-left: 3px solid #ff4d4d;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                    border-radius: 4px;
                }
                .rush-alert strong { display: block; font-size: 0.8rem; color: #ff8080; }
                .rush-alert p { font-size: 0.75rem; color: rgba(255,255,255,0.8); margin: 0; }

                .policy-notice {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.7rem;
                    opacity: 0.5;
                    font-style: italic;
                }

                .trust-footer {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2rem;
                    font-size: 0.75rem;
                    opacity: 0.6;
                }

                @media (max-width: 992px) {
                    .configurator-grid {
                        grid-template-columns: 1fr;
                    }
                    .summary-card {
                        position: static;
                    }
                    .qty-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                @media (max-width: 576px) {
                    .size-grid { grid-template-columns: repeat(3, 1fr); }
                    .qty-grid { grid-template-columns: repeat(2, 1fr); }
                    .design-options-grid { grid-template-columns: 1fr; }
                    .paper-grid { grid-template-columns: 1fr; }
                    .summary-card { padding: 2rem 1.5rem; }
                    .live-price { font-size: 2.5rem; }
                }

                .ref-code-area {
                    margin-top: 1rem;
                    background: #f9f9f9;
                    padding: 1.5rem;
                    border-radius: var(--radius-sm);
                    border: 1px solid #eee;
                }
                .ref-input-group {
                    display: flex;
                    gap: 10px;
                }
                .ref-input {
                    flex: 1;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 1rem;
                    font-family: monospace;
                    letter-spacing: 2px;
                }
                .btn-verify {
                    padding: 0 1.5rem;
                    background: var(--color-navy);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .ref-error { color: red; font-size: 0.8rem; margin-top: 0.5rem; }
                .ref-success { color: green; font-size: 0.8rem; margin-top: 0.5rem; font-weight: bold; }

                .reorder-area {
                    margin-top: 1rem;
                    max-height: 200px;
                    overflow-y: auto;
                }
                .past-order-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.75rem;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: background 0.2s;
                }
                .past-order-item:hover { background: #f0f4ff; }
                
                @media (min-width: 992px) {
                    .design-options-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
            `}</style>
        </section >
    );
}
