import { useState } from 'react';
import api from '../../services/Service';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    emailId: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 4) {
       toast.warning("Password must be at least 4 characters long");
        return;
    }
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...dataToSend } = formData;
      await api.post('/register', dataToSend);
      toast.success("Registration Successful! Please login.");
      navigate('/'); 
    } catch (error) {
      toast.error(error.response?.data || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        
        <div className="col-md-10 col-lg-8 card shadow p-4 border-0">
          <h2 className="text-center mb-4 fw-bold text-primary">Create Your Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Row 1: First Name & Last Name */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">First Name</label>
                <input type="text" name="firstName" className="form-control" placeholder="firstname" value={formData.firstName} onChange={handleChange} required maxlength="20" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Last Name</label>
                <input type="text" name="lastName" className="form-control" placeholder="lastname" value={formData.lastName} onChange={handleChange} required maxlength="20" />
              </div>

              {/* Row 2: Username & Role */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">Username</label>
                <input type="text" name="username" className="form-control" placeholder="username" value={formData.username} onChange={handleChange} required maxlength="20" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Register as</label>
                <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                  <option value="USER">Student/Member</option>
                  <option value="ADMIN">Librarian/Admin</option>
                </select>
              </div>

              {/* Row 3: Email & Phone */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">Email Address</label>
                <input type="email" name="emailId" className="form-control" placeholder="example@gmail.com" value={formData.emailId} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Phone Number</label>
                <input type="tel" name="phoneNumber" className="form-control" placeholder="+91 0000000000" value={formData.phoneNumber} onChange={handleChange} required maxlength="10" minlength="10" inputMode="numeric"
                 pattern="[0-9]*"/>
              </div>

              {/* Row 4: Password & Confirm Password */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">Password</label>
                <div className="input-group">
                  <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      className="form-control" 
                      placeholder="Min.4 characters"
                      value={formData.password} 
                      onChange={handleChange} 
                      autoComplete="new-password"
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
              <div className="col-md-6">
                <label className="form-label small fw-bold">Confirm Password</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    className="form-control" 
                    placeholder="Repeat password"
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <div className="text-danger extra-small mt-1" style={{fontSize: '0.75rem'}}>Passwords do not match</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-sm" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Registering...</>
                  ) : "Register Account"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="small mb-0 text-muted">
              Already have an account?{" "}
              <Link to="/" className="text-primary fw-bold text-decoration-none">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}