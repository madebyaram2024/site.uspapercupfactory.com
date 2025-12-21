import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';
import { FacebookIcon, InstagramIcon, TikTokIconClean } from '@/components/SocialIcons';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import IndustriesServed from '@/components/IndustriesServed';
import { getGalleryItems } from '@/actions/gallery';

export default async function Home() {
  // Prepare 15 specific hero images for rotation
  const images = Array.from({ length: 15 }, (_, i) => `/images/custom-printed-paper-cups-hero-${i + 1}.png`);
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
          }} className="flex-col-reverse-mobile">

            {/* Left Content Column */}
            <div style={{
              flex: 1,
              padding: 'clamp(1.5rem, 5vw, 4rem)',
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


              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="animate-fade-in-up hero-badges-wrapper" style={{ animationDelay: '0.1s', display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', position: 'relative' }}>
                  {/* MADE IN USA BADGE - TOP SECTON */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '0',
                    zIndex: 10,
                    opacity: 0.95
                  }} className="animate-float made-usa-badge">
                    <div style={{
                      width: '100%',
                      height: '100%',
                      border: '2px dashed var(--color-red)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '12px',
                      color: 'var(--color-red)',
                      fontSize: '0.8rem',
                      lineHeight: '1.2',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      transform: 'rotate(-10deg)',
                      background: 'white',
                      boxShadow: '0 8px 25px rgba(214,31,31,0.1)'
                    }} className="made-usa-badge-inner">
                      MADE WITH <br /> PRIDE <br /> IN USA
                    </div>
                  </div>

                  <div className="sqft-badge" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(214,31,31,0.05)',
                    borderRadius: '50px',
                    color: 'var(--color-red)',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    border: '1px solid rgba(214,31,31,0.1)',
                    position: 'relative',
                    zIndex: 5
                  }}>
                    <span className="star-icon">★</span>
                    8000 SQFT FACILITY IN HUNTINGTON BEACH, CA
                  </div>
                </div>

                <h1 className="animate-fade-in-up" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  lineHeight: '1.1',
                  color: 'var(--color-navy)',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  animationDelay: '0.2s'
                }}>
                  <span style={{ color: 'var(--color-red)' }} className="hero-custom-part">CUSTOM DESIGNED,</span><br />
                  FULL COLOR PAPER<br />
                  CUPS.
                </h1>

                <div className="animate-fade-in-up bullet-grid" style={{
                  display: 'grid',
                  gap: '1rem',
                  margin: '0 0 3rem',
                  animationDelay: '0.3s'
                }}>
                  {[
                    { title: "BUSINESS OR OCCASIONS", desc: "For events of any scale" },
                    { title: "ONLY 25 CUPS MINIMUM", desc: "Industry-leading low MOQ" },
                    { title: "8000 SQFT FACILITY", desc: "Huntington Beach, California" },
                    { title: "DEDICATED EQUIPMENT", desc: "Specific machines for every size" },
                    { title: "CANON DIGITAL TECH", desc: "High-def single pass printing" },
                    { title: "FLEXO & DIE-CUTTING", desc: "Scale production for long runs" },
                    { title: "FREE CUSTOM DESIGN", desc: "1st round of revisions on us" },
                    { title: "FREE 3D MOCKUP", desc: "Visualization before production" },
                    { title: "RUSH ORDERS", desc: "High-speed turnaround options" }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '800',
                        color: 'var(--color-navy)',
                        letterSpacing: '0.5px'
                      }} className="bullet-title">
                        <span style={{ color: 'var(--color-red)' }}>✦</span> {item.title}
                      </div>
                      <div className="bullet-desc-wrap">
                        <p className="bullet-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '28px' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-col-mobile animate-fade-in-up hero-btns" style={{ display: 'flex', gap: '1.5rem', animationDelay: '0.6s' }}>
                  <a href="/dashboard" className="btn btn-primary hero-btn" style={{
                    padding: '18px 40px',
                    fontSize: '1.1rem',
                    letterSpacing: '1px'
                  }}>START YOUR PROJECT</a>
                  <a href="/gallery" className="btn btn-secondary hero-btn" style={{
                    padding: '18px 40px',
                    fontSize: '1.1rem',
                    letterSpacing: '1px',
                    border: '2px solid var(--color-navy)',
                    color: 'var(--color-navy)'
                  }}>GET INSPIRED</a>
                </div>
              </div>

            </div>


            {/* Right Image/Carousel Column */}
            <div className="hero-carousel-wrapper" style={{
              flex: 1,
              position: 'relative',
              minHeight: '500px',
              background: '#f8f8f8'
            }}>
              <HeroCarousel images={images} interval={5000} />
            </div>

          </div>
        </section>

        {/* INDUSTRIES WE SERVE - NEW SECTION */}
        <IndustriesServed />

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
                  <Image src="/images/order-quantity-25-custom-cups.png" width={300} height={300} alt="25 Custom Printed Paper Cups - Minimum Order" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
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
                  <Image src="/images/order-quantity-50-custom-cups.png" width={300} height={300} alt="50 Custom Printed Paper Cups - Most Popular Tier" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>50 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$75.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$1.50 / cup</p>
                <BuyButton productName="50 Cups" quantity={50} unitAmount={75.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
              {/* 100 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src="/images/order-quantity-100-custom-cups.png" width={300} height={300} alt="100 Custom Printed Paper Cups - Small Business Tier" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
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
                  <Image src="/images/more-custom-cup-styles-options.png" alt="Diverse Custom Paper Cup Styles and Branding Options" width={600} height={400} style={{ width: '100%', height: 'auto', display: 'block' }} />
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
                    src="/images/large-cup-stack-display.jpg"
                    alt="Stack of custom printed paper cups for weddings and large events"
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
