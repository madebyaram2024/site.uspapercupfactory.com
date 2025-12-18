import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';
import { FacebookIcon, InstagramIcon, TikTokIconClean } from '@/components/SocialIcons';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import { getGalleryItems } from '@/actions/gallery';

export default async function Home() {
  // Prepare 15 specific hero images for rotation
  const images = Array.from({ length: 15 }, (_, i) => `/images/Hero_${i + 1}.png`);
  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION - REDESIGNED FULL-WIDTH */}
        <section style={{
          position: 'relative',
          padding: '0',
          background: 'white',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            minHeight: '700px',
            backgroundColor: 'white',
            flexDirection: 'row',
            width: '100%'
          }} className="flex-col-mobile">

            {/* Left Content Column */}
            <div style={{
              flex: 1,
              padding: 'clamp(2rem, 8vw, 6rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Background Decorative Grid */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `radial-gradient(var(--gray-200) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                opacity: 0.3,
                zIndex: 0,
                pointerEvents: 'none'
              }} />

              {/* Decorative "QUALITY" Faded Text */}
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '2rem',
                fontSize: '10rem',
                fontWeight: '900',
                color: 'var(--gray-200)',
                opacity: 0.1,
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                letterSpacing: '10px'
              }} className="hide-mobile">
                QUALITY
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(214,31,31,0.05)',
                    borderRadius: '50px',
                    color: 'var(--color-red)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    letterSpacing: '1px',
                    border: '1px solid rgba(214,31,31,0.1)'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>★</span>
                    ESTABLISHED IN LOS ANGELES
                  </div>
                </div>

                <h1 className="animate-fade-in-up" style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: '1.1',
                  color: 'var(--color-navy)',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  animationDelay: '0.2s'
                }}>
                  <span style={{ color: 'var(--color-red)' }}>CUSTOM DESIGNED,</span><br />
                  FULL COLOR PAPER<br />
                  CUPS.
                </h1>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '1.5rem 0 3rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--color-navy)',
                  lineHeight: '2.2'
                }}>
                  <li className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '12px', animationDelay: '0.3s' }}>
                    <span style={{ color: 'var(--color-red)', fontSize: '1.5rem' }}>✓</span> MADE IN USA
                  </li>
                  <li className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '12px', animationDelay: '0.4s' }}>
                    <span style={{ color: 'var(--color-red)', fontSize: '1.5rem' }}>✓</span> Low MOQ, Free Design
                  </li>
                  <li className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '12px', animationDelay: '0.5s' }}>
                    <span style={{ color: 'var(--color-red)', fontSize: '1.5rem' }}>✓</span> The Best Value for Your Brand
                  </li>
                </ul>

                <div className="flex-col-mobile animate-fade-in-up" style={{ display: 'flex', gap: '1.5rem', animationDelay: '0.6s' }}>
                  <a href="/dashboard" className="btn btn-primary" style={{
                    padding: '18px 40px',
                    fontSize: '1.1rem',
                    letterSpacing: '1px'
                  }}>START YOUR PROJECT</a>
                  <a href="/gallery" className="btn btn-secondary" style={{
                    padding: '18px 40px',
                    fontSize: '1.1rem',
                    letterSpacing: '1px',
                    border: '2px solid var(--color-navy)',
                    color: 'var(--color-navy)'
                  }}>GET INSPIRED</a>
                </div>
              </div>

              {/* MADE IN USA BADGE */}
              <div style={{
                position: 'absolute',
                bottom: '3rem',
                right: '3rem',
                width: '120px',
                height: '120px',
                zIndex: 2,
                opacity: 0.8
              }} className="animate-float hide-mobile">
                <div style={{
                  width: '100%',
                  height: '100%',
                  border: '2px dashed var(--color-red)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '10px',
                  color: 'var(--color-red)',
                  fontSize: '0.8rem',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  transform: 'rotate(-15deg)',
                  background: 'white'
                }}>
                  MADE WITH PRIDE <br /> IN USA
                </div>
              </div>
            </div>

            {/* Right Image/Carousel Column */}
            <div style={{
              flex: 1,
              position: 'relative',
              minHeight: '500px',
              background: '#f8f8f8'
            }}>
              <HeroCarousel images={images} interval={5000} />
            </div>

          </div>
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
