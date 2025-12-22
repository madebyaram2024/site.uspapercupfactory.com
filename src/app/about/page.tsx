
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '6rem 20px' }}>
                <div className="grid-responsive" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                            <Image
                                src="/images/us-paper-cup-factory-exterior.png"
                                alt="US Paper Cup Factory - Exterior view of our American manufacturing facility in Huntington Beach, CA"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                            <Image
                                src="/images/us-paper-cup-factory-interior.png"
                                alt="Inside the US Paper Cup Factory - Advanced digital printing and manufacturing for custom paper cups"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
