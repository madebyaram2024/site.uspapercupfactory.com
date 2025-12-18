import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';
import { FacebookIcon, InstagramIcon, TikTokIconClean } from '@/components/SocialIcons';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section style={{
          position: 'relative',
          height: 'min(90vh, 800px)',
          width: '100%',
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%), url("/images/Hero_bkg_image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', width: '100%' }}>
            <div className="flex-col-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '4rem' }}>

              {/* Left Content */}
              <div style={{ flex: 1, textAlign: 'left' }} className="animate-fade-in-up">
                <h1 className="hero-title" style={{
                  color: 'var(--color-navy)',
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.1,
                  textShadow: '0 2px 20px rgba(255,255,255,0.8)'
                }}>
                  CUSTOM DESIGNED,<br />
                  <span style={{ color: 'var(--color-red)' }}>FULL COLOR PAPER CUPS.</span>
                </h1>
                <p className="hero-p" style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  fontWeight: '500',
                  maxWidth: '600px',
                  marginBottom: '3rem',
                  color: 'var(--color-navy)',
                  opacity: 0.9
                }}>
                  MADE IN USA. Low MOQ, Free Design.<br />
                  The Premiere Branding Solution for Your Business.
                </p>
                <div className="flex-col-mobile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <a href="/dashboard" className="btn btn-primary btn-mobile-full" style={{ padding: '20px 48px', fontSize: '1.25rem', boxShadow: '0 8px 24px rgba(183, 28, 28, 0.3)' }}>START YOUR PROJECT</a>
                  <a href="/gallery" className="btn btn-mobile-full" style={{ background: 'white', border: '2px solid var(--color-navy)', color: 'var(--color-navy)', padding: '20px 48px', fontSize: '1.25rem' }}>GET INSPIRED</a>
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
                  <a href="#" style={{ color: 'var(--color-navy)', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', display: 'flex', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
                    <InstagramIcon size={24} />
                  </a>
                  <a href="#" style={{ color: 'var(--color-navy)', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', display: 'flex', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
                    <FacebookIcon size={24} />
                  </a>
                  <a href="#" style={{ color: 'var(--color-navy)', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', display: 'flex', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
                    <TikTokIconClean size={24} />
                  </a>
                </div>
              </div>

              {/* Right Focal Point - Floating Cup */}
              <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }} className="animate-fade-in-up delay-2">
                <div className="animate-float" style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: 'radial-gradient(circle, rgba(183,28,28,0.1) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: -1
                  }}></div>
                  <Image
                    src="/images/500.png"
                    width={600}
                    height={600}
                    alt="Custom Paper Cup Showcase"
                    priority
                    style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.15))', width: '100%', height: 'auto' }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Background Decorative Element */}
          <div style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-5%',
            width: '40%',
            height: '40%',
            background: 'var(--color-navy)',
            opacity: 0.03,
            borderRadius: '50%',
            filter: 'blur(100px)',
            zIndex: 1
          }}></div>
        </section>

        {/* TOP 3 PRODUCTS GRID */}
        <section style={{ padding: '6rem 0', background: '#f8f9fa' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="section-title">Our Best Sellers</h2>
              <p>Start small or go big. Same premium quality.</p>
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {/* 25 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src="/images/25.png" width={300} height={300} alt="25 Custom Paper Cups" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>25 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$50.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$2.00 / cup</p>
                <BuyButton productName="25 Cups" quantity={25} unitAmount={50.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
              {/* 50 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', border: '2px solid var(--color-gold)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-gold)', color: 'white', padding: '4px 12px', fontSize: '0.9rem', fontWeight: 'bold', borderRadius: '20px', zIndex: 1 }}>MOST POPULAR</div>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src="/images/50.png" width={300} height={300} alt="50 Custom Paper Cups" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>50 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$75.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$1.50 / cup</p>
                <BuyButton productName="50 Cups" quantity={50} unitAmount={75.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
              {/* 100 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src="/images/100.png" width={300} height={300} alt="100 Custom Paper Cups" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>100 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$100.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$1.00 / cup</p>
                <BuyButton productName="100 Cups" quantity={100} unitAmount={100.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <a href="/shop" className="btn btn-secondary" style={{ padding: '16px 40px' }}>View Full Catalog & Bulk Pricing</a>
            </div>
          </div>
        </section>


        {/* BUSINESS PARTNER SECTION */}
        <section style={{ padding: '6rem 0', background: 'white' }}>
          <div className="container">
            <div className="flex-col-mobile" style={{ display: 'flex', alignItems: 'center', gap: '5rem' }}>
              {/* Left Image - Using 500 cups image as placeholder for 'Business' context */}
              <div style={{ flex: 1 }}>
                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                  <Image src="/images/More-t.png" alt="Business Partnership" width={600} height={400} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
              {/* Right Text */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '3rem', color: 'var(--color-navy)', marginBottom: '2rem', lineHeight: 1.2 }}>
                  More Than A Vendor. <br /><span style={{ color: 'var(--color-red)' }}>A Business Partner.</span>
                </h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.8, color: '#444' }}>
                  We don&apos;t aim to just fulfill an order; our aim is to build a long and successful business relationship.
                  We see our clients as true partners.
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.8, color: '#444' }}>
                  Your paper cup is a <strong>walking billboard</strong>. It plays a huge role in your day-to-day advertising.
                  We ensure you are presented exactly as you want to be, maximizing the return on every penny you invest in our products.
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.8, color: '#444' }}>
                  Just as you invest in your showroom, signage, and digital advertising, your custom cups deserve the same level of care and quality.
                </p>
                <a href="/about" className="btn btn-primary">Learn About Our Process</a>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS SECTION - Refined */}
        <section style={{ padding: '6rem 0', background: 'var(--color-navy)', color: 'white' }}>
          <div className="container">
            <div className="flex-col-mobile" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'var(--color-gold)', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>NOT JUST FOR BUSINESS</p>
                <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '1.5rem' }}>For Every Occasion</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6, opacity: 0.9 }}>
                  Make your private events unforgettable with custom branded cups. From intimate gatherings to grand celebrations,
                  we add that personal touch that guests remember.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  {['Weddings', 'Baby Showers', 'Graduations', 'Birthdays', 'Anniversaries', 'Reunions'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--color-red)' }}>✓</span> {item}
                    </div>
                  ))}
                </div>
                <a href="/shop" className="btn btn-primary">Start Your Party Order</a>
              </div>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '4px solid white' }}>
                  <Image
                    src="/images/big_ds.jpg"
                    alt="Cups for weddings and parties"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main >
    </>
  );
}
