
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | US Paper Cup Factory",
    description: "Learn about US Paper Cup Factory, your premier American manufacturer of high-quality, custom-printed paper cups in Huntington Beach, California.",
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://uspapercupfactory.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'About',
                item: 'https://uspapercupfactory.com/about',
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navbar />
            <main className="container" style={{ padding: '6rem 20px' }}>
                <div className="grid-responsive" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                    {/* Text Section */}
                    <div>
                        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>About Us — American Made Excellence</h1>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '2rem', color: '#444' }}>
                            US Paper Cup Factory is a premier American manufacturer dedicated to producing high-quality, custom-printed paper cups for businesses of all sizes. Founded on the principles of speed, quality, and domestic production, we leverage advanced manufacturing technology in our Huntington Beach, California facility to deliver superior products with turnaround times that importers simply cannot match.
                        </p>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#444' }}>
                            We believe that every cup is an opportunity for brand storytelling. That&apos;s why we&apos;ve integrated cutting-edge digital printing into our workflow, allowing us to offer complementary professional design services and 3D mockups. From local coffee shops to national corporate events, we ensure your brand stands out in every hand.
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

                {/* FAQ SECTION */}
                <div style={{ maxWidth: '1000px', margin: '6rem auto 0' }}>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Common Questions</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="grid-responsive">
                        {[
                            { q: "Why do you provide professional design services?", a: "We believe every cup is a brand ambassador. Whether you order 25 or 10,000, we want them to look spectacular. Keeping design in-house allows us to strictly control print quality and ensure the final product matches your vision perfectly." },
                            { q: "How can you offer professional design for free?", a: "Efficiency meets expertise. Our designers leverage advanced AI tools to accelerate the workflow, allowing one designer to output over 100 print-ready files a day. This tech-enabled efficiency drastically reduces costs, savings we pass directly to you." },
                            { q: "Why use real designers instead of an automated tool?", a: "Great design requires human nuance. While we use AI for speed, our expert designers understand the physical constraints of cup printing—curved surfaces and bleed lines. They don't just process files; they enhance your artwork to ensure it looks better in print than on screen." },
                            { q: "How do you maintain quality while keeping prices low?", a: "We built our entire order processing system in-house. By developing proprietary software instead of licensing expensive enterprise solutions from the start, we avoid massive overhead costs, allowing us to keep prices competitive without sacrificing quality." },
                            { q: "What is the absolute minimum order quantity?", a: "We specialize in small runs, starting at just 25 cups per design." },
                            { q: "What file formats do I need to provide?", a: "We prefer vector files (AI, EPS, or PDF). High-res PNG/TIFFs (300+ dpi) are also accepted." },
                            { q: "How fast is your turnaround?", a: "Standard production is 7–10 business days after approval. Rush options are available." },
                            { q: "Do you ship nationwide and offer white-labeling?", a: "Yes — we offer domestic shipping and white-label fulfillment for partners and agencies." }
                        ].map((item, i) => (
                            <div key={i} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>{item.q}</h3>
                                <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
