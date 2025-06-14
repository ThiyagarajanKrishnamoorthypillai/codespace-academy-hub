import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const StartSession = () => {
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [durationHours, setDurationHours] = useState('');
  const [sessionList, setSessionList] = useState([]);

  const [activeSessionId, setActiveSessionId] = useState(null);
  const [todayDate, setTodayDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [todayHours, setTodayHours] = useState('');

  const courseDurations = {
    C: 30, "C++": 30, "C#": 30, Java: 40, JavaScript: 40,
    Python: 40, "MERN Full Stack Development": 60, "MEAN Full Stack Development": 60,
    "Data Structures": 30, "Web Development": 50, "React Native": 50,
    AI: 50, "Cloud Computing": 50, "Data Base": 35, "Fundamentals of Web Technology": 30
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user/`)
      .then(res => setAllUsers(res.data))
      .catch(err => console.error(err));

    fetchSessions();
  }, []);

  useEffect(() => {
    if (course) {
      const filtered = allUsers.filter(u => u.course === course);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
    setSelectedUsers([]);
  }, [course, allUsers]);

  const fetchSessions = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/session/`)
      .then(res => setSessionList(res.data))
      .catch(err => console.error(err));
  };

  const handleSaveSession = () => {
    if (!course || !batch || selectedUsers.length === 0 || !fromDate || !toDate || !durationHours) {
      alert("Please fill all fields");
      return;
    }

    axios.post(`${import.meta.env.VITE_API_URL}/session/create`, {
      course,
      batch,
      users: selectedUsers,
      fromDate,
      toDate,
      durationHours: parseInt(durationHours)
    }).then(() => {
      alert("Session saved successfully");
      fetchSessions();
      resetForm();
    }).catch(err => {
      console.error(err);
      alert("Failed to save session");
    });
  };

  const resetForm = () => {
    setCourse('');
    setBatch('');
    setFilteredUsers([]);
    setSelectedUsers([]);
    setFromDate('');
    setToDate('');
    setDurationHours('');
  };

  const handleDailySubmit = (session) => {
    const todayMinutesInt = parseInt(todayHours);
    const totalPlannedMinutes = session.durationHours * 60;
    const totalLoggedMinutes = session.datewise.reduce((sum, entry) => sum + entry.todayHour, 0);
    const remainingMinutes = totalPlannedMinutes - totalLoggedMinutes;

    if (todayMinutesInt > remainingMinutes) {
      alert("Today's minutes exceed remaining minutes.");
      return;
    }

    axios.patch(`${import.meta.env.VITE_API_URL}/session/daily-update/${session._id}`, {
      todayHoursMinutes: todayMinutesInt,
      selectedDate: todayDate
    }).then(() => {
      alert("Session updated successfully");
      fetchSessions();
      setActiveSessionId(null);
      setTodayHours('');
    }).catch(err => {
      console.error(err);
      alert("Failed to update session");
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Create New Session</h4>

      <div className="mb-3">
        <label>Select Course</label>
        <select className="form-control" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">-- Select Course --</option>
          {Object.keys(courseDurations).map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Select Batch</label>
        <select className="form-control" value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">-- Select Batch --</option>
          <option value="Batch 1">Batch 1</option>
          <option value="Batch 2">Batch 2</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Select Users</label>
        <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {filteredUsers.map(user => (
            <div key={user._id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={user._id}
                checked={selectedUsers.some(u => u.email === user.email)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUsers(prev => [...prev, { name: user.name, email: user.email }]);
                  } else {
                    setSelectedUsers(prev => prev.filter(u => u.email !== user.email));
                  }
                }}
              />
              <label className="form-check-label" htmlFor={user._id}>
                {user.name} ({user.email})
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label>From Date</label>
        <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>To Date</label>
        <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Duration (hours)</label>
        <input type="number" className="form-control" value={durationHours} onChange={(e) => setDurationHours(e.target.value)} />
      </div>

      <button className="btn btn-success mb-4" onClick={handleSaveSession}>Save Session</button>

      <hr />

      <h5>All Sessions</h5>

      {sessionList.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        sessionList.map(session => {
          const totalPlannedMinutes = session.durationHours * 60;
          const totalLoggedMinutes = session.datewise.reduce((sum, entry) => sum + entry.todayHour, 0);
          const remainingMinutes = totalPlannedMinutes - totalLoggedMinutes;

          return (
            <div key={session._id} className="border p-3 mb-3">
              <p><b>Course:</b> {session.course}</p>
              <p><b>Batch:</b> {session.batch}</p>
              <p><b>Users:</b> {session.users.map(u => `${u.name} (${u.email})`).join(", ")}</p>
              <p><b>Planned Hours:</b> {session.durationHours} hrs</p>
              <p><b>Remaining:</b> {Math.floor(remainingMinutes / 60)} hrs {remainingMinutes % 60} min</p>
              <p><b>Status:</b> {session.status}</p>

              <p><b>Daily Log:</b></p>
              <ul>
                {session.datewise.map((entry, i) => (
                  <li key={i}>{format(new Date(entry.date), 'dd/MM/yyyy')} : {entry.todayHour} min</li>
                ))}
              </ul>

              {activeSessionId === session._id ? (
                <div className="mt-3 border p-3">
                  <div className="mb-2">
                    <label>Select Date</label>
                    <input type="date" className="form-control" value={todayDate}
                      onChange={(e) => setTodayDate(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label>Enter Today's Minutes</label>
                    <input type="number" className="form-control" value={todayHours}
                      onChange={(e) => setTodayHours(e.target.value)} />
                  </div>
                  <button className="btn btn-primary" onClick={() => handleDailySubmit(session)}>
                    Submit Today
                  </button>
                </div>
              ) : (
                <button className="btn btn-warning" onClick={() => setActiveSessionId(session._id)}>
                  Start Session
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default StartSession;
