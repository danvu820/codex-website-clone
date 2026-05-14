import { useEffect, useMemo, useState } from 'react';

const bestSellers = [
  { title: 'Neruva Restore Pillow', reviews: '(6,416)', description: 'Balanced support for light sleepers and high-stress routines, designed for calmer nights and better mornings.', price: '$89', compareAt: '$140', image: 'https://images.unsplash.com/photo-1585559605151-3e9978e1f38b?auto=format&fit=crop&w=900&q=80' },
  { title: 'Neruva Contour Cloud', reviews: '(32,246)', description: 'Ergonomic contouring that aligns with your neck and shoulders to ease tension from busy urban workdays.', price: '$109', compareAt: '$170', image: 'https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=900&q=80' },
  { title: 'Neruva Deep Calm Comforter', reviews: '(8,843)', description: 'A breathable, plush comforter that completes your organic-modern bedroom and supports low-stimulation evenings.', price: '$169', compareAt: '$240', image: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=900&q=80' },
];

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Shop All', path: '/shop' },
  { label: 'Help', path: '/help' },
];

function Header({ currentPath, onNavigate }) {
  return (
    <header className="nav-wrap">
      <a href="/" className="brand" onClick={(e) => onNavigate(e, '/')}>
        <img src="/neruva-logo.svg" alt="Neruva" className="brand-image" />
      </a>
      <nav className="nav-left">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onClick={(e) => onNavigate(e, item.path)}
            className={currentPath === item.path ? 'active' : ''}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function HomePage({ showCta, setShowCta }) {
  return (
    <>
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
      <section className="hero">
        <div className="hero-bar">🌿 BUILD YOUR CALM NIGHT ROUTINE • TAKE THE NERUVA SLEEP QUIZ</div>
        <div className="hero-inner"><div className="hero-copy"><h1>Sleep Better</h1><h2>Wake Clearer<br />With Neruva</h2><p>Premium sleep essentials for modern professionals who want softer nights, calmer routines, and more energized mornings.</p><button>Find My Perfect Match</button></div></div>
      </section>
      <section className="logos">As seen in wellness routines: Pinterest • Instagram • Apartment Therapy • Mindbodygreen • Well+Good</section>
      <section className="bestsellers section"><h3>Shop the Neruva Collection</h3><a href="/shop">Shop All</a><div className="product-grid">{bestSellers.map((product) => (<article key={product.title}><img src={product.image} alt={product.title} /><div className="stars">★★★★★ <span>{product.reviews}</span></div><h4>{product.title}</h4><p>{product.description}</p><div className="price">{product.price} <span>{product.compareAt}</span></div><button>Shop Now</button></article>))}</div></section>
    </>
  );
}

const ShopPage = () => <section className="section subpage"><h2>Shop All</h2><p>Browse Neruva&apos;s curated collection for better sleep and better mornings.</p></section>;
const HelpPage = () => <section className="section subpage"><h2>Help</h2><p>Need support with orders, recommendations, or product fit? Our Neruva care team is here to help.</p></section>;

export default function App() {
  const [showCta, setShowCta] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => setShowCta(true), 3500);
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const handleNavigate = (event, path) => {
    event.preventDefault();
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const page = useMemo(() => {
    if (currentPath === '/shop') return <ShopPage />;
    if (currentPath === '/help') return <HelpPage />;
    return <HomePage showCta={showCta} setShowCta={setShowCta} />;
  }, [currentPath, showCta]);

  return (
    <div className="page">
      <div className="top-marquee">Neruva Calm Sleep Event • Complimentary Shipping Over $100 • Premium Comfort for Better Mornings</div>
      <Header currentPath={currentPath} onNavigate={handleNavigate} />
      {page}
      <footer><div className="footer-grid"><div><h5>Links</h5><p>Home</p><p>Why Neruva</p><p>Journal</p><p>Shop</p></div><div><h5>Social</h5><p>Instagram</p><p>Pinterest</p><p>TikTok</p></div><div><h5>Support</h5><p>Contact Us</p><p>Shipping Policy</p><p>Returns</p><p>Privacy</p></div></div><p>Copyright 2026 NERUVA</p></footer>
    </div>
  );
}
