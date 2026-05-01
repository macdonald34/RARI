import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [pendingUsers, setPendingUsers] = useState([]);
  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersRes = await axios.get('http://localhost:5000/api/members', config);
        const donationsRes = await axios.get('http://localhost:5000/api/donations', config);
        const eventsRes = await axios.get('http://localhost:5000/api/events', config);
        const attendanceRes = await axios.get('http://localhost:5000/api/attendance', config);
        const pendingRes = await axios.get('http://localhost:5000/api/auth/pending', config);

        setStats({
          members: membersRes.data.length,
          donations: donationsRes.data.reduce((sum, d) => sum + d.amount, 0),
          events: eventsRes.data.length,
          attendance: attendanceRes.data.length
        });
        setPendingUsers(pendingRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(config);
  }, [config]);

  const approveUser = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/approve/${id}`, {}, config);
      setPendingUsers(pendingUsers.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const rejectUser = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/reject/${id}`, {}, config);
      setPendingUsers(pendingUsers.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Members: {stats.members}</p>
      <p>Total Donations: ${stats.donations}</p>
      <p>Total Events: {stats.events}</p>
      <p>Total Attendance Records: {stats.attendance}</p>

      <h3>Pending User Approvals</h3>
      {pendingUsers.length === 0 ? (
        <p>No pending approvals</p>
      ) : (
        <ul>
          {pendingUsers.map(user => (
            <li key={user._id}>
              {user.memberId?.name} ({user.username})
              <button onClick={() => approveUser(user._id)}>Approve</button>
              <button onClick={() => rejectUser(user._id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;