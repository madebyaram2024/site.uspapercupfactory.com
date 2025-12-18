
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function InnovationPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* HERO */}
                <section style={{
                    height: '600px',
                    backgroundImage: 'url("/images/how_we_use_ai.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        padding: '3rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        maxWidth: '800px',
                        color: 'var(--color-navy)',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Innovation at Core</h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, margin: '0 auto', lineHeight: 1.6, color: '#4a5568' }}>
                            How We Use AI to Deliver Perfection, Every Time.
                        </p>
                    </div>
                </section>

                {/* CONTENT BLOCKS */}
                <section style={{ padding: '6rem 0' }}>
                    <div className="container">

                        {/* 1. Custom App */}
                        <div className="flex-col-mobile" style={{ display: 'flex', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-navy)', marginBottom: '1.5rem' }}>Custom AI Organization</h2>
                                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    We know our shortcomings better than anyone else. That&apos;s why we used AI to build a
                                    <strong style={{ color: 'var(--color-red)' }}> custom internal order processing application </strong>
                                    tailored specifically to our workflow.
                                </p>
                                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    This allows us to consistantly push out high-quality work on time, every time.
                                    Instead of spending $100,000 on software, we accomplished this with a few subscriptions
                                    and dedicated team members who trained the models while handling their daily responsibilities.
                                </p>
                            </div>

                            {/* AI App Image */}
                            <div style={{ flex: 1, height: '350px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/internal_app.jpg" alt="Custom AI Application Interface" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>

                        {/* 2. Quality Control */}
                        <div className="flex-col-mobile" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexDirection: 'row-reverse', marginBottom: '6rem' }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-navy)', marginBottom: '1.5rem' }}>Zero Imperfections</h2>
                                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    We have installed <strong>AI-powered cameras</strong> at strategic locations on our production line.
                                    These systems examine every single storage printout in real-time.
                                </p>
                                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    If an imperfection is detected, the job stops immediately. This technology pushes us to a new dimension
                                    of quality assurance, meaning we never have to reprint orders and our clients are never dissatisfied.
                                </p>
                            </div>

                            {/* QC Camera Image */}
                            <div style={{ flex: 1, height: '350px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/internal_ai_check.jpg" alt="AI Quality Control Cameras" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>

                        {/* 3. Design Synergy */}
                        <div className="flex-col-mobile" style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-navy)', marginBottom: '1.5rem' }}>AI + Human Design</h2>
                                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    We don&apos;t just use AI for logistics. Our design process leverages generative AI to spark unique ideas,
                                    which our professional human designers then refine into print-perfect artwork.
                                    This gives you the speed of technology with the soul of an artist.
                                </p>
                                <Link href="/services" className="btn btn-primary">Start Your Design</Link>
                            </div>

                            {/* Design Synergy Image */}
                            <div style={{ flex: 1, height: '350px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/magic_ai.jpg" alt="Generative AI Design Process" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>

                    </div>
                </section>
            </main >
        </>
    );
}
