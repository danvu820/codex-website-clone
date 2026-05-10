const products = [
  {
    name: 'Waterproof & Stain-Resistant Hotel Pillow',
    description:
      'Cloud-soft comfort with built-in protection. 100% waterproof and resistant to makeup and yellowing.',
    price: '$29',
    compareAt: '$60',
    image: 'linear-gradient(180deg,#d9d6ea 0%,#bcb8d6 100%)',
  },
  {
    name: 'CloudAlign™ Pillow',
    description:
      'Our #1 best-selling ergonomic pillow, contoured for support and pressure-relieving comfort.',
    price: '$50',
    compareAt: '$100',
    image: 'linear-gradient(180deg,#d8d5ea 0%,#5d4f96 100%)',
  },
  {
    name: 'MarshMellow Comforter',
    description:
      'A white double-stuffed comforter made with soft, breathable materials and heat-adaptive comfort.',
    price: '$100',
    compareAt: '$200',
    image: 'linear-gradient(180deg,#d3d1e7 0%,#bcb6dd 100%)',
  },
];

export default function App() {
  return (
    <div className="page">
      <div className="top-marquee">Mother&apos;s Day Sale is Live! • Get an Extra 20% Off Sitewide • Plus Free Shipping on orders over $100</div>
      <header className="navbar">
        <nav>
          <a>Home</a><a>Shop</a><a>About</a><a>Features</a><a>Ambassadors</a>
        </nav>
        <div className="logo">mellow</div>
        <button className="cart">👜</button>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>20% OFF</h1>
          <h2>Better Sleep<br />This Mother&apos;s Day</h2>
          <p>Pain-free mornings. Cloud-soft nights. Dreamy essentials for the woman that deserves it most.</p>
          <button>Use Code: MOTHER</button>
        </div>
      </section>

      <section className="bestsellers">
        <h3>Shop by Bestsellers</h3>
        <a className="shop-all">Shop All</a>
        <div className="product-grid">
          {products.map((product) => (
            <article key={product.name}>
              <div className="product-image" style={{ background: product.image }} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p className="price">{product.price} <span>{product.compareAt}</span></p>
              <button>Shop Now</button>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-columns">
          <div><h5>Links</h5><p>Home</p><p>About Us</p><p>Features</p></div>
          <div><h5>Social</h5><p>Instagram</p><p>Facebook</p><p>TikTok</p></div>
          <div><h5>Support</h5><p>Contact Us</p><p>Privacy Policy</p><p>Shipping Policy</p></div>
        </div>
        <p className="copyright">Copyright 2026 MELLOW LLC</p>
      </footer>
    </div>
  );
}
