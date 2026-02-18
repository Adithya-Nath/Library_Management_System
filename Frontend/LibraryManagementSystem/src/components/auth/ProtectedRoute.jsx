import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center mt-5">Loading Security...</div>;

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If user doesn't have the right role (e.g., student trying to access admin)
    return <Navigate to="/home" replace />;
  }

  return children;
}