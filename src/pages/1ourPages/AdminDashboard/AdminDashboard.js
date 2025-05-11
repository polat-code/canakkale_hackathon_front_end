import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '../../../services/ApiConstants';
import './AdminDashboard.css';
import AdminNavbar from '../../../components/common/AdminNavbar/AdminNavbar';

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

  // Format alternative date ranges from AI recommendations
  const formatAlternativeDateRange = (dateRange) => {
    if (!dateRange) return null;

    // If it's already in the format we want (dd.mm.yyyy-dd.mm.yyyy), return it
    const dateRangeRegex = /^\d{1,2}\.\d{1,2}\.\d{4}-\d{1,2}\.\d{1,2}\.\d{4}$/;
    if (dateRangeRegex.test(dateRange)) {
      return dateRange;
    }

    // Try to handle other formats
    try {
      // If it contains a hyphen, assume it's a date range
      if (dateRange.includes('-')) {
        const [startStr, endStr] = dateRange.split('-');
        const startDate = parseDate(startStr.trim());
        const endDate = parseDate(endStr.trim());
        
        if (startDate && endDate) {
          const formatToDisplay = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
          };
          
          return `${formatToDisplay(startDate)}-${formatToDisplay(endDate)}`;
        }
      }
      
      return dateRange; // Return as is if we can't parse it
    } catch (err) {
      console.error('Error formatting alternative date range:', err);
      return dateRange; // Return original string if parsing fails
    }
  };

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
        
        const formattedRequests = response.data.data.map(req => {
          // Extract user information safely with improved handling
          const userId = req.userId || (req.user && req.user.id) || null;
          
          
          
          // Parse dates correctly
          const startDate = parseDate(req.from) || new Date();
          const endDate = parseDate(req.to) || new Date(startDate.getTime() + 24*60*60*1000);
          const requestedOn = parseDate(req.requestedOn) || new Date();
          const responseDate = req.responseDate ? parseDate(req.responseDate) : null;
          console.log(response.data)
          return {
            id: req.id,
            userId: userId,
            requesterName: req.userName || req.fullName || 'Unknown User',
            requesterDepartment: req.user?.department || req.department || 'Unknown Department',
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
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching admin requests:', err);
      setRequests([]);
      setFilteredRequests([]);
      
      if (err.response && err.response.status === 401) {
        setError('Your session has expired. Please login again.');
      } else {
        setError('Failed to load requests from server.');
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

  function getDayDifference(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
}

 const OFFICIAL_HOLIDAYS = [
  '2024-01-01',
  '2024-04-23',
  '2024-05-01',
  '2024-05-19',
  '2024-07-15',
  '2024-08-30',
  '2024-10-29',
  '2025-01-01'
].map(d => new Date(d));

const FORBIDDEN_PERIODS = [
  { start: new Date('2024-06-18'), end: new Date('2024-07-02') },
  { start: new Date('2024-09-08'), end: new Date('2024-09-22') },
  { start: new Date('2024-12-03'), end: new Date('2024-12-17') }
];

const PERFORMANCE_WINDOW = { start: new Date('2024-12-01'), end: new Date('2025-01-15') };
const SUMMER_WINDOW = { start: new Date('2024-06-01'), end: new Date('2024-08-31') };
const SUMMER_MAX_DAYS = 6;

function isWeekend(date) {
  return date.getDay() === 0; // Sunday
}
function isHoliday(date) {
  return OFFICIAL_HOLIDAYS.some(h => 
    h.getFullYear() === date.getFullYear() &&
    h.getMonth() === date.getMonth() &&
    h.getDate() === date.getDate()
  );
}
function overlapsPeriod(reqStart, reqEnd, { start, end }) {
  return reqStart <= end && reqEnd >= start;
}
function extendBridgeDays(start, end) {
  // if exactly one single working day between holiday and weekend, extend by 1
  // e.g. if end is a working day and next day is holiday, or ...
  let next = new Date(end);
  next.setDate(next.getDate() + 1);
  if (isHoliday(next) && !isWeekend(end) && (end - start) / (1000*60*60*24) < 2) {
    // extend end by one
    return new Date(end.setDate(end.getDate() + 1));
  }
  return end;
}

const handleAskAI = async () => {
  setAiProcessing(true);
  setAiAssistActive(true);

  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) throw new Error('Authentication token not found');

    // 1) get only pending
    const pending = requests.filter(r => r.status === 'pending');
    if (pending.length === 0) throw new Error('No pending requests to analyze');

    // 2) prepare each request
    const requestData = pending.map(req => {
      const start = new Date(req.startDate);
      const rawEnd = new Date(req.endDate);
      const bridgedEnd = extendBridgeDays(start, rawEnd);
      const duration = getDayDifference(formatDate(start), formatDate(bridgedEnd));

      // detect birthday leave
      const isBirthdayLeave = /doğum günü/i.test(req.reason);

      return {
        id: req.id,
        userId: req.userId,
        name: req.fullName,
        position: req.position,
        department: req.requesterDepartment,
        startDate: formatDate(start),
        endDate: formatDate(bridgedEnd),
        duration,
        reason: req.reason,
        isEmergency: /acil durum/i.test(req.reason),
        isBirthdayLeave,
        summerUsedDays: req.summerUsedDays || 0,            // you must supply this
        deptSize: req.departmentSize,                      // total headcount
        deptOnLeave: req.currentOnLeaveCount,              // concurrent on leave
        maxAllowed: req.maxAllowed
      };
    });

    // 3) build prompt with new rules
    const rules = `
1. **Resmi tatiller** ve **Pazar** günleri izin günleri arasına katılamaz. 
2. Resmi tatil ile hafta sonu arasında tek gün ara bırakan izinler +1 gün **otomatik** uzatılır.
3. Aşağıdaki “izin yasaklı” dönemlere denk gelen başvurular **reddedilir**:
   - 18.06.2024–02.07.2024  
   - 08.09.2024–22.09.2024  
   - 03.12.2024–17.12.2024  
4. Performans değerlendirme dönemi **01.12.2024–15.01.2025** içindeki başvurular **acil olmadıkça** reddedilir.
5. Aynı departmanda eşzamanlı izinli sayısı **%20**’yi geçemez.
6. **Yaz kotası** (01.06–31.08.2024): bir çalışanın maksimum **${SUMMER_MAX_DAYS} gün** kullanımı.  
   - Geçen kullanım: **\${summerUsedDays}**  
7. Doğum günü izni, **en fazla 1 gün** olabilir.
`;

    const prompt = `
## Girdi Değişkenleri (her satır separate request)

${requestData.map(r => `- **kullanici_id:** ${r.id}
  - userId: ${r.userId}
  - pozisyon: ${r.position}
  - departman: ${r.department}
  - izin_tarihi: ${r.startDate}–${r.endDate}
  - sure (gün): ${r.duration}
  - neden: ${r.reason}
  - acil_durum: ${r.isEmergency ? 'Evet' : 'Hayır'}
  - dogum_gunu_izni: ${r.isBirthdayLeave ? 'Evet' : 'Hayır'}
  - yazi_kotasi_gun: ${r.summerUsedDays}
  - departman_buyuklugu: ${r.deptSize}
  - su_an_izinli: ${r.deptOnLeave}
`).join('\n')}

---

## Kurallar

${rules}

---

## Çıktı Formatı (JSON Array)

Her istek icin:
[
{
  "kullanici_id": "1",
  "izin_durumu": "onaylandı" | "red",
  "aciklama": "Karar gerekçesi",
  "alternatif_tarih": "DD-MM-YYYY–DD-MM-YYYY" | null
}
]

## Çıktı Örneği
[
  {
    "kullanici_id": "1",
    "izin_durumu": "onaylandı",
    "aciklama": "Yaz kotası doldu, acil durum değil.",
    "alternatif_tarih": 18-06-2024–20-06-2024
  },
  {
    "kullanici_id": "2",
    "izin_durumu": "red",
    "aciklama": "Doğum günü izni, sadece 1 gün kullanılabilir.",
    "alternatif_tarih": "20-06-2024–20-06-2024"
  }
]

`;

    // 4) send to AI
        const { data } = await axios.post(
      'http://localhost:3131/openai',
      { prompt }, // This is the correct format - object with prompt property
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
let aiResults;
if (data.choices && data.choices[0]) {
  // Extract content based on API version
  const content = data.choices[0].text || // Old completions API
                (data.choices[0].message && data.choices[0].message.content); // New chat API
  
  if (!content) {
    throw new Error('Could not extract content from AI response');
  }
  
  console.log('Full AI response:', content); // Log full response for debugging
  
  // Try multiple approaches to extract JSON
  try {
    // First attempt: direct JSON parsing
    try {
      aiResults = JSON.parse(content);
    } catch (directParseError) {
      // Second attempt: Clean and try to extract JSON using regex
      console.log('Direct parsing failed, trying regex extraction');
      
      // Clean common issues - remove markdown code blocks, fix quotes
      const cleanedContent = content
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      
      // Try to find any JSON array or object
      const jsonMatch = cleanedContent.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
      if (jsonMatch) {
        try {
          aiResults = JSON.parse(jsonMatch[0]);
        } catch (parseErr) {
          throw new Error('Found JSON-like content but couldn\'t parse it');
        }
      } else {
        throw new Error('No valid JSON pattern found in response');
      }
    }
  } catch (jsonError) {
    console.error('Failed to parse JSON:', jsonError);
    console.log('Raw content:', content);
    throw new Error('Could not parse AI response as JSON');
  }
} else {
  throw new Error('Invalid AI response structure');
}

// Ensure we have an array of results
if (!Array.isArray(aiResults)) {
  // If we got a single object, convert to array
  aiResults = [aiResults];
}

// Map AI results to state
const suggestions = {};
aiResults.forEach(s => {
  suggestions[s.kullanici_id] = {
    recommendation: s.izin_durumu === 'onaylandı' ? 'approve' : 'decline',
    description: s.aciklama,
    alternativeDate: s.alternatif_tarih,
  };
});

setAiSuggestions(suggestions);

  } catch (err) {
    console.error('Error getting AI suggestions:', err);
    setAiAssistActive(false);
    alert('Failed to get AI recommendations: ' + err.message);
  } finally {
    setAiProcessing(false);
  }
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
            `${baseURL}/requested-day-of-permission/behave`,
            {
              requestedDayOfPermissionId: requestId,
              status: 'ALLOWED'
            },
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
            `${baseURL}/requested-day-of-permission/behave`,
            {
              requestedDayOfPermissionId: requestId,
              status: 'DENY'
            },
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

  // Get count of requests by status
  const getStatusCount = (status) => {
    return requests.filter(req => req.status === status).length;
  };

  return (
    <div className="admin-dashboard">
     <AdminNavbar />
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
                          {request.requesterName && request.requesterName.charAt(0).toUpperCase()}
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
                        <div className="request-actions" style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="action-btn approve-btn"
                            onClick={() => handleApprove(request.id)}
                            aria-label="Approve request"
                            style={{ 
                              minWidth: '80px',
                              height: '36px',
                              padding: '0 12px',
                              borderRadius: '4px',
                              boxSizing: 'border-box'
                            }}
                          >
                            Approve
                          </button>
                          <button 
                            className="action-btn decline-btn"
                            onClick={() => handleDecline(request.id)}
                            aria-label="Decline request"
                            style={{ 
                              minWidth: '80px',
                              height: '36px',
                              padding: '0 12px',
                              borderRadius: '4px',
                              boxSizing: 'border-box'
                            }}
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
                          </div>
                          <div className="tooltip-content">
                            {/* Detailed description */}
                            <div className="reason-label">Analysis:</div>
                            <p>{aiSuggestions[request.id].description}</p>
                            
                            {/* Alternative date range if available */}
                            {aiSuggestions[request.id].alternativeDate && (
                              <div className="alternative-date">
                                <strong>Alternative date range:</strong> {formatAlternativeDateRange(aiSuggestions[request.id].alternativeDate)}
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