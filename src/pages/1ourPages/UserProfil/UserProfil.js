import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfil.css';
import UserNavbar from '../../../components/common/UserNavbar/UserNavbar';
import { Nav } from 'react-bootstrap';



const UserProfil = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    bio: '',
    location: '',
    timezone: 'Europe/Istanbul',
    language: 'tr',
    emailNotifications: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Comment out the actual API call for now
        // const response = await axios.get('/api/user/profile');
        // setFormData(response.data);
        
        // Mock data for testing
        setTimeout(() => {
          setFormData({
            firstName: 'John',
            bio: 'Software developer passionate about web technologies',
            location: 'Çanakkale, Turkey',
            timezone: 'Europe/Istanbul',
            language: 'tr',
            emailNotifications: true,
          });
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
        console.error('Error loading user data:', err);
      }
    };

    fetchUserData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Comment out actual API call for now
      // await axios.put('/api/user/profile', formData);
      
      // Mock successful API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
      console.log('Profile updated successfully:', formData);
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.firstName) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
     
    <div className="user-profil-container">
    <UserNavbar />
      <h1 className="page-title">User Profile</h1>
      
      <p className="page-description">Manage your account details and preferences</p>

      {success && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="profil-card">
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <small>This is your primary contact email.</small>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            ></textarea>
            <small>Brief description for your profile. Max 500 characters.</small>
          </div>

          <div className="form-divider"></div>
          
          <h2>Preferences</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
              >
                <option value="Europe/Istanbul">Istanbul (GMT+3)</option>
                <option value="Europe/London">London (GMT+0)</option>
                <option value="America/New_York">New York (GMT-5)</option>
                <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
                <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option value="tr">Turkish</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="form-divider"></div>
          
          <h2>Notification Settings</h2>
          
          <div className="checkbox-group">
            <div className="checkbox-wrapper">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive notifications about account activity</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          
          <div className="checkbox-group">
            <div className="checkbox-wrapper">
              <div>
                <h3>Marketing Emails</h3>
                <p>Receive emails about new features and promotions</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  name="marketingEmails"
                  checked={formData.marketingEmails}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfil;