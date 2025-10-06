import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Show navigation on all pages
  const storedUserRaw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  let storedUser = null;
  try { storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null; } catch {}
  const isLoggedIn = !!storedUser;
  const displayName = (storedUser?.name || 'User').toString();
  const roleStr = String(
    (storedUser && (storedUser.role || storedUser.userRole || storedUser.type)) || ''
  ).trim().toLowerCase();

  // Try to read role from JWT token as a robust fallback
  let tokenRole = '';
  try {
    const token = localStorage.getItem('token');
    if (token && token.split('.').length === 3) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      tokenRole = String(payload.role || '').trim().toLowerCase();
    }
  } catch {}

  const isAdmin = (
    roleStr === 'admin' ||
    roleStr === 'administrator' ||
    tokenRole === 'admin' ||
    tokenRole === 'administrator' ||
    storedUser?.isAdmin === true ||
    storedUser?.roleId === 'admin' ||
    (Array.isArray(storedUser?.permissions) && storedUser.permissions.includes('admin')) ||
    // last-resort fallback if user name explicitly says Admin
    displayName.trim().toLowerCase() === 'admin' ||
    displayName.trim().toLowerCase().includes('admin')
  );
  const dashboardHref = isAdmin ? '/admin-dashboard' : '/user-dashboard';

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {}
    navigate('/login');
  };

  // Main navigation for all pages
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-logo">
            <div className="logo-icon">🎉</div>
            <span className="brand-text">EventHub</span>
          </Link>
        </div>
        <div className="nav-elements">
          <div className="nav-menu">
            <Link to="/events" className="nav-link">Events</Link>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-actions">
            {isLoggedIn ? (
              <>
                <Link to={dashboardHref} onClick={(e)=>{ e.preventDefault(); navigate(dashboardHref); }} className="profile-icon-wrapper">
                  <div className="profile-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#4A5568"/>
                      <path d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z" fill="#4A5568"/>
                    </svg>
                  </div>
                </Link>
                <div className="profile-name-wrapper">
                  <Link to={dashboardHref} onClick={(e)=>{ e.preventDefault(); navigate(dashboardHref); }} className="profile-name">{displayName}</Link>
                </div>
                <button type="button" className="btn btn-outline" onClick={handleLogout} style={{ marginLeft: '12px' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-outline">Sign Up</Link>
                <Link to="/login" className="btn btn-primary">Log In</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
