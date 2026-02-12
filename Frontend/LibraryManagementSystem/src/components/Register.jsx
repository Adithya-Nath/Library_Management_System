import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    emailId: '',
    phoneNumber: '',
    role: 'USER' // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering User:", formData);
    // This is where your axios.post("http://localhost:8080/api/register", formData) will go
    alert(`Account created for ${formData.username}!`);
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 card shadow p-4 border-0">
        <h2 className="text-center mb-4 fw-bold text-success">Create Account</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          
          {/* First Name & Last Name */}
          <div className="col-md-6">
            <label className="form-label small fw-bold">First Name</label>
            <input type="text" name="firstName" className="form-control" placeholder="first name" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Last Name</label>
            <input type="text" name="lastName" className="form-control" placeholder="last name" value={formData.lastName} onChange={handleChange} required />
          </div>

          {/* Username */}
          <div className="col-md-12">
            <label className="form-label small fw-bold">Username</label>
            <input type="text" name="username" className="form-control" placeholder="username" value={formData.username} onChange={handleChange} required />
          </div>

          {/* Email & Phone */}
          <div className="col-md-6">
            <label className="form-label small fw-bold">Email Address</label>
            <input type="email" name="emailId" className="form-control" placeholder="email id" value={formData.emailId} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Phone Number</label>
            <input type="text" name="phoneNumber" className="form-control" placeholder="+91 xxxxxxxxxx" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          {/* Password */}
          <div className="col-md-12">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" name="password" className="form-control" placeholder="********" value={formData.password} onChange={handleChange} required />
          </div>

          {/* Role Selection */}
          <div className="col-md-12">
            <label className="form-label small fw-bold">Register as</label>
            <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
              <option value="USER">Student/Member</option>
              <option value="ADMIN">Librarian/Admin</option>
            </select>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-success w-100 fw-bold py-2 shadow-sm">
              Register Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}