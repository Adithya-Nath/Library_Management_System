import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import api from '../../services/Service';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await api.post('/login', { username, password });
      
      const token = response.data["token"]; 
      const userData = response.data["User"];

      login(userData, token);
      toast.success(`Welcome back, ${userData.firstName}!`);

      if (userData.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data || "Invalid username or password";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container"> {/* Added container wrapper to enable centering */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 col-lg-4 card shadow p-4 border-0">
          <h2 className="text-center mb-4 fw-bold text-primary">User Login</h2>
          
          <form onSubmit={handleLogin} autoComplete="off">
            <input type="text" name="prevent_autofill" style={{display: 'none'}} tabIndex="-1" />
            
            <div className="mb-3">
              <label className="form-label fw-bold">Username</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"}
                  className="form-control" 
                  autoComplete="current-password"
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-100 fw-bold py-2" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="small mb-0 text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary fw-bold text-decoration-none">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}