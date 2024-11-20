import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Eco-Friendly Packaging Solutions</h1>
          <p>
            Choose sustainable packaging for a greener future with Earthwise
            Packaging.
          </p>
          <a href="#contact" className="cta-button">
            Get Started
          </a>
        </div>
      </header>

      {/* About Us Section */}
      <section className="about" id="about">
        <h2>About Earthwise Packaging</h2>
        <p>
          We provide environmentally friendly packaging solutions that help
          businesses reduce their carbon footprint while maintaining product
          integrity and safety. Our products are designed to be sustainable,
          recyclable, and biodegradable.
        </p>
      </section>

      {/* Our Services Section */}
      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="service-card">
          <h3>Sustainable Packaging</h3>
          <p>
            We offer a wide range of eco-friendly packaging materials to suit
            all industries.
          </p>
        </div>
        <div className="service-card">
          <h3>Custom Packaging Design</h3>
          <p>
            Our design team can create bespoke packaging solutions tailored to
            your needs.
          </p>
        </div>
        <div className="service-card">
          <h3>Consultation & Strategy</h3>
          <p>
            We work with you to optimize your packaging strategy for maximum
            sustainability.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial">
          <p>
            "Earthwise Packaging transformed our packaging strategy, making it
            both eco-friendly and cost-effective. Highly recommend!"
          </p>
          <h4>- John Doe, CEO of GreenTech</h4>
        </div>
        <div className="testimonial">
          <p>
            "We’ve been working with Earthwise for years, and their sustainable
            packaging has helped us reduce our environmental impact while
            delivering quality products."
          </p>
          <h4>- Jane Smith, Operations Manager at EcoPack</h4>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="cta" id="contact">
        <h2>Ready to Make the Switch?</h2>
        <p>
          Contact us today to start your journey towards sustainable packaging!
        </p>
        <a href="mailto:contact@earthwisepackaging.com" className="cta-button">
          Contact Us
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="trade-mark">
            &copy; 2024 Earthwise Packaging. <br /> All rights reserved.
          </p>
          <ul className="social-links">
            <li>
              <a href="https://twitter.com/EarthwisePackaging">Twitter</a>
            </li>
            <li>
              <a href="https://facebook.com/EarthwisePackaging">Facebook</a>
            </li>
            <li>
              <a href="https://linkedin.com/company/earthwise-packaging">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
