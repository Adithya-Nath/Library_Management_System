import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      {/* Dark Overlay when sidebar is open (Mobile friendly) */}
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
          onClick={onClose}
        ></div>
      )}

      {/* Sliding Sidebar */}
      <div 
        className={`bg-dark text-white p-3 vh-100 position-fixed top-0 start-0 shadow transition-all`}
        style={{ 
          width: '250px', 
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Menu</h5>
          <button className="btn btn-sm btn-outline-light" onClick={onClose}>×</button>
        </div>

        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <Link to="/home" className="nav-link text-white" onClick={onClose}>🏠 Library Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-link text-white" onClick={onClose}>📜 Reading History</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-white" onClick={onClose}>👤 My Profile</Link>
          </li>
        </ul>
      </div>
    </>
  );
}