import Navbar from '@/components/Navbar';
import BuyButton from '@/components/BuyButton';
import { FacebookIcon, InstagramIcon, TikTokIconClean } from '@/components/SocialIcons';
// import Image from 'next/image'; // Assuming standard img tag for simplicity with user uploads, or Next Image if preferred

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section style={{
          height: '85vh', // High impact 'Splash' height
          width: '100%',
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 100%), url("/images/hero_backdrop.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Align content to the top
          alignItems: 'center',
          paddingTop: '8vh', // Position text in the sky area
          textAlign: 'center'
        }}>
          <div className="container">
            <h1 className="hero-title" style={{ color: 'var(--color-navy)', fontSize: '5rem', marginBottom: '1rem', lineHeight: 1, textShadow: '0 2px 20px rgba(255,255,255,0.6)' }}>
              CUSTOM DESIGNED, <br /> <span style={{ color: 'var(--color-red)' }}>FULL COLOR PAPER CUPS.</span>
            </h1>
            <p className="hero-p" style={{ fontSize: '1.5rem', fontWeight: 'bold', maxWidth: '700px', margin: '0 auto 2.5rem', color: 'var(--color-navy)', textShadow: '0 1px 15px rgba(255,255,255,0.6)' }}>
              MADE IN USA. Low MOQ, Free Design. The Best Value for Your Brand.
            </p>
            <div className="flex-col-mobile" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
              <a href="/dashboard" className="btn btn-primary btn-mobile-full" style={{ padding: '16px 40px', fontSize: '1.25rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>START YOUR PROJECT</a>
              <a href="/gallery" className="btn btn-mobile-full" style={{ background: 'white', border: '2px solid var(--color-navy)', color: 'var(--color-navy)', padding: '16px 40px', fontSize: '1.25rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>GET INSPIRED</a>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <a href="#" style={{ color: 'var(--color-navy)', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', display: 'flex', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <InstagramIcon size={28} />
              </a>
              <a href="#" style={{ color: 'var(--color-navy)', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', display: 'flex', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <FacebookIcon size={28} />
              </a>
              <a href="#" style={{ color: 'var(--color-navy)', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', display: 'flex', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <TikTokIconClean size={28} />
              </a>
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
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/25.png?v=3" alt="25 Cups" loading="lazy" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>25 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$50.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$2.00 / cup</p>
                <BuyButton productName="25 Cups" quantity={25} unitAmount={50.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
              {/* 50 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', border: '2px solid var(--color-gold)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-gold)', color: 'white', padding: '4px 12px', fontSize: '0.9rem', fontWeight: 'bold', borderRadius: '20px' }}>MOST POPULAR</div>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/50.png?v=3" alt="50 Cups" loading="lazy" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--color-navy)' }}>50 Cups</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-red)', marginBottom: '1rem' }}>$75.00</div>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>$1.50 / cup</p>
                <BuyButton productName="50 Cups" quantity={50} unitAmount={75.00} className="btn btn-primary" style={{ width: '100%' }}>Order Now</BuyButton>
              </div>
              {/* 100 Cups */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <div style={{ height: '250px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/100.png?v=3" alt="100 Cups" loading="lazy" style={{ maxHeight: '100%', maxWidth: '100%' }} />
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
                  <img src="/images/More-t.png" alt="Business Partnership" style={{ width: '100%', height: 'auto', display: 'block' }} />
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/big_ds.jpg"
                    alt="Cups for weddings and parties"
                    loading="lazy"
                    style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'bottom' }}
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
