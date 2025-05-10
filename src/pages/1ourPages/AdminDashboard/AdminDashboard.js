import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiAssistActive, setAiAssistActive] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState({});
  
  // Undo functionality
  const [recentAction, setRecentAction] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  useEffect(() => {
    fetchAllRequests();
  }, []);

  useEffect(() => {
    // Filter requests when status filter or requests array changes
    if (requests.length > 0) {
      if (statusFilter === 'all') {
        setFilteredRequests(requests);
      } else {
        setFilteredRequests(requests.filter(req => req.status === statusFilter));
      }
    }
  }, [statusFilter, requests]);

  // Fetch all requests (pending, approved, rejected)
  const fetchAllRequests = async () => {
    setLoading(true);
    try {
      // In a real application, fetch from your API
      // const response = await axios.get('/api/admin/all-requests');
      // setRequests(response.data);
      
      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 800));
      setRequests(mockAllRequests);
      setFilteredRequests(mockAllRequests.filter(req => req.status === statusFilter));
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle status filter change
  const handleFilterChange = (status) => {
    setStatusFilter(status);
  };

  // Handle AI assist button click
  const handleAskAI = async () => {
    setAiProcessing(true);
    setAiAssistActive(true);
    
    try {
      // In a real application, send requests to your AI service
      // const response = await axios.post('/api/ai/analyze-requests', { requests: filteredRequests });
      // setAiSuggestions(response.data.suggestions);
      
      // Mock AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response
      const mockSuggestions = {};
      filteredRequests.forEach(request => {
        if (request.status === 'pending') {
          const randomDecision = Math.random() > 0.3; // 70% approve, 30% decline
          mockSuggestions[request.id] = {
            recommendation: randomDecision ? 'approve' : 'decline',
            confidence: Math.floor(Math.random() * 30) + 70, // 70-99% confidence
            reasoning: randomDecision 
              ? getRandomApproveReason(request) 
              : getRandomDeclineReason(request)
          };
        }
      });
      setAiSuggestions(mockSuggestions);
    } catch (err) {
      console.error('Error getting AI suggestions:', err);
      setAiAssistActive(false);
      alert('Failed to get AI assistance. Please try again.');
    } finally {
      setAiProcessing(false);
    }
  };

  // Clear any pending undo timeout
  const clearUndoTimeout = () => {
    if (undoTimeout) {
      clearTimeout(undoTimeout);
      setUndoTimeout(null);
    }
  };

  // Handle request approval
  const handleApprove = async (requestId) => {
    // Clear any existing undo action
    clearUndoTimeout();
    
    try {
      // Find the request to update
      const requestToUpdate = requests.find(req => req.id === requestId);
      if (!requestToUpdate) return;
      
      // Save previous state for undo
      const previousState = { ...requestToUpdate };
      setRecentAction({
        type: 'approve',
        requestId,
        previousState
      });
      
      // Update the request status in our state
      const updatedRequests = requests.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved', responseDate: new Date().toISOString() } 
          : req
      );
      setRequests(updatedRequests);
      
      // Set timeout for undo window (5 seconds)
      const timeout = setTimeout(() => {
        setRecentAction(null);
        
        // In a real application, send approval to your API after undo window
        // await axios.post(`/api/admin/requests/${requestId}/approve`);
        console.log(`Approval confirmed for request ${requestId}`);
        
      }, 5000);
      
      setUndoTimeout(timeout);
      
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Failed to approve request. Please try again.');
    }
  };

  // Handle request rejection
  const handleDecline = async (requestId) => {
    // Clear any existing undo action
    clearUndoTimeout();
    
    try {
      // Find the request to update
      const requestToUpdate = requests.find(req => req.id === requestId);
      if (!requestToUpdate) return;
      
      // Save previous state for undo
      const previousState = { ...requestToUpdate };
      setRecentAction({
        type: 'decline',
        requestId,
        previousState
      });
      
      // Update the request status in our state
      const updatedRequests = requests.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected', responseDate: new Date().toISOString() } 
          : req
      );
      setRequests(updatedRequests);
      
      // Set timeout for undo window (5 seconds)
      const timeout = setTimeout(() => {
        setRecentAction(null);
        
        // In a real application, send rejection to your API after undo window
        // await axios.post(`/api/admin/requests/${requestId}/decline`);
        console.log(`Rejection confirmed for request ${requestId}`);
        
      }, 5000);
      
      setUndoTimeout(timeout);
      
    } catch (err) {
      console.error('Error declining request:', err);
      alert('Failed to decline request. Please try again.');
    }
  };

  // Handle undo action
  const handleUndo = () => {
    if (!recentAction) return;
    
    clearUndoTimeout();
    
    // Restore the previous state of the request
    const updatedRequests = requests.map(req => 
      req.id === recentAction.requestId 
        ? { ...recentAction.previousState }
        : req
    );
    
    setRequests(updatedRequests);
    console.log(`Undid ${recentAction.type} action for request ${recentAction.requestId}`);
    setRecentAction(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper for request row class based on AI suggestion
  const getRequestRowClass = (request) => {
    if (request.status !== 'pending') {
      return `status-${request.status}`;
    }
    
    if (!aiAssistActive || !aiSuggestions[request.id]) return '';
    
    return aiSuggestions[request.id].recommendation === 'approve' 
      ? 'ai-suggest-approve' 
      : 'ai-suggest-decline';
  };

  // Helper for confidence display
  const getConfidenceLabel = (confidence) => {
    if (confidence >= 90) return 'Very High';
    if (confidence >= 80) return 'High';
    if (confidence >= 70) return 'Moderate';
    return 'Low';
  };

  // Get count of requests by status
  const getStatusCount = (status) => {
    return requests.filter(req => req.status === status).length;
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Manage time off requests</p>
        </div>
        
        <div className="header-actions">
          <button 
            className={`ai-assist-btn ${aiAssistActive ? 'active' : ''} ${aiProcessing ? 'loading' : ''}`}
            onClick={handleAskAI}
            disabled={aiProcessing || filteredRequests.filter(req => req.status === 'pending').length === 0}
          >
            {aiProcessing ? (
              <>
                <span className="spinner"></span>
                AI Processing...
              </>
            ) : aiAssistActive ? (
              <>
                <span className="ai-icon">🤖</span>
                AI Enabled
              </>
            ) : (
              <>
                <span className="ai-icon">🤖</span>
                Ask AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="status-filter">
        <button 
          className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('all')}
        >
          All Requests <span className="count">{requests.length}</span>
        </button>
        <button 
          className={`filter-tab ${statusFilter === 'pending' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('pending')}
        >
          Pending <span className="count">{getStatusCount('pending')}</span>
        </button>
        <button 
          className={`filter-tab ${statusFilter === 'approved' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('approved')}
        >
          Approved <span className="count">{getStatusCount('approved')}</span>
        </button>
        <button 
          className={`filter-tab ${statusFilter === 'rejected' ? 'active' : ''}`} 
          onClick={() => handleFilterChange('rejected')}
        >
          Rejected <span className="count">{getStatusCount('rejected')}</span>
        </button>
      </div>

      {aiAssistActive && statusFilter === 'pending' && (
        <div className="ai-assist-banner">
          <div className="ai-info">
            <span className="ai-active-icon">🤖</span>
            <span>
              AI assistance is active. Recommendations are highlighted and additional context is available on hover.
            </span>
          </div>
          <button 
            className="ai-disable-btn"
            onClick={() => setAiAssistActive(false)}
          >
            Disable AI
          </button>
        </div>
      )}

      {/* Undo notification */}
      {recentAction && (
        <div className="undo-notification">
          <div className="undo-message">
            <span className="undo-icon">✓</span>
            Request {recentAction.type === 'approve' ? 'approved' : 'declined'}
          </div>
          <button className="undo-btn" onClick={handleUndo}>
            Undo
          </button>
        </div>
      )}

      <div className="dashboard-content">
        {loading ? (
          <div className="loading-state">
            <span className="large spinner"></span>
            <p>Loading requests...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p className="error-message">{error}</p>
            <button 
              className="retry-btn"
              onClick={fetchAllRequests}
            >
              Retry
            </button>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{statusFilter === 'pending' ? '✓' : '📝'}</div>
            <h2>{statusFilter === 'pending' ? 'All caught up!' : 'No requests found'}</h2>
            <p>
              {statusFilter === 'all' 
                ? "There are no time off requests in the system." 
                : `There are no ${statusFilter} requests to display.`}
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Requester</th>
                  <th>Date Range</th>
                  <th>Duration</th>
                  <th>Reason</th>
                  <th>Request Date</th>
                  {statusFilter !== 'pending' && <th>Response Date</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(request => (
                  <tr 
                    key={request.id} 
                    className={getRequestRowClass(request)}
                  >
                    {/* Requester */}
                    <td className="requester-cell">
                      <div className="requester-info">
                        <div className="requester-avatar">
                          {request.requesterName.charAt(0).toUpperCase()}
                        </div>
                        <div className="requester-details">
                          <div className="requester-name">{request.requesterName}</div>
                          <div className="requester-department">{request.requesterDepartment}</div>
                        </div>
                      </div>
                    </td>

                    {/* Date Range */}
                    <td className="date-range-cell">
                      {formatDate(request.startDate)} - {formatDate(request.endDate)}
                    </td>

                    {/* Duration */}
                    <td className="duration-cell">
                      <span className="duration-badge">
                        {request.duration} {request.duration === 1 ? 'day' : 'days'}
                      </span>
                    </td>

                    {/* Reason */}
                    <td className="reason-cell">
                      <div className="request-reason">
                        {request.reason}
                      </div>
                    </td>

                    {/* Requested On */}
                    <td className="requested-on-cell">
                      {formatDate(request.requestedOn)}
                    </td>

                    {/* Response Date (for approved/rejected only) */}
                    {statusFilter !== 'pending' && (
                      <td className="response-date-cell">
                        {request.responseDate ? formatDate(request.responseDate) : '-'}
                      </td>
                    )}

                    {/* Actions */}
                    <td className="actions-cell">
                      {request.status === 'pending' ? (
                        <div className="request-actions">
                          <button 
                            className="action-btn approve-btn"
                            onClick={() => handleApprove(request.id)}
                            aria-label="Approve request"
                          >
                            Approve
                          </button>
                          <button 
                            className="action-btn decline-btn"
                            onClick={() => handleDecline(request.id)}
                            aria-label="Decline request"
                          >
                            Decline
                          </button>
                        </div>
                      ) : (
                        <span className={`status-badge ${request.status}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      )}

                      {/* AI Suggestion Tooltip */}
                      {aiAssistActive && aiSuggestions[request.id] && request.status === 'pending' && (
                        <div className="ai-suggestion-tooltip">
                          <div className="tooltip-header">
                            <span>AI Recommendation: <strong>
                              {aiSuggestions[request.id].recommendation === 'approve' ? 'Approve' : 'Decline'}
                            </strong></span>
                            <span className="confidence">
                              Confidence: {getConfidenceLabel(aiSuggestions[request.id].confidence)} 
                              ({aiSuggestions[request.id].confidence}%)
                            </span>
                          </div>
                          <div className="tooltip-content">
                            <div className="reason-label">Reasoning:</div>
                            <p>{aiSuggestions[request.id].reasoning}</p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions for generating AI reasoning
const getRandomApproveReason = (request) => {
  const approveReasons = [
    `Employee has sufficient vacation balance (${Math.floor(Math.random() * 20) + 10} days remaining) and the request is made well in advance.`,
    `No scheduling conflicts detected. Team capacity will remain at ${Math.floor(Math.random() * 30) + 70}% during this period.`,
    `Employee has good attendance record and hasn't taken time off in ${Math.floor(Math.random() * 3) + 2} months.`,
    `Request is for a common holiday period and was submitted ${Math.floor(Math.random() * 30) + 30} days in advance.`,
    `Employee has completed all assigned tasks for this period and workload is manageable.`
  ];
  return approveReasons[Math.floor(Math.random() * approveReasons.length)];
};

const getRandomDeclineReason = (request) => {
  const declineReasons = [
    `Critical project deadline (${request.requesterDepartment} project) falls during the requested period.`,
    `Department will be understaffed (below ${Math.floor(Math.random() * 20) + 50}% capacity) if this request is approved.`,
    `Multiple team members have already been approved for time off during this period (${Math.floor(Math.random() * 3) + 2} people).`,
    `Request was submitted with less than ${Math.floor(Math.random() * 5) + 3} days notice for a multi-day absence.`,
    `Employee has limited remaining vacation balance (${Math.floor(Math.random() * 5)} days) and this request exceeds it.`
  ];
  return declineReasons[Math.floor(Math.random() * declineReasons.length)];
};

// Mock data for development - including all statuses
const mockAllRequests = [
  // Pending requests
  {
    id: 'REQ-001',
    requesterName: 'Ahmet Yılmaz',
    requesterDepartment: 'Engineering',
    startDate: '2025-06-15',
    endDate: '2025-06-19',
    duration: 5,
    reason: 'Annual family vacation to Antalya',
    requestedOn: '2025-05-20T09:30:00Z',
    status: 'pending',
    responseDate: null
  },
  {
    id: 'REQ-002',
    requesterName: 'Ayşe Kaya',
    requesterDepartment: 'Marketing',
    startDate: '2025-07-03',
    endDate: '2025-07-03',
    duration: 1,
    reason: 'Medical appointment',
    requestedOn: '2025-05-30T14:22:00Z',
    status: 'pending',
    responseDate: null
  },
  {
    id: 'REQ-003',
    requesterName: 'Mehmet Demir',
    requesterDepartment: 'Sales',
    startDate: '2025-06-10',
    endDate: '2025-06-14',
    duration: 5,
    reason: 'Wedding anniversary trip to Bodrum',
    requestedOn: '2025-05-15T11:45:00Z',
    status: 'pending',
    responseDate: null
  },
  
  // Approved requests
  {
    id: 'REQ-004',
    requesterName: 'Zeynep Şahin',
    requesterDepartment: 'HR',
    startDate: '2025-08-01',
    endDate: '2025-08-15',
    duration: 15,
    reason: 'Summer vacation with family',
    requestedOn: '2025-05-05T08:15:00Z',
    status: 'approved',
    responseDate: '2025-05-07T10:12:00Z',
  },
  {
    id: 'REQ-005',
    requesterName: 'Ali Öztürk',
    requesterDepartment: 'Finance',
    startDate: '2025-09-10',
    endDate: '2025-09-17',
    duration: 8,
    reason: 'Family wedding in Cyprus',
    requestedOn: '2025-05-01T13:45:00Z',
    status: 'approved',
    responseDate: '2025-05-02T09:20:00Z',
  },
  {
    id: 'REQ-006',
    requesterName: 'Deniz Yıldırım',
    requesterDepartment: 'Engineering',
    startDate: '2025-06-05',
    endDate: '2025-06-08',
    duration: 4,
    reason: 'Long weekend getaway to Bodrum',
    requestedOn: '2025-04-25T11:30:00Z',
    status: 'approved',
    responseDate: '2025-04-26T14:15:00Z',
  },
  
  // Rejected requests
  {
    id: 'REQ-007',
    requesterName: 'Can Özkan',
    requesterDepartment: 'Engineering',
    startDate: '2025-06-01',
    endDate: '2025-06-10',
    duration: 10,
    reason: 'Extended family trip',
    requestedOn: '2025-05-29T16:10:00Z', // Very short notice
    status: 'rejected',
    responseDate: '2025-05-30T08:45:00Z',
  },
  {
    id: 'REQ-008',
    requesterName: 'Merve Aksoy',
    requesterDepartment: 'Sales',
    startDate: '2025-07-15',
    endDate: '2025-07-25',
    duration: 11,
    reason: 'Summer vacation',
    requestedOn: '2025-05-20T10:05:00Z',
    status: 'rejected',
    responseDate: '2025-05-22T11:30:00Z',
  }
];

export default AdminDashboard;