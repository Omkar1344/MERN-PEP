import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverEndpoint } from '../config';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await axios.post(`${serverEndpoint}/auth/send-reset-password-token`, { email });
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4">Forgot Password</h3>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword; 