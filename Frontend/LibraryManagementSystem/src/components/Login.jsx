// src/pages/Login.jsx
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4 card shadow p-4">
        <h2 className="text-center mb-4">User Login</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control"  placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control"  placeholder="Enter your password" />
          </div>
          <button className="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
}