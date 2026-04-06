import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ member: '', event: '', status: 'present' });
  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attendanceRes = await axios.get('http://localhost:5000/api/attendance', config);
        const membersRes = await axios.get('http://localhost:5000/api/members', config);
        const eventsRes = await axios.get('http://localhost:5000/api/events', config);
        setAttendance(attendanceRes.data);
        setMembers(membersRes.data);
        setEvents(eventsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/attendance', form, config);
      const res = await axios.get('http://localhost:5000/api/attendance', config);
      setAttendance(res.data);
      setForm({ member: '', event: '', status: 'present' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit}>
        <select name="member" value={form.member} onChange={handleChange} required>
          <option value="">Select Member</option>
          {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>
        <select name="event" value={form.event} onChange={handleChange} required>
          <option value="">Select Event</option>
          {events.map(e => <option key={e._id} value={e._id}>{e.title}</option>)}
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
        <button type="submit">Mark Attendance</button>
      </form>
      <ul>
        {attendance.map(a => <li key={a._id}>{a.member.name} - {a.event.title} - {a.status}</li>)}
      </ul>
    </div>
  );
};

export default Attendance;