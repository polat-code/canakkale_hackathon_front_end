import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Fetch admin user data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        // In a real application, make an API call to get admin data
        // const response = await axios.get('/api/admin/profile');
        // setAdminData(response.data);
        
        // Mock data for development
        setTimeout(() => {
          setAdminData({
            name: "Admin User",
            email: "admin@example.com",
            role: "System Administrator",
            avatar: null
          });
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to fetch admin data');
        console.error('Error fetching admin data:', err);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // In a real application, make API call to logout
      // await axios.post('/api/auth/logout');
      console.log('Admin logged out');
      // Redirect to login page
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-brand">
          <Link to="/admin/dashboard">
            <h1>Admin Portal</h1>
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
        
        <div className={`admin-navbar-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="admin-nav-links">
            <li className="admin-nav-item">
              <Link 
                to="/admin/dashboard" 
                className={`admin-nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
              >
                <i className="dashboard-icon nav-icon">📊</i>
                Dashboard
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link 
                to="/admin/leave-management" 
                className={`admin-nav-link ${isActive('/admin/leave-management') ? 'active' : ''}`}
              >
                <i className="leave-icon nav-icon">📅</i>
                İzin Yönetimi
              </Link>
            </li>
          </ul>
          
          <div className="admin-profile">
            {loading ? (
              <div className="admin-loading">Loading...</div>
            ) : error ? (
              <div className="admin-error">Error loading profile</div>
            ) : adminData ? (
              <div className="admin-info">
                <div className="admin-avatar">
                  {adminData.avatar ? (
                    <img 
                      src={adminData.avatar} 
                      alt={`${adminData.name}'s avatar`}
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {adminData.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="admin-details">
                  <span className="admin-name">{adminData.name}</span>
                  <span className="admin-role">{adminData.role}</span>
                </div>
                <div className="admin-actions">
                  <button className="logout-btn" onClick={handleLogout}>
                    <i className="logout-icon">🚪</i>
                    <span className="logout-text">Çıkış</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="admin-auth">
                <Link to="/login" className="login-btn">Giriş Yap</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;