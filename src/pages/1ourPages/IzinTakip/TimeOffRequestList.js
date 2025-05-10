import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TimeOffRequestList.css';
import UserNavbar from '../../../components/common/UserNavbar/UserNavbar';

const TimeOffRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'

  useEffect(() => {
    // Fetch time off requests when component mounts
    fetchRequests();
  }, []);

  /**
   * Fetch time off requests from API
   * 
   * API Endpoint: GET /api/time-off-requests
   * 
   * Query Parameters:
   * - userId: The ID of the user (get from authentication context)
   * - status: Optional filter by status ('pending', 'approved', 'rejected')
   * - startDate: Optional filter by start date range
   * - endDate: Optional filter by end date range
   * 
   * Response format:
   * {
   *   "success": true,
   *   "data": [
   *     {
   *       "id": "123456",
   *       "startDate": "2025-06-01",
   *       "endDate": "2025-06-05",
   *       "reason": "Family vacation",
   *       "status": "approved",
   *       "requestedOn": "2025-05-10T10:30:00Z",
   *       "responseDate": "2025-05-11T14:22:00Z",
   *       "approverName": "Jane Manager",
   *       "comments": "Enjoy your vacation!"
   *     },
   *     ...
   *   ]
   * }
   */
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real application, you would fetch from your API:
      // const response = await axios.get('/api/time-off-requests?userId=currentUserId');
      // setRequests(response.data.data);

      // Simulating API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRequests(dummyRequests);
    } catch (err) {
      console.error('Error fetching time off requests:', err);
      setError('Failed to load your time off requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate the duration of the time off request
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start date
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };

  // Filter requests based on status
  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(request => request.status === filter);

  // Get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'approved':
        return 'status-badge approved';
      case 'rejected':
        return 'status-badge rejected';
      case 'cancelled':
        return 'status-badge cancelled';
      default:
        return 'status-badge pending';
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
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approved
          </button>
          <button 
            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
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
              : `You don't have any ${filter} time off requests.`}
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
            <div className="header-actions">Actions</div>
          </div>

          {filteredRequests.map(request => (
            <div className="request-list-item" key={request.id}>
              <div className="request-date">
                <div className="date-range">{formatDate(request.startDate)} - {formatDate(request.endDate)}</div>
                <div className="request-date-meta">Requested on {formatDate(request.requestedOn)}</div>
              </div>
              <div className="request-duration">
                {calculateDuration(request.startDate, request.endDate)}
              </div>
              <div className="request-reason">
                <div className="reason-text">{request.reason}</div>
              </div>
              <div className="request-status">
                <span className={getStatusBadgeClass(request.status)}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
                {request.status !== 'pending' && (
                  <div className="status-date">{formatDate(request.responseDate)}</div>
                )}
              </div>
              <div className="request-actions">
                <button className="action-btn view-btn" title="View Details">
                  <i className="view-icon">👁️</i>
                </button>
                {request.status === 'pending' && (
                  <button className="action-btn cancel-btn" title="Cancel Request">
                    <i className="cancel-icon">✖</i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Dummy data for development
const dummyRequests = [
  {
    id: '1',
    startDate: '2025-06-01',
    endDate: '2025-06-05',
    reason: 'Family vacation to Antalya',
    status: 'approved',
    requestedOn: '2025-05-01T10:30:00Z',
    responseDate: '2025-05-02T14:22:00Z',
    approverName: 'Ayşe Yılmaz',
    comments: 'Enjoy your vacation!'
  },
  {
    id: '2',
    startDate: '2025-07-15',
    endDate: '2025-07-16',
    reason: 'Medical appointment',
    status: 'pending',
    requestedOn: '2025-05-05T09:15:00Z',
    responseDate: null,
    approverName: null,
    comments: null
  },
  {
    id: '3',
    startDate: '2025-04-10',
    endDate: '2025-04-12',
    reason: 'Personal matter',
    status: 'rejected',
    requestedOn: '2025-04-01T11:45:00Z',
    responseDate: '2025-04-02T16:30:00Z',
    approverName: 'Mehmet Demir',
    comments: 'Critical project deadline during this period'
  },
  {
    id: '4',
    startDate: '2025-08-20',
    endDate: '2025-09-03',
    reason: 'Annual leave',
    status: 'approved',
    requestedOn: '2025-05-08T08:00:00Z',
    responseDate: '2025-05-09T10:15:00Z',
    approverName: 'Ayşe Yılmaz',
    comments: 'Approved as requested'
  },
  {
    id: '5',
    startDate: '2025-05-25',
    endDate: '2025-05-25',
    reason: 'Family emergency',
    status: 'approved',
    requestedOn: '2025-05-24T18:30:00Z',
    responseDate: '2025-05-24T19:45:00Z',
    approverName: 'Mehmet Demir',
    comments: 'Hope everything is okay'
  }
];

export default TimeOffRequestList;