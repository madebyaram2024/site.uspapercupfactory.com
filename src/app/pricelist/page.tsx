
'use client';

export default function PricelistPage() {
    return (
        <div style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#0a192f' }}>US PAPER CUP FACTORY</h1>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'normal', color: '#666' }}>Official Price List</h2>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #ddd' }}>
                <thead>
                    <tr style={{ background: '#0a192f', color: 'white' }}>
                        <th style={{ padding: '15px', border: '1px solid #ddd' }}>Quantity</th>
                        <th style={{ padding: '15px', border: '1px solid #ddd' }}>Price Per Cup</th>
                        <th style={{ padding: '15px', border: '1px solid #ddd' }}>Total Price</th>
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
                            <td style={{ padding: '15px', border: '1px solid #ddd', fontWeight: 'bold' }}>{row.q}</td>
                            <td style={{ padding: '15px', border: '1px solid #ddd' }}>{row.ppc}</td>
                            <td style={{ padding: '15px', border: '1px solid #ddd', fontWeight: 'bold' }}>{row.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                <p>All prices include custom full-color printing. Shipping calculated at checkout.</p>
                <p><strong>Contact:</strong> sales@uspapercupfactory.com | +1 (555) 123-4567</p>
            </div>

            <div className="no-print" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button onClick={() => window.print()} style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '1rem' }}>Print This Page</button>
            </div>
        </div>
    );
}
