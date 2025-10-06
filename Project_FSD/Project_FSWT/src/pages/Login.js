import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Login failed');
      }
      setMessage('Sign in successfully');
      // store token and user for navbar display
      if (json.token) localStorage.setItem('token', json.token);
      if (json.user) localStorage.setItem('user', JSON.stringify(json.user));
      // navigate after brief delay: admins -> admin-dashboard, others -> user dashboard
      const role = (json.user?.role || '').toLowerCase();
      const target = role === 'admin' ? '/admin-dashboard' : '/';
      setTimeout(() => navigate(target), 600);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {message && <div className="alert success">{message}</div>}
            {error && <div className="alert error">{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
