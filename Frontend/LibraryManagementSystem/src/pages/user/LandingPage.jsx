import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#c5c6c7' }}>
      
      {/* 1. HERO SECTION (Parallax) */}
      <header 
        style={{ 
          height: '100vh', 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80")',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        className="d-flex align-items-center justify-content-center text-center px-3"
      >
        <div className="container">
          <h1 className="display-2 fw-bold text-white mb-3">
            The Future of <span style={{ color: '#66fcf1' }}>Library Management</span>
          </h1>
          <p className="lead fs-4 mb-5 text-light opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
            Empowering librarians and readers with a seamless, cloud-based digital ecosystem.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/register" className="btn btn-info btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg">Start Free Trial</Link>
            <a href="#about" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">Learn More</a>
          </div>
        </div>
      </header>

      {/* 2. STATS SECTION (Floating Bar) */}
      <div className="container" style={{ marginTop: '-50px' }}>
        <div className="row bg-dark border border-secondary shadow-lg rounded-4 p-4 text-center g-4">
          <div className="col-6 col-md-3 border-end border-secondary">
            <h2 className="fw-bold text-white mb-0">45k+</h2>
            <small className="text-info text-uppercase">Books</small>
          </div>
          <div className="col-6 col-md-3 border-end border-secondary">
            <h2 className="fw-bold text-white mb-0">12k+</h2>
            <small className="text-info text-uppercase">Users</small>
          </div>
          <div className="col-6 col-md-3 border-end border-secondary">
            <h2 className="fw-bold text-white mb-0">850+</h2>
            <small className="text-info text-uppercase">Schools</small>
          </div>
          <div className="col-6 col-md-3">
            <h2 className="fw-bold text-white mb-0">1.2M</h2>
            <small className="text-info text-uppercase">Checkouts</small>
          </div>
        </div>
      </div>

      {/* 3. FEATURES GRID (Scrollable content) */}
      <section id="about" className="py-5 mt-5">
        <div className="container py-5 text-center">
          <h2 className="display-5 fw-bold text-white mb-2">Powerhouse Features</h2>
          <div className="mx-auto bg-info mb-5" style={{ height: '4px', width: '80px' }}></div>
          
          <div className="row g-4 text-start">
            {[
              { title: "Smart Cataloging", text: "One-click ISBN lookup and automated metadata generation.", icon: "💎" },
              { title: "Automated Fines", text: "Integrated gateway to handle overdue fees via digital payments.", icon: "💳" },
              { title: "Inventory Audit", text: "Real-time shelf tracking and missing book alerts.", icon: "🔍" },
              { title: "Role Management", text: "Granular controls for Admins, Librarians, and Students.", icon: "🛡️" },
              { title: "Cloud Reports", text: "Generate PDF analytics on borrowing trends instantly.", icon: "📈" },
              { title: "Member Mobile App", text: "Allow students to reserve books directly from their phones.", icon: "📱" }
            ].map((feature, i) => (
              <div key={i} className="col-md-4">
                <div 
                  className="p-4 h-100 rounded-4 border border-secondary" 
                  style={{ backgroundColor: '#1f2833', transition: '0.3s' }}
                >
                  <div className="fs-1 mb-3">{feature.icon}</div>
                  <h4 className="text-white fw-bold">{feature.title}</h4>
                  <p className="opacity-75">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTENT SHOWCASE (Image + Text) */}
      <section className="py-5" style={{ backgroundColor: '#1f2833' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&w=800&q=80" 
                className="img-fluid rounded-5 shadow-lg" 
                alt="Management Interface"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="display-6 fw-bold text-white mb-4">Centralized Control, Decentralized Access</h2>
              <p className="fs-5 mb-4">Manage your entire library network from a single dashboard while giving your members the freedom to browse and request from anywhere.</p>
              <ul className="list-unstyled">
                <li className="mb-2"><span className="text-info me-2">✔</span> Multi-branch library support</li>
                <li className="mb-2"><span className="text-info me-2">✔</span> Real-time availability updates</li>
                <li className="mb-2"><span className="text-info me-2">✔</span> Advanced search and filtering</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-5 text-center text-white border-top border-secondary">
        <div className="container py-5">
          <h2 className="display-4 fw-bold mb-4">Ready to upgrade your library?</h2>
          <p className="lead mb-5 opacity-75">Join over 12,000 librarians worldwide today.</p>
          <Link to="/register" className="btn btn-info btn-lg px-5 py-3 fw-bold rounded-pill">Create My Account</Link>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-4 text-center opacity-50 small border-top border-secondary">
        <div className="container">
          <p>© 2026 Library Management Pro. Designed for modern bibliophiles.</p>
        </div>
      </footer>

    </div>
  );
}