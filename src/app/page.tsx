import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';
import { FacebookIcon, InstagramIcon, TikTokIconClean } from '@/components/SocialIcons';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import IndustriesServed from '@/components/IndustriesServed';
import ScrollVideo from '@/components/ScrollVideo';
import { getGalleryItems } from '@/actions/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

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
            minHeight: '750px', /* Increased to reveal bottom logo */
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
                <div className="animate-fade-in-up hero-badges-wrapper" style={{ animationDelay: '0.1s', display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                  {/* MADE IN USA BADGE - TOP SECTON */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
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
                  <span style={{ color: 'var(--color-red)' }} className="hero-custom-part">CUSTOM FULL‑COLOR</span><br />
                  PAPER CUPS.<br />
                  MADE IN THE USA.
                </h1>
                <p className="animate-fade-in-up" style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '2rem',
                  maxWidth: '600px',
                  animationDelay: '0.25s',
                  lineHeight: '1.6'
                }}>
                  Elevate your brand with premium, American-made cups from our Huntington Beach facility. High-def printing, low minimums, and fast turnarounds to keep your business or event moving.
                </p>

                <div className="animate-fade-in-up bullet-grid" style={{
                  display: 'grid',
                  gap: '1rem',
                  margin: '0 0 3rem',
                  animationDelay: '0.3s'
                }}>
                  {[
                    { title: "START AT JUST 25 CUPS", desc: "Perfect for small shops, pop-ups, and private events" },
                    { title: "FREE DESIGN & 3D MOCKUP", desc: "See your brand in 3D before production starts" },
                    { title: "DOMESTIC RELIABILITY", desc: "Fast fulfillment from our Huntington Beach, CA facility" }
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
                  }}>GET A FREE MOCKUP</a>
                  <a href="/shop" className="btn btn-secondary hero-btn" style={{
                    padding: '18px 40px',
                    fontSize: '1.1rem',
                    letterSpacing: '1px',
                    border: '2px solid var(--color-navy)',
                    color: 'var(--color-navy)'
                  }}>VIEW FULL CATALOG</a>
                </div>
              </div>

            </div>


            {/* Right Image/Carousel Column */}
            <div className="hero-carousel-wrapper" style={{
              flex: 1,
              position: 'relative',
              minHeight: '750px',
              background: '#f8f8f8'
            }}>
              <HeroCarousel images={images} interval={5000} />
            </div>

          </div>
        </section>

        {/* INDUSTRIES WE SERVE - NEW SECTION */}
        <IndustriesServed />

        {/* BRAND VIDEO SPLIT SECTION */}
        <section className="split-section">
          <div className="container">
            <div className="split-grid">

              {/* Left Column: Text Content */}
              <div className="split-content">
                <h2 className="split-headline">YOUR CUP IS <br /><span style={{ color: 'var(--color-red)' }}>GOING PLACES.</span></h2>
                <h3 className="split-subheadline">Make sure it represents your brand.</h3>
                <p className="split-body">
                  Your logo doesn&apos;t stay on a shelf. It walks into meetings, sits on conference tables, and travels through the city.
                  Don&apos;t trust your reputation to a cheap, flimsy cup. Make sure the quality of the cup matches the quality of your business.
                </p>
                <div>
                  <a href="/shop" className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '1.1rem' }}>START YOUR ORDER</a>
                </div>
              </div>

              {/* Right Column: Video Container */}
              <div className="split-video-container">
                <ScrollVideo
                  src="/images/Edited Bilboard.mp4"
                  className="split-video"
                  style={{ borderRadius: '8px' }}
                />
              </div>

            </div>
          </div>
        </section>

        {/* TOP 3 PRODUCTS GRID */}
        <section style={{ padding: '6rem 0', background: '#f8f9fa' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="section-title">Our Best Sellers</h2>
              <p>Simple pricing, premium quality. All tiers include free custom design and a 3D mockup.</p>
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {/* 25 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src="/images/order-quantity-25-custom-cups.png" width={300} height={300} alt="25 Custom Printed Paper Cups - Minimum Order" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>Starter: 25 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$50.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$2.00 / cup</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                  <li>✓ Free 3D Mockup</li>
                  <li>✓ Full Color Print</li>
                  <li>✓ Best for Small Events</li>
                </ul>
                <BuyButton productName="25 Cups" quantity={25} unitAmount={50.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
              {/* 50 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', border: '2px solid var(--color-gold)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-gold)', color: 'white', padding: '4px 12px', fontSize: '0.9rem', fontWeight: 'bold', borderRadius: '20px', zIndex: 1 }}>MOST POPULAR</div>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src="/images/order-quantity-50-custom-cups.png" width={300} height={300} alt="50 Custom Printed Paper Cups - Most Popular Tier" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>Popular: 50 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$75.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$1.50 / cup</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                  <li>✓ Free 3D Mockup</li>
                  <li>✓ Full Color Print</li>
                  <li>✓ Most Requested Tier</li>
                </ul>
                <BuyButton productName="50 Cups" quantity={50} unitAmount={75.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
              {/* 100 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src="/images/order-quantity-100-custom-cups.png" width={300} height={300} alt="100 Custom Printed Paper Cups - Small Business Tier" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>Value: 100 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$100.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$1.00 / cup</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                  <li>✓ Free 3D Mockup</li>
                  <li>✓ Full Color Print</li>
                  <li>✓ Best ROI for Business</li>
                </ul>
                <BuyButton productName="100 Cups" quantity={100} unitAmount={100.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <a href="/shop" className="btn btn-secondary" style={{ padding: '16px 40px' }}>VIEW FULL CATALOG & BULK PRICING</a>
            </div>
          </div>
        </section>

        {/* NEW CONCIERGE DESIGN SECTION */}
        <section className="design-section">
          <div className="container">
            <div className="design-grid">

              {/* Left Content */}
              <div>
                <span className="design-tag">CONCIERGE DESIGN SERVICE</span>
                <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                  Why We Don&apos;t Use <br /> <span style={{ color: 'var(--color-red)' }}>&quot;Drag-and-Drop&quot;</span>
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  You aren&apos;t a graphic designer, and you shouldn&apos;t have to be. Instead of giving you a clumsy generic builder tool, we offer a <strong>Concierge Design Team</strong> to ensure your cups look professional and function perfectly.
                </p>

                <div className="feature-box">
                  <h3>
                    <span className="star-icon" style={{ color: 'var(--color-red)' }}>★</span>
                    Optimize Your Logo for Real-World Use
                    <span className="ink-badge">PIGMENT INKS</span>
                  </h3>
                  <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }}>
                    Printing on a curved paper cup is different than printing on a flat sheet of paper. We use Pigment-Based Inks—the industry gold standard for safety and durability.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--color-red)', fontWeight: 'bold' }}>✓</span>
                      <div>
                        <strong>The Science of Safety:</strong> Unlike cheap dye inks, our pigment ink is 100% waterproof and dried in 2 seconds. Hot coffee or ice-cold cocktail—it stays on the cup.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--color-red)', fontWeight: 'bold' }}>✓</span>
                      <div>
                        <strong>Color Correction:</strong> Our designers manually adjust saturation and brightness to compensate for the safe pigment ink, ensuring vibrant, color-accurate results.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Vision Examples */}
              <div style={{ background: '#fcfcfc', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--color-navy)', marginBottom: '1rem' }}>No Logo? No Problem.</h3>
                <p style={{ marginBottom: '2rem', color: '#666' }}>Just tell us your vision in plain English, and our team (assisted by advanced Generative Design tech) will build it for you.</p>

                <div className="example-grid">
                  {/* BBQ Example */}
                  <div className="example-card">
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                      <Image
                        src="/images/bbq-burger-custom-cup-design.jpg"
                        alt="Char Broiled Burger BBQ Custom Cup Design"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="example-content">
                      <h4>VISION A: BBQ THEME</h4>
                      <p>&quot;Rugged, western-style branding for a new Texas burger joint.&quot;</p>
                    </div>
                  </div>

                  {/* Lego Example */}
                  <div className="example-card">
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                      <Image
                        src="/images/lego-birthday-custom-cup-design.jpg"
                        alt="Timmy's 5th Birthday Lego Custom Cup Design"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="example-content">
                      <h4>VISION B: BIRTHDAYS</h4>
                      <p>&quot;Vibrant Lego block theme for Timmy&apos;s 5th birthday party.&quot;</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                  <p style={{ fontWeight: 'bold', color: 'var(--color-navy)', fontSize: '1.1rem' }}>
                    We go the extra mile, even for 25 cups.
                  </p>
                </div>
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
                <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '1.5rem' }}>Make Every Event Memorable</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6, opacity: 0.9 }}>
                  Make your private events unforgettable with custom branded cups. From intimate gatherings to grand celebrations, our low MOQ and quick turnarounds fit any event timeline.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  {['Weddings', 'Baby Showers', 'Graduations', 'Birthdays', 'Anniversaries', 'Reunions'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--color-red)' }}>✓</span> {item}
                    </div>
                  ))}
                </div>
                <a href="/shop" className="btn btn-primary">START YOUR PARTY ORDER</a>
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
