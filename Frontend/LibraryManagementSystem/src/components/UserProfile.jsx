import { useState } from 'react';
import api from '../services/Service';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    emailId: user?.emailId || '',
    phoneNumber: user?.phoneNumber || '',
    password: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/update-profile/${user.id}`, formData);
      
      // Update local storage and component state
      const updatedUser = { ...user, ...formData };
      delete updatedUser.password;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser); // Update local state to reflect changes
      
      toast.success(response.data || "Profile updated successfully! ✨");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data || "Update failed! Please try again.");
    }
  };

  return (
    <div className="py-5 min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          
          {/* Side Information Card */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm border-0 text-center p-4">
              <div className="mx-auto mb-3 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <h4 className="fw-bold mb-1">{user?.firstName} {user?.lastName}</h4>
              <p className="text-muted small mb-3">Member since 2024</p>
              <div className="badge bg-light text-primary border border-primary px-3 py-2">
                Role: {user?.role || 'User'}
              </div>
              <hr />
              <div className="text-start small text-muted">
                <p className="mb-1"><strong>Username:</strong> @{user?.username}</p>
                <p className="mb-0"><strong>Status:</strong> Active Account</p>
              </div>
            </div>
          </div>

          {/* Main Edit Form */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary p-2 rounded me-3">
                  <span className="text-white">⚙️</span>
                </div>
                <h3 className="mb-0 fw-bold">Account Settings</h3>
              </div>

              <form onSubmit={handleUpdate} className="row g-4">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">First Name</label>
                  <input type="text" name="firstName" className="form-control form-control-lg fs-6" value={formData.firstName} onChange={handleChange} />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-uppercase text-muted">Last Name</label>
                  <input type="text" name="lastName" className="form-control form-control-lg fs-6" value={formData.lastName} onChange={handleChange} />
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
                  <input type="email" name="emailId" className="form-control form-control-lg fs-6" value={formData.emailId} onChange={handleChange} />
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-bold text-uppercase text-muted">Phone Number</label>
                  <input type="text" name="phoneNumber" className="form-control form-control-lg fs-6" value={formData.phoneNumber} onChange={handleChange} />
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-bold text-uppercase text-muted">Change Password</label>
                  <input type="password" name="password" className="form-control form-control-lg fs-6" 
                         placeholder="Leave blank to keep current password" 
                         value={formData.password} onChange={handleChange} />
                  <div className="form-text text-info small mt-2">
                    🔒 Security tip: Use a combination of letters, numbers, and symbols.
                  </div>
                </div>

                <div className="col-12 mt-5">
                  <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}