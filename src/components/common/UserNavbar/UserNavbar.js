import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserNavbar.css';

const UserNavbar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET request to fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/user/profile');
        setUserData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to make custom requests
  const makeRequest = async (endpoint, method = 'GET', data = null) => {
    try {
      const config = {
        method,
        url: `/api${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        config.data = data;
      }

      const response = await axios(config);
      return response.data;
    } catch (err) {
      console.error('Error making request:', err);
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await makeRequest('/auth/logout', 'POST');
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="user-navbar">
      <div className="navbar-brand">
        <a href="/">Izin isteme sistemi</a>
      </div>
      
      <div className="navbar-menu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/user/iziniste">Izin Iste</a>
          </li>
          <li className="nav-item">
            <a href="/user/izinlerim">Izinlerim</a>
          </li>
          <li className="nav-item">
            <a href="/user/profil">Profil</a>
          </li>
          <li className="nav-item">
            <a href="/user/ayarlar">Ayarlar</a>
          </li>
        </ul>
      </div>
      
      <div className="navbar-user">
        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>Error: {error}</span>
        ) : userData ? (
          <div className="user-info">
            <span className="username">{userData.name}</span>
            <img 
              src={userData.avatar || '/default-avatar.png'} 
              alt="User avatar" 
              className="user-avatar"
            />
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <a href="/login" className="login-btn">Login</a>
            <a href="/register" className="register-btn">Register</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;