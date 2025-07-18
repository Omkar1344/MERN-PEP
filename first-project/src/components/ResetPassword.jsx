import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { serverEndpoint } from '../config';

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: location.state?.email || '',
    code: '',
    newPassword: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await axios.post(`${serverEndpoint}/auth/reset-password`, form);
      setSuccess('Password reset successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4">Reset Password</h3>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}
        <form onSubmit={handleSubmit}>
          {!location.state?.email && (
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-3 text-start">
            <label htmlFor="code" className="form-label">Reset Code</label>
            <input
              type="text"
              name="code"
              className="form-control"
              id="code"
              value={form.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              id="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword; 