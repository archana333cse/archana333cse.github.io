import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About MyRetail</h1>
        <p>India’s growing destination for shopping, innovation and trust.</p>
      </section>

      {/* COMPANY STORY */}
      <section className="about-section">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            MyRetail was founded with a simple mission — to make shopping easy,
            affordable and accessible for everyone. We connect millions of
            customers with thousands of sellers across India.
          </p>
          <p>
            From electronics to fashion, home essentials to groceries,
            we are building India’s most trusted e-commerce platform.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="Company"
          />
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-section">
        <div className="mission-card">
          <h3>Our Mission</h3>
          <p>
            To empower businesses and delight customers by providing
            seamless online shopping experiences.
          </p>
        </div>

        <div className="mission-card">
          <h3>Our Vision</h3>
          <p>
            To become India’s most customer-centric and technology-driven
            marketplace.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h4>Fast Delivery</h4>
            <p>Quick and reliable delivery across India.</p>
          </div>

          <div className="feature-card">
            <h4>Secure Payments</h4>
            <p>Multiple secure payment options.</p>
          </div>

          <div className="feature-card">
            <h4>Easy Returns</h4>
            <p>Hassle-free 7-day return policy.</p>
          </div>

          <div className="feature-card">
            <h4>24/7 Support</h4>
            <p>Customer support whenever you need us.</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="stat">
          <h2>10M+</h2>
          <p>Customers</p>
        </div>

        <div className="stat">
          <h2>50K+</h2>
          <p>Sellers</p>
        </div>

        <div className="stat">
          <h2>1L+</h2>
          <p>Products</p>
        </div>

        <div className="stat">
          <h2>100+</h2>
          <p>Cities</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Join the MyRetail Journey</h2>
        <button>Start Shopping</button>
      </section>

    </div>
  );
}
