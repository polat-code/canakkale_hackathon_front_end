import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './TimeOffRequestList.css';
import UserNavbar from '../../../components/common/UserNavbar/UserNavbar';
import { baseURL } from '../../../services/ApiConstants';

const TimeOffRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'APPROVE', 'DENY', 'PENDING'

  useEffect(() => {
    // Fetch time off requests when component mounts
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get access token from cookies
      const accessToken = Cookies.get('access_token');
      
      if (!accessToken) {
        setError('Authentication token not found. Please login again.');
        setLoading(false);
        return;
      }

      // Make API call with token in header
      const response = await axios.get(
        `${baseURL}/requested-day-of-permission/all-user`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if response is successful and contains data
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        console.log('Time off requests response:', response.data);
        setRequests(response.data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching time off requests:', err);
      if (err.response && err.response.status === 401) {
        setError('Your session has expired. Please login again.');
      } else {
        setError('Failed to load your time off requests. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Format date - handle various formats and return dd.mm.yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    
    // If it's already in dd.mm.yyyy format, return it as is
    const ddmmyyyyRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (ddmmyyyyRegex.test(dateString)) {
      return dateString;
    }
    
    // Try to parse the date
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return dateString; // Return the original string if we can't parse it
    }
    
    // Format as dd.mm.yyyy
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Calculate the duration of the time off request
  const calculateDuration = (fromDate, toDate) => {
    // Try to parse dates - if they're already in dd.mm.yyyy format, convert them first
    const parseDate = (dateStr) => {
      if (!dateStr) return null;
      
      const ddmmyyyyRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
      const match = dateStr.match(ddmmyyyyRegex);
      if (match) {
        // If dd.mm.yyyy format, convert to yyyy-mm-dd for JS Date
        const [, day, month, year] = match;
        return new Date(`${year}-${month}-${day}`);
      }
      
      return new Date(dateStr);
    };
    
    const start = parseDate(fromDate);
    const end = parseDate(toDate);
    
    // If dates can't be parsed, return a default message
    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "N/A";
    }
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start date
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };

  // Filter requests based on status
  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(request => request.permissionStatus === filter);

  // Get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'APPROVE':
        return 'status-badge approved';
      case 'DENY':
        return 'status-badge rejected';
      case 'CANCELLED':
        return 'status-badge cancelled';
      default:
        return 'status-badge pending';
    }
  };

  // Format status text to be more user-friendly
  const formatStatusText = (status) => {
    switch(status) {
      case 'APPROVE':
        return 'Approved';
      case 'DENY':
        return 'Rejected';
      case 'CANCELLED':
        return 'Cancelled';
      case 'PENDING':
      default:
        return 'Pending';
    }
  };

  return (
    <div className="time-off-request-list-container">
      <UserNavbar />
      <p className="page-description">View and manage your time off requests</p>

      <div className="request-list-actions">
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setFilter('PENDING')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'APPROVE' ? 'active' : ''}`}
            onClick={() => setFilter('APPROVE')}
          >
            Approved
          </button>
          <button 
            className={`filter-btn ${filter === 'DENY' ? 'active' : ''}`}
            onClick={() => setFilter('DENY')}
          >
            Rejected
          </button>
        </div>

        <Link to="/user/iziniste" className="new-request-btn">
          New Request
        </Link>
      </div>

      {loading ? (
        <div className="loading-spinner">
          Loading your requests...
        </div>
      ) : error ? (
        <div className="error-message">
          <i className="error-icon">!</i> {error}
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No requests found</h3>
          <p>
            {filter === 'all' 
              ? "You haven't made any time off requests yet." 
              : `You don't have any ${filter.toLowerCase()} time off requests.`}
          </p>
          <Link to="/user/iziniste" className="empty-action-btn">
            Create New Request
          </Link>
        </div>
      ) : (
        <div className="request-list-card">
          <div className="request-list-header">
            <div className="header-date">Date Range</div>
            <div className="header-duration">Duration</div>
            <div className="header-reason">Reason</div>
            <div className="header-status">Status</div>
            {/* Removed header-actions column */}
          </div>

          {filteredRequests.map(request => (
            <div className="request-list-item" key={request.id}>
              <div className="request-date">
                <div className="date-range">{formatDate(request.from)} - {formatDate(request.to)}</div>
                <div className="request-date-meta">Requested on {formatDate(request.requestedOn)}</div>
              </div>
              <div className="request-duration">
                {request.duration ? `${request.duration} day${request.duration !== 1 ? 's' : ''}` : calculateDuration(request.from, request.to)}
              </div>
              <div className="request-reason">
                <div className="reason-text">{request.reason}</div>
              </div>
              <div className="request-status">
                <span className={getStatusBadgeClass(request.permissionStatus)}>
                  {formatStatusText(request.permissionStatus)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeOffRequestList;