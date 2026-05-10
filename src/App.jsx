import { useEffect, useState } from 'react';

const bestSellers = [
  {
    title: 'Neruva Restore Pillow',
    reviews: '(6,416)',
    description:
      'Balanced support for light sleepers and high-stress routines, designed for calmer nights and better mornings.',
    price: '$89',
    compareAt: '$140',
    image:
      'https://images.unsplash.com/photo-1585559605151-3e9978e1f38b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Neruva Contour Cloud',
    reviews: '(32,246)',
    description:
      'Ergonomic contouring that aligns with your neck and shoulders to ease tension from busy urban workdays.',
    price: '$109',
    compareAt: '$170',
    image:
      'https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Neruva Deep Calm Comforter',
    reviews: '(8,843)',
    description:
      'A breathable, plush comforter that completes your organic-modern bedroom and supports low-stimulation evenings.',
    price: '$169',
    compareAt: '$240',
    image:
      'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=900&q=80',
  },
];

export default function App() {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCta(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page">
      {showCta && (
        <div className="popup-backdrop" onClick={() => setShowCta(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowCta(false)}>×</button>
            <p className="popup-kicker">Your Better Morning Starts Tonight</p>
            <h3>Find Your Neruva Sleep Match</h3>
            <p>Take our 45-second sleep profile and get a personalized recommendation built around your routines, stress level, and comfort style.</p>
            <button>Take the Sleep Quiz</button>
          </div>
        </div>
      )}

      <div className="top-marquee">Neruva Calm Sleep Event • Complimentary Shipping Over $100 • Premium Comfort for Better Mornings</div>
      <header className="nav-wrap">
        <nav className="nav-left">{['Home', 'Shop', 'Why Neruva', 'Journal', 'Ambassadors'].map((item) => <a key={item} href="#">{item}</a>)}</nav>
        <div className="logo">neruva</div>
        <div className="cart">◡</div>
      </header>

      <section className="hero">
        <div className="hero-bar">🌿 BUILD YOUR CALM NIGHT ROUTINE • TAKE THE NERUVA SLEEP QUIZ</div>
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Sleep Better</h1>
            <h2>Wake Clearer<br />With Neruva</h2>
            <p>Premium sleep essentials for modern professionals who want softer nights, calmer routines, and more energized mornings.</p>
            <button>Find My Perfect Match</button>
          </div>
        </div>
      </section>

      <section className="logos">As seen in wellness routines: Pinterest • Instagram • Apartment Therapy • Mindbodygreen • Well+Good</section>

      <section className="bestsellers section">
        <h3>Shop the Neruva Collection</h3>
        <a href="#">Shop All</a>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <article key={product.title}>
              <img src={product.image} alt={product.title} />
              <div className="stars">★★★★★ <span>{product.reviews}</span></div>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <div className="price">{product.price} <span>{product.compareAt}</span></div>
              <button>Shop Now</button>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div><h5>Links</h5><p>Home</p><p>Why Neruva</p><p>Journal</p><p>Shop</p></div>
          <div><h5>Social</h5><p>Instagram</p><p>Pinterest</p><p>TikTok</p></div>
          <div><h5>Support</h5><p>Contact Us</p><p>Shipping Policy</p><p>Returns</p><p>Privacy</p></div>
        </div>
        <p>Copyright 2026 NERUVA</p>
      </footer>
    </div>
  );
}
