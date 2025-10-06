import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (data.password !== data.confirm) {
      setSubmitting(false);
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Signup failed');
      }
      setMessage('Sign up successfully');
      // store minimal user info so navbar can show name after redirect
      if (json && json.name) {
        localStorage.setItem('user', JSON.stringify({ id: json.id, name: json.name, email: json.email }));
      }
      // small delay then navigate to login
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-hero">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">Join our community and discover amazing events</p>
          </div>

      <main className="signup-container">
        <div className="signup-card">
          <div className="card-title">Sign Up</div>

          <form onSubmit={handleSubmit} className="signup-form">
            {message && <div className="alert success">{message}</div>}
            {error && <div className="alert error">{error}</div>}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
              <input
                  type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Create a password"
                minLength="6"
                required
              />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(v => !v)} aria-label="Toggle password visibility">
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirm"
                  name="confirm"
                  placeholder="Confirm your password"
                  minLength="6"
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowConfirm(v => !v)} aria-label="Toggle confirm password visibility">
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="accountType">Account Type</label>
              <div className="select-wrapper">
                <select id="accountType" name="accountType" defaultValue="user">
                  <option value="user">User (Event Attendee)</option>
                  <option value="organizer">Organizer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="helper-text">User accounts can browse and register for events</div>
            </div>

            <button type="submit" className="primary-btn" disabled={submitting}>{submitting ? 'Creating...' : 'Create User Account'}</button>

            <div className="divider">
              <span>Already have an account?</span>
            </div>

            <Link to="/login" className="secondary-btn">Login</Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;
