import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // This function returns Bootstrap classes based on whether the link is active
  const getLinkClasses = (isActive, defaultColor = "text-secondary") => {
    return `nav-link ${isActive ? "text-white fw-bold border-bottom border-warning" : defaultColor}`;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">📚 Library Management System </Link>
        <div className="navbar-nav ms-auto align-items-center">
          
          <NavLink 
            className={({ isActive }) => getLinkClasses(isActive, "text-info")} 
            to="/home"
          >
            Home
          </NavLink>
          
          {!user ? (
            <>
              <NavLink 
                className={({ isActive }) => getLinkClasses(isActive)} 
                to="/"
              >
                Login
              </NavLink>
              <NavLink 
                className={({ isActive }) => getLinkClasses(isActive)} 
                to="/register"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              {user.role === 'ADMIN' && (
                <NavLink 
                  className={({ isActive }) => getLinkClasses(isActive, "text-info")} 
                  to="/admin"
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink 
                className={({ isActive }) => getLinkClasses(isActive, "text-info")} 
                to="/profile"
              >
                👤 {user.firstName}
              </NavLink>
              <button className="btn btn-sm btn-danger ms-2" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}