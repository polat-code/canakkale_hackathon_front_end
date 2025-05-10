import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserNavbar.css';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import { baseURL } from '../../../services/ApiConstants'; // Import baseURL from ApiConstants

const UserNavbar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET request to fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Get access token from cookies
        const accessToken = Cookies.get('access_token');
        
        if (!accessToken) {
          setError('Authentication token not found. Please login again.');
          setLoading(false);
          return;
        }
        
        // Make authenticated API call to get user details
        const response = await axios.get(
          `${baseURL}/auth/detail`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
        // data retunrs empty string
        console.log('User data response:', response);
        // Check if response is successful and contains data
        if (response.data && response.data.success) {
          setUserData(response.data.data);
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Your session has expired. Please login again.');
        } else {
          setError('Failed to fetch user data');
          console.error('Error fetching user data:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to make authenticated requests
  const makeAuthenticatedRequest = async (endpoint, method = 'GET', data = null) => {
    try {
      // Get access token from cookies
      const accessToken = Cookies.get('access_token');
      
      if (!accessToken) {
        throw new Error('Authentication token not found');
      }
      
      const config = {
        method,
        url: `${baseURL}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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
      // Clear cookies
      Cookies.remove('access_token');
      // Redirect to login page
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
            <span className="username">{userData.name || userData.username || "User"}</span>
            <img 
              src={userData.avatarUrl || '/default-avatar.png'} 
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