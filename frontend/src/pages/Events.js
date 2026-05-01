import React, { useEffect, useState, useMemo } from 'react'; // Add useMemo
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', location: '', description: '' });
  const token = localStorage.getItem('token');
  
  // Wrap config in useMemo to prevent recreation on every render
  const config = useMemo(() => ({ 
    headers: { 'x-auth-token': token } 
  }), [token]); // Recreate only when token changes

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events', config);
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, [config]); // Now this won't cause infinite re-renders

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', form, config);
      const res = await axios.get('http://localhost:5000/api/events', config);
      setEvents(res.data);
      setForm({ title: '', date: '', location: '', description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Events</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map(e => <li key={e._id}>{e.title} - {new Date(e.date).toLocaleDateString()} - {e.location}</li>)}
      </ul>
    </div>
  );
};

export default Events;