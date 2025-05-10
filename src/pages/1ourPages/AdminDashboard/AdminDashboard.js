import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '../../../services/ApiConstants';
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
  const [usingDummyData, setUsingDummyData] = useState(false);
  
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

  // Properly parse date strings in various formats
  const parseDate = (dateString) => {
    if (!dateString) return null;
    
    // Check if it's already a Date object
    if (dateString instanceof Date) return dateString;
    
    // If it's in dd.mm.yyyy format, convert to yyyy-mm-dd for proper parsing
    const ddmmyyyyRegex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
    const ddmmyyyyMatch = dateString.match(ddmmyyyyRegex);
    
    if (ddmmyyyyMatch) {
      // Convert dd.mm.yyyy to yyyy-mm-dd for proper parsing
      const [_, day, month, year] = ddmmyyyyMatch;
      return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`);
    }
    
    // Try to parse as ISO or other standard formats
    const date = new Date(dateString);
    
    // Check if date is valid
    return isNaN(date.getTime()) ? null : date;
  };

  // Generate dummy data for demo/fallback
  const generateDummyRequests = () => {
    // Create dates within last 30 days for requests
    const getRandomDate = (daysAgo = 30) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
      return date.toISOString();
    };
    
    // Generate future date for time off periods
    const getFutureDate = (daysFromNow = 30) => {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * daysFromNow) + 7); // At least 7 days from now
      return date.toISOString();
    };
    
    // Generate duration between 1-14 days
    const getRandomDuration = () => Math.floor(Math.random() * 14) + 1;
    
    // Create end date based on start date and duration
    const getEndDate = (startDate, duration) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + duration - 1); // -1 because the start day counts
      return date.toISOString();
    };
    
    // Dummy user info
    const users = [
      { id: '1', name: 'Ahmet Yılmaz', department: 'Engineering' },
      { id: '2', name: 'Ayşe Kaya', department: 'Customer Support' },
      { id: '3', name: 'Mehmet Demir', department: 'Marketing' },
      { id: '4', name: 'Zeynep Çelik', department: 'Finance' },
      { id: '5', name: 'Can Öztürk', department: 'Product' },
      { id: '6', name: 'Elif Şahin', department: 'Engineering' },
      { id: '7', name: 'Burak Yıldız', department: 'Human Resources' }
    ];
    
    // Time off reasons
    const reasons = [
      'Annual leave',
      'Family emergency',
      'Doctor appointment',
      'Personal time',
      'Wedding',
      'Home renovation',
      'Moving to new apartment'
    ];
    
    // Generate random status
    const getRandomStatus = () => {
      const statuses = ['pending', 'approved', 'rejected'];
      const weights = [0.6, 0.3, 0.1]; // 60% pending, 30% approved, 10% rejected
      const random = Math.random();
      
      let sum = 0;
      for (let i = 0; i < statuses.length; i++) {
        sum += weights[i];
        if (random < sum) return statuses[i];
      }
      return 'pending';
    };
    
    // Generate 15-20 requests
    const count = Math.floor(Math.random() * 6) + 15;
    const dummyRequests = [];
    
    for (let i = 0; i < count; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const requestDate = getRandomDate(30);
      const duration = getRandomDuration();
      const startDate = getFutureDate(60);
      const endDate = getEndDate(startDate, duration);
      const status = getRandomStatus();
      
      dummyRequests.push({
        id: `dummy-${i + 1}`,
        userId: user.id,
        requesterName: user.name,
        requesterDepartment: user.department,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        requestedOn: requestDate,
        status: status,
        responseDate: status !== 'pending' ? getRandomDate(15) : null
      });
    }
    
    return dummyRequests;
  };

  // Fetch all requests (pending, approved, rejected)
  const fetchAllRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get access token from cookies
      const accessToken = Cookies.get('access_token');
      
      if (!accessToken) {
        throw new Error('Authentication token not found. Please login again.');
      }

      // Make API call with token in header
      const response = await axios.get(
        `${baseURL}/requested-day-of-permission/all`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if response is successful and contains data
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        console.log('Admin dashboard requests:', response.data);
        
        const formattedRequests = response.data.data.map(req => {
          // Extract user information safely
          const userId = req.userId || req.user?.id || null;
          const firstName = req.user?.firstName || '';
          const lastName = req.user?.lastName || '';
          const requesterName = firstName || lastName ? 
            `${firstName} ${lastName}`.trim() : 
            'Unknown User';
          
          // Parse dates correctly
          const startDate = parseDate(req.from) || new Date();
          const endDate = parseDate(req.to) || new Date(startDate.getTime() + 24*60*60*1000);
          const requestedOn = parseDate(req.requestedOn) || new Date();
          const responseDate = req.responseDate ? parseDate(req.responseDate) : null;
          
          return {
            id: req.id,
            userId: userId,
            requesterName: requesterName,
            requesterDepartment: req.user?.department || 'Unknown Department',
            startDate: startDate,
            endDate: endDate,
            duration: calculateDuration(startDate, endDate),
            reason: req.reason || 'No reason provided',
            requestedOn: requestedOn,
            status: mapApiStatus(req.permissionStatus),
            responseDate: responseDate
          };
        });
        
        setRequests(formattedRequests);
        setFilteredRequests(formattedRequests.filter(req => 
          statusFilter === 'all' ? true : req.status === statusFilter
        ));
        setUsingDummyData(false);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching admin requests:', err);
      
      // Use dummy data as fallback
      const dummyData = generateDummyRequests();
      setRequests(dummyData);
      setFilteredRequests(dummyData.filter(req => 
        statusFilter === 'all' ? true : req.status === statusFilter
      ));
      setUsingDummyData(true);
      
      if (err.response && err.response.status === 401) {
        setError('Your session has expired. Please login again. Using dummy data for demo.');
      } else {
        setError('Failed to load from server. Using dummy data for demo purposes.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to map API status values to our internal status values
  const mapApiStatus = (apiStatus) => {
    switch(apiStatus) {
      case 'APPROVE': return 'approved';
      case 'DENY': return 'rejected';
      case 'PENDING': return 'pending';
      default: return 'pending';
    }
  };

  // Calculate duration between dates
  const calculateDuration = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 0;
    
    // Make sure we're working with Date objects
    const start = fromDate instanceof Date ? fromDate : parseDate(fromDate);
    const end = toDate instanceof Date ? toDate : parseDate(toDate);
    
    if (!start || !end) return 0;
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include start date
    return diffDays;
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
      // Get access token from cookies
      const accessToken = Cookies.get('access_token');
      
      if (!accessToken) {
        throw new Error('Authentication token not found');
      }

      // Get pending requests for AI analysis
      const pendingRequests = requests.filter(req => req.status === 'pending');
      
      if (pendingRequests.length === 0) {
        throw new Error('No pending requests to analyze');
      }
      
      // Make API call to AI endpoint
      const response = await axios.post(
        `${baseURL}/ai/analyze-request`, 
        { requests: pendingRequests.map(req => ({ id: req.id, userId: req.userId })) },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Process the AI response and update suggestions
      if (Array.isArray(response.data)) {
        const suggestions = {};
        
        response.data.forEach(suggestion => {
          // Find the request by user ID - ensure string comparison
          const matchedRequest = requests.find(req => 
            String(req.userId) === String(suggestion.kullanici_id)
          );
          
          if (matchedRequest) {
            suggestions[matchedRequest.id] = {
              // Check specifically for "onaylandı" - any other value (including "red") means decline
              recommendation: suggestion.izin_durumu === "onaylandı" ? 'approve' : 'decline',
              description: suggestion.aciklama,
              alternativeDate: suggestion.alternatif_tarih,
              reasons: [
                suggestion.neden_1,
                suggestion.neden_2
              ].filter(Boolean), // Remove any null/undefined reasons
              confidence: 85
            };
          }
        });
        
        setAiSuggestions(suggestions);
      } else {
        throw new Error('Invalid AI response format');
      }
    } catch (err) {
      console.error('Error getting AI suggestions:', err);
      
      // Generate dummy AI suggestions for all pending requests
      const dummyAiSuggestions = generateDummyAiSuggestions();
      setAiSuggestions(dummyAiSuggestions);
      
      // Only show alert if it's not just because there are no pending requests
      if (err.message !== 'No pending requests to analyze') {
        console.log('Using dummy AI suggestions for demo');
      }
    } finally {
      setAiProcessing(false);
    }
  };
  
  // Generate dummy AI suggestions for demo/fallback
  const generateDummyAiSuggestions = () => {
    const pendingRequests = requests.filter(req => req.status === 'pending');
    const suggestions = {};
    
    const approveReasons = [
      'Deneyimi yüksek',
      'Tarih esnekliği var',
      'Pozisyon ve departman kotası uygun',
      'Departman kapasitesi yeterli',
      'Kritik proje sürecinde değil',
      'Yerine vekalet edecek personel mevcut'
    ];
    
    const declineReasons = [
      'Pozisyon kotası dolu',
      'Departman kapasitesi kritik seviyede',
      'Kritik proje sürecinde',
      'Tarih esnekliği yok ve acil durum belirtilmemiş',
      'Acil durum izinleri için kontenjan tutulmalı',
      'Yerine vekalet edecek personel bulunamadı'
    ];
    
    const approveDescriptions = [
      'Yüksek deneyime ve tarih değişikliği yapamama durumuna sahip. Departman ve pozisyon kotası aşılmıyor.',
      'Departman ve pozisyon kotasında boşluk var. Deneyimi ortalama düzeyde ve tarih esnekliği olduğu için kabul edildi.',
      'Departman kapasitesi yüksek, kritik projelerde yer almıyor. İzin onaylanabilir.'
    ];
    
    const declineDescriptions = [
      'Pozisyon kotası 2 kişi ile dolmuş durumda. Yaz kotasında 5 gün izin istenmiş ve tarih esnekliği yok. Sağlık gibi acil durum da belirtilmemiş.',
      'Departman kapasitesi düşük, yerine vekalet edecek personel yok. İzin ertelenebilir.',
      'Kritik proje takvimi nedeniyle departman kapasitesi korunmalı, alternatif tarih önerildi.'
    ];
    
    // Generate alternative date range (e.g. "19.08.2024-23.08.2024")
    const getAltDateRange = () => {
      // Generate start date 1-3 weeks in the future
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 7 + Math.floor(Math.random() * 14));
      
      // Generate end date 3-7 days later
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 3 + Math.floor(Math.random() * 5));
      
      // Format as dd.mm.yyyy-dd.mm.yyyy
      const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      };
      
      return `${formatDate(startDate)}-${formatDate(endDate)}`;
    };
    
    pendingRequests.forEach(request => {
      // 70% chance of approval recommendation
      const isApprove = Math.random() > 0.3;
      
      suggestions[request.id] = {
        recommendation: isApprove ? 'approve' : 'decline',
        description: isApprove 
          ? approveDescriptions[Math.floor(Math.random() * approveDescriptions.length)]
          : declineDescriptions[Math.floor(Math.random() * declineDescriptions.length)],
        alternativeDate: isApprove ? null : getAltDateRange(),
        reasons: [
          isApprove 
            ? approveReasons[Math.floor(Math.random() * approveReasons.length)]
            : declineReasons[Math.floor(Math.random() * declineReasons.length)],
          isApprove
            ? approveReasons[Math.floor(Math.random() * approveReasons.length)]
            : declineReasons[Math.floor(Math.random() * declineReasons.length)]
        ].filter(Boolean), // Remove any null/undefined reasons
      };
    });
    
    return suggestions;
  };
  
  // Format alternative date to dd.mm.yyyy
  const formatAltDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
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
          ? { ...req, status: 'approved', responseDate: new Date() } 
          : req
      );
      setRequests(updatedRequests);
      
      // If using dummy data, don't try to call the API
      if (usingDummyData) {
        const timeout = setTimeout(() => {
          setRecentAction(null);
          console.log('Using dummy data - approval action would be sent to API');
        }, 5000);
        setUndoTimeout(timeout);
        return;
      }
      
      // Set timeout for undo window (5 seconds)
      const timeout = setTimeout(async () => {
        setRecentAction(null);
        
        // Get access token
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
          alert('Authentication token not found. Please login again.');
          return;
        }
        
        // Send approval to API after undo window
        try {
          await axios.post(
            `${baseURL}/requested-day-of-permission/${requestId}/approve`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(`Approval confirmed for request ${requestId}`);
        } catch (apiErr) {
          console.error('Error approving request with API:', apiErr);
          alert('Failed to update request status on the server. The UI has been updated but server synchronization failed.');
        }
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
          ? { ...req, status: 'rejected', responseDate: new Date() } 
          : req
      );
      setRequests(updatedRequests);
      
      // If using dummy data, don't try to call the API
      if (usingDummyData) {
        const timeout = setTimeout(() => {
          setRecentAction(null);
          console.log('Using dummy data - decline action would be sent to API');
        }, 5000);
        setUndoTimeout(timeout);
        return;
      }
      
      // Set timeout for undo window (5 seconds)
      const timeout = setTimeout(async () => {
        setRecentAction(null);
        
        // Get access token
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
          alert('Authentication token not found. Please login again.');
          return;
        }
        
        // Send rejection to API after undo window
        try {
          await axios.post(
            `${baseURL}/requested-day-of-permission/${requestId}/deny`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(`Rejection confirmed for request ${requestId}`);
        } catch (apiErr) {
          console.error('Error declining request with API:', apiErr);
          alert('Failed to update request status on the server. The UI has been updated but server synchronization failed.');
        }
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
    if (!dateString) return 'Unknown';
    
    // If it's already a Date object, use it directly
    const date = dateString instanceof Date ? dateString : parseDate(dateString);
    
    // If we couldn't parse the date, show original
    if (!date) return String(dateString);
    
    // Format with options
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
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
      {usingDummyData && (
        <div className="dummy-data-alert">
          <span className="alert-icon">⚠️</span>
          <span>Using dummy data for demonstration purposes. Backend connection failed or unavailable.</span>
        </div>
      )}
      
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

                      {/* AI Suggestion Tooltip - Updated for the new format */}
                      {aiAssistActive && aiSuggestions[request.id] && request.status === 'pending' && (
                        <div className="ai-suggestion-tooltip">
                          <div className="tooltip-header">
                            <span>AI Recommendation: <strong>
                              {aiSuggestions[request.id].recommendation === 'approve' ? 'Approve' : 'Decline'}
                            </strong></span>
                            {aiSuggestions[request.id].confidence && (
                              <span className="confidence">
                                Confidence: {getConfidenceLabel(aiSuggestions[request.id].confidence)} 
                                ({aiSuggestions[request.id].confidence}%)
                              </span>
                            )}
                          </div>
                          <div className="tooltip-content">
                            {/* Detailed description */}
                            <div className="reason-label">Analysis:</div>
                            <p>{aiSuggestions[request.id].description}</p>
                            
                            {/* Alternative date range if available */}
                            {aiSuggestions[request.id].alternativeDate && (
                              <div className="alternative-date">
                                <strong>Alternative date range:</strong> {aiSuggestions[request.id].alternativeDate}
                              </div>
                            )}
                            
                            {/* Reasons list */}
                            <div className="reasons-list">
                              <div className="reason-label">Key factors:</div>
                              <ul>
                                {aiSuggestions[request.id].reasons && aiSuggestions[request.id].reasons.map((reason, idx) => (
                                  <li key={idx}>{reason}</li>
                                ))}
                              </ul>
                            </div>
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

export default AdminDashboard;