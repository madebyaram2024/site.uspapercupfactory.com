
import Navbar from '@/components/Navbar';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '6rem 20px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                    {/* Text Section */}
                    <div>
                        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>About Us</h1>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '2rem', color: '#444' }}>
                            US Paper Cup Factory is a premier American manufacturer dedicated to producing high-quality, custom-printed paper cups for businesses of all sizes. Founded on the principles of speed, quality, and domestic production, we leverage advanced manufacturing technology to deliver superior products with turnaround times that importers simply cannot match.
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444' }}>
                            We believe that every cup is an opportunity for brand storytelling. That&apos;s why we&apos;ve integrated cutting-edge AI design tools into our workflow, allowing us to offer complementary professional design services to all our clients. From local coffee shops to national corporate events, we ensure your brand stands out in every hand.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/abous_us.jpg" alt="US Paper Cup Factory Team/Facility" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>

                </div>
            </main>
        </>
    );
}
