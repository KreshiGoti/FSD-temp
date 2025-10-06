import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/ProfileSettings.css';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+1 (555) 123-4567' // keep phone as default
  });

  // Replace USER_ID with actual logged-in user ID or fetch from auth context
  const USER_ID = '12345';

  // Fetch current user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${USER_ID}`);
        const data = await res.json();
        setFormData({
          fullName: data.name || '',
          email: data.email || '',
          phone: formData.phone
        });
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {}
    navigate('/login');
  };

  // Update user profile on Save Changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/users/${USER_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.fullName, email: formData.email })
      });

      const data = await res.json();
      console.log('Response from backend:', data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('update profile successfully');
    }
  };

  return (
    <div className="profile-settings-container">
      <div className="profile-header">
        <Link to="/user-dashboard" className="back-link">
          <span>←</span> Back to Dashboard
        </Link>
        <div className="header-content">
          <h1>Profile Settings</h1>
          <p className="subtitle">Manage your account information</p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="profile-content">
        {/* User Card */}
        <div className="user-card">
          <div className="user-avatar">
            <div className="avatar-icon">{formData.fullName.split(' ').map(n => n[0]).join('')}</div>
          </div>
          <div className="user-info">
            <h2>{formData.fullName}</h2>
            <p className="user-email">{formData.email}</p>
            <span className="user-role">User</span>
          </div>
        </div>

        {/* Account Status */}
        <div className="settings-section">
          <h3>Account Status</h3>
          <div className="status-grid">
            <div className="status-item">
              <span className="status-label">Account Type</span>
              <span className="status-value">Standard User</span>
            </div>
            <div className="status-item">
              <span className="status-label">Status</span>
              <span className="status-value status-active">Active</span>
            </div>
            <div className="status-item">
              <span className="status-label">Member Since</span>
              <span className="status-value">March 2024</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="settings-section">
          <h3>Personal Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
