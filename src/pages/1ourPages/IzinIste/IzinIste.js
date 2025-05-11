import React, { useState } from 'react';
import axios from 'axios';
import './IzinIste.css';
import UserNavbar from '../../../components/common/UserNavbar/UserNavbar';
import { baseURL } from '../../../services/ApiConstants'; // Import baseURL from ApiConstants
import Cookies from 'js-cookie';
// istek ne olursa ol
const TimeOffRequest = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Calculate the number of days requested
  const calculateDays = () => {
    if (!formData.from || !formData.to) return 0;
    
    const start = new Date(formData.from);
    const end = new Date(formData.to);
    
    // Return 0 if dates are invalid or end is before start
    if (isNaN(start) || isNaN(end) || end < start) return 0;
    
    // Calculate the difference in days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start date
    
    return diffDays;
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.from) errors.from = "Start date is required";
    if (!formData.to) errors.to = "End date is required";
    if (formData.from && formData.to) {
      const start = new Date(formData.from);
      const end = new Date(formData.to);
      if (end < start) errors.dateRange = "End date cannot be before start date";
    }
    // Changed minimum character requirement from 10 to 5
    if (!formData.description?.trim()) errors.description = "Reason is required";
    else if (formData.description.length < 5) errors.description = "Reason must be at least 5 characters";
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError("Please fix the following errors: " + Object.values(validationErrors).join(", "));
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Get access token from cookies
      const accessToken = Cookies.get('access_token');
      
      if (!accessToken) {
        setError('Authentication token not found. Please login again.');
        setLoading(false);
        return;
      }

        const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      };

        const payload = {
        from: formatDate(formData.from),
        to: formatDate(formData.to),
        description: formData.description
      };
      
      // Make API call with token in header
      await axios.post(
        `${baseURL}/requested-day-of-permission`, 
        payload, 
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Set success state
      setSuccess(true);
      console.log('Time off request submitted:', formData);
      
      // Reset form after successful submission
      setFormData({
        from: '',
        to: '',
        description: ''
      });
      
      // Hide success message after 4 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Your session has expired. Please login again.');
      } else {
        setError('Failed to submit request. Please try again.');
        console.error('Error submitting time off request:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="time-off-request-container">
        <UserNavbar />
    
      <p className="page-description">Submit your time off request for approval</p>

      {success && (
        <div className="success-message">
          <i className="success-icon">✓</i> Your time off request has been successfully submitted!
        </div>
      )}

      {error && (
        <div className="error-message">
          <i className="error-icon">!</i> {error}
        </div>
      )}

      <div className="request-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="from">Start Date *</label>
              <input
                type="date"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]} // Today as minimum date
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="to">End Date *</label>
              <input
                type="date"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                min={formData.from || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {formData.from && formData.to && new Date(formData.to) >= new Date(formData.from) && (
            <div className="days-summary">
              Total days requested: <span className="days-count">{calculateDays()}</span>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="description">Description for Time Off *</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Please explain the reason for your time off request"
              required
              maxLength="500" // Added explicit max length of 500 characters
            ></textarea>
            <small>Minimum 5 characters. Maximum 500 characters. Provide any additional details that might be relevant.</small>
            <div className="character-counter">
              {formData.description?.length || 0}/500 characters
            </div>
          </div>
          
          <div className="form-notice">
            <p>
              <strong>Note:</strong> All requests are subject to manager approval and will be 
              reviewed within 48 hours. You will receive a notification when your request 
              is approved or denied.
            </p>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeOffRequest;