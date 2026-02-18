import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">📚 Library Management System </Link>
        <div className="navbar-nav ms-auto align-items-center">
          <Link className="nav-link text-warning" to="/home">Home</Link>
          
          {!user ? (
            <>
              <Link className="nav-link" to="/">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          ) : (
            <>
              {user.role === 'ADMIN' && (
                <Link className="nav-link text-warning" to="/admin">Dashboard</Link>
              )}
              <Link className="nav-link text-info" to="/profile">👤 {user.firstName}</Link>
              <button className="btn btn-sm btn-danger ms-2" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}