// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">📚 LIBRARY MANAGEMENT SYSTEM Portal</Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
          <Link className="nav-link btn btn-outline-warning ms-lg-2" to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}