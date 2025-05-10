import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiAssistActive, setAiAssistActive] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState({});

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  // Fetch all pending requests
  const fetchPendingRequests = async () => {
    setLoading(true);
    try {
      // In a real application, fetch from your API
      // const response = await axios.get('/api/admin/pending-requests');
      // setPendingRequests(response.data);
      
      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 800));
      setPendingRequests(mockPendingRequests);
    } catch (err) {
      console.error('Error fetching pending requests:', err);
      setError('Failed to load pending requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle AI assist button click
  const handleAskAI = async () => {
    setAiProcessing(true);
    setAiAssistActive(true);
    
    try {
      // In a real application, send requests to your AI service
      // const response = await axios.post('/api/ai/analyze-requests', { requests: pendingRequests });
      // setAiSuggestions(response.data.suggestions);
      
      // Mock AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response
      const mockSuggestions = {};
      pendingRequests.forEach(request => {
        const randomDecision = Math.random() > 0.3; // 70% approve, 30% decline
        mockSuggestions[request.id] = {
          recommendation: randomDecision ? 'approve' : 'decline',
          confidence: Math.floor(Math.random() * 30) + 70, // 70-99% confidence
          reasoning: randomDecision 
            ? getRandomApproveReason(request) 
            : getRandomDeclineReason(request)
        };
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

  // Handle request approval
  const handleApprove = async (requestId) => {
    try {
      // In a real application, send approval to your API
      // await axios.post(`/api/admin/requests/${requestId}/approve`);
      
      // Mock successful approval
      console.log(`Approved request ${requestId}`);
      
      // Remove from pending list
      setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Failed to approve request. Please try again.');
    }
  };

  // Handle request rejection
  const handleDecline = async (requestId) => {
    try {
      // In a real application, send rejection to your API
      // await axios.post(`/api/admin/requests/${requestId}/decline`);
      
      // Mock successful decline
      console.log(`Declined request ${requestId}`);
      
      // Remove from pending list
      setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    } catch (err) {
      console.error('Error declining request:', err);
      alert('Failed to decline request. Please try again.');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper for request row class based on AI suggestion
  const getRequestRowClass = (requestId) => {
    if (!aiAssistActive || !aiSuggestions[requestId]) return '';
    
    return aiSuggestions[requestId].recommendation === 'approve' 
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

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Manage pending time off requests</p>
        </div>
        
        <div className="header-actions">
          <button 
            className={`ai-assist-btn ${aiAssistActive ? 'active' : ''} ${aiProcessing ? 'loading' : ''}`}
            onClick={handleAskAI}
            disabled={aiProcessing || pendingRequests.length === 0}
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

      {aiAssistActive && (
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

      <div className="dashboard-content">
        {loading ? (
          <div className="loading-state">
            <span className="large spinner"></span>
            <p>Loading pending requests...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p className="error-message">{error}</p>
            <button 
              className="retry-btn"
              onClick={fetchPendingRequests}
            >
              Retry
            </button>
          </div>
        ) : pendingRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h2>All caught up!</h2>
            <p>There are no pending requests to review.</p>
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
                  <th>Requested On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map(request => (
                  <tr 
                    key={request.id} 
                    className={getRequestRowClass(request.id)}
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

                    {/* Actions */}
                    <td className="actions-cell">
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

                      {/* AI Suggestion Tooltip */}
                      {aiAssistActive && aiSuggestions[request.id] && (
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

// Mock data for development
const mockPendingRequests = [
  {
    id: 'REQ-001',
    requesterName: 'Ahmet Yılmaz',
    requesterDepartment: 'Engineering',
    startDate: '2025-06-15',
    endDate: '2025-06-19',
    duration: 5,
    reason: 'Annual family vacation to Antalya',
    requestedOn: '2025-05-20T09:30:00Z',
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
  },
  {
    id: 'REQ-004',
    requesterName: 'Zeynep Şahin',
    requesterDepartment: 'HR',
    startDate: '2025-08-01',
    endDate: '2025-08-15',
    duration: 15,
    reason: 'Summer vacation with family',
    requestedOn: '2025-05-05T08:15:00Z',
  },
  {
    id: 'REQ-005',
    requesterName: 'Can Özkan',
    requesterDepartment: 'Engineering',
    startDate: '2025-06-05',
    endDate: '2025-06-05',
    duration: 1,
    reason: 'Personal matter',
    requestedOn: '2025-06-01T16:10:00Z',
  },
  {
    id: 'REQ-006',
    requesterName: 'Elif Yıldız',
    requesterDepartment: 'Finance',
    startDate: '2025-07-20',
    endDate: '2025-07-24',
    duration: 5,
    reason: 'Family event in İzmir',
    requestedOn: '2025-05-25T09:00:00Z',
  }
];

export default AdminDashboard;