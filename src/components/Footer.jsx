import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="fashion-footer">
      {/* Top Section */}
      <div className="footer-top">
        <div className="brand-section">
          <h2 className="logo">FASHION FÚMING</h2>
          <p className="tagline">Celebrating Global Fashion Diversity</p>
          
          <div className="social-links">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="https://instagram.com/fashionfuming" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/fashionfuming" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/fashionfuming" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://pinterest.com/fashionfuming" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-columns">
          {/* Gallery Column */}
          <div className="footer-col">
            <Link to="/gallery" className="footer-heading-link">
              <h3>Gallery</h3>
            </Link>
            <ul>
              <li><Link to="/gallery#category-fashion">Fashion</Link></li>
              <li><Link to="/gallery#category-streetwear">Streetwear</Link></li>
              <li><Link to="/gallery#category-runway">Runway</Link></li>
              <li><Link to="/gallery#category-vintage">Vintage</Link></li>
              <li><Link to="/gallery#category-style">Style</Link></li>
            </ul>
          </div>
          
          {/* About Column */}
          <div className="footer-col">
            <Link to="/about" className="footer-heading-link">
              <h3>About</h3>
            </Link>
            <ul>
              <li><Link to="/about#global-gallery">Global Gallery</Link></li>
              <li><Link to="/about#fashion-events">Fashion Events</Link></li>
              <li><Link to="/about#secure-access">Secure Access</Link></li>
              <li><Link to="/about#easy-navigation">Easy Navigation</Link></li>
              <li><Link to="/about#meet-our-team">Meet Our Team</Link></li>
            </ul>
          </div>
          
          {/* Events Column */}
          <div className="footer-col">
            <Link to="/events" className="footer-heading-link">
              <h3>Events</h3>
            </Link>
            <ul>
              <li><Link to="/events#popular">Popular Events</Link></li>
              <li><Link to="/events#upcoming-models">Upcoming Models</Link></li>
              <li><Link to="/events#cultural-festivals">Cultural Festivals</Link></li>
              <li><Link to="/events#fashion">Fashion Events</Link></li>
            </ul>
          </div>
        
          <div className="footer-col">
            <h3>Stay Updated</h3>
            <p>Subscribe to our cultural fashion newsletter</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" aria-label="Subscribe">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-legal">
          <p>© 2025 Fashion Fuming. Celebrating cultural fashion worldwide.</p>
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;