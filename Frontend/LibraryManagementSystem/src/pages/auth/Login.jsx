import { useState,useEffect } from 'react';
import api from '../../services/Service';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // 1. Import toast
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. New state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

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
      const user = response.data["User"];

      login(user, token);
      toast.success(`Welcome back, ${user.firstName}!`);

      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.response?.data || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5 ">
      <div className="col-md-4 card shadow p-4 border-0">
        <h2 className="text-center mb-4 fw-bold text-primary">User Login</h2>
        
        <form onSubmit={handleLogin} autoComplete="off">
          <input type="text" name="prevent_autofill" style={{display: 'none'}} tabIndex="-1" />
          <input type="password" name="password_fake" style={{display: 'none'}} tabIndex="-1" />
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
            {/* 2. Wrap in input-group to add the eye button */}
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"} // 3. Toggle type
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
                {/* 4. Toggle icon based on state */}
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100 fw-bold" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : null}
            {isLoading ? "Signing In..." : "Sign In"}
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
  );
}