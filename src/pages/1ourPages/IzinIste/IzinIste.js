import React, { useState } from 'react';
import axios from 'axios';
import './IzinIste.css';
import UserNavbar from '../../../components/common/UserNavbar/UserNavbar';

const TimeOffRequest = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
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
    if (!formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
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
    
    if (!formData.startDate) errors.startDate = "Start date is required";
    if (!formData.endDate) errors.endDate = "End date is required";
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) errors.dateRange = "End date cannot be before start date";
    }
    if (!formData.reason.trim()) errors.reason = "Reason is required";
    else if (formData.reason.length < 10) errors.reason = "Reason must be at least 10 characters";
    
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
      // In a real application, send the request to your API
      // await axios.post('/api/time-off-requests', formData);
      
      // For demo, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      console.log('Time off request submitted:', formData);
      
      // Reset form after successful submission
      setFormData({
        startDate: '',
        endDate: '',
        reason: ''
      });
      
      // Hide success message after 4 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      console.error('Error submitting time off request:', err);
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
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]} // Today as minimum date
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">End Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {formData.startDate && formData.endDate && new Date(formData.endDate) >= new Date(formData.startDate) && (
            <div className="days-summary">
              Total days requested: <span className="days-count">{calculateDays()}</span>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="reason">Reason for Time Off *</label>
            <textarea
              id="reason"
              name="reason"
              rows="5"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please explain the reason for your time off request"
              required
            ></textarea>
            <small>Minimum 10 characters. Provide any additional details that might be relevant.</small>
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