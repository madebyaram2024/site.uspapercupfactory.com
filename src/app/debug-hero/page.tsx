export default function DebugHero() {
    return (
        <div style={{ padding: '50px', background: '#333', color: 'white' }}>
            <h1>Debug Hero Images</h1>
            <p>If these images are different aka one is the new one and one is the old one, then the file name is wrong.</p>

            <h2>/images/contact_hero.jpg</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/contact_hero.jpg?v=debug" alt="contact_hero" style={{ maxWidth: '500px', border: '5px solid red' }} />

            <h2>/images/hero_backdrop.jpg</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero_backdrop.jpg" alt="hero_backdrop" style={{ maxWidth: '500px', border: '5px solid blue' }} />
        </div>
    )
}
