import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0b0c10', color: '#c5c6c7' }} className="pt-5 border-top border-secondary">
      <div className="container">
        <div className="row g-4">
          
          {/* Column 1: Brand & About */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white fw-bold mb-3">📚 LibraryPro</h5>
            <p className="small opacity-75" style={{ lineHeight: '1.8' }}>
              Empowering global learning through modern digital management. 
              Our system streamlines administration so you can focus on what matters: 
              the readers.
            </p>
            <div className="d-flex gap-3 mt-4">
              {/* Social Icons using Emoji/Simple Text since we aren't using FontAwesome */}
              <span style={{ cursor: 'pointer' }} title="Facebook">📘</span>
              <span style={{ cursor: 'pointer' }} title="Twitter">🐦</span>
              <span style={{ cursor: 'pointer' }} title="LinkedIn">💼</span>
              <span style={{ cursor: 'pointer' }} title="Instagram">📸</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white fw-bold mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/home" className="text-decoration-none text-info small">Browse Books</Link></li>
              <li className="mb-2"><Link to="/register" className="text-decoration-none text-info small">Membership</Link></li>
              <li className="mb-2"><Link to="/" className="text-decoration-none text-info small">Admin Portal</Link></li>
              <li className="mb-2"><a href="#features" className="text-decoration-none text-info small">API Docs</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white fw-bold mb-3">Support</h5>
            <ul className="list-unstyled small opacity-75">
              <li className="mb-2">📍 123 Library Way, NY</li>
              <li className="mb-2">📞 +1 (555) 000-1111</li>
              <li className="mb-2">✉️ support@libpro.com</li>
              <li className="mb-2">🕒 Mon-Fri: 9am - 5pm</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white fw-bold mb-3">Stay Updated</h5>
            <p className="small opacity-75">Get the latest updates on new arrivals and events.</p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control bg-dark border-secondary text-white small" 
                placeholder="Enter email"
                style={{ borderRadius: '20px 0 0 20px' }}
              />
              <button 
                className="btn btn-info px-4" 
                type="button"
                style={{ borderRadius: '0 20px 20px 0', fontWeight: 'bold' }}
              >
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="row mt-5 pt-3 border-top border-secondary opacity-50 text-center">
          <div className="col-12 pb-4">
            <p className="x-small mb-0">
              © 2026 Library Management Pro. All rights reserved. 
              <span className="mx-2">|</span> 
              <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
              <span className="mx-2">|</span> 
              <a href="#" className="text-white text-decoration-none">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}