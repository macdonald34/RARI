import React, { useEffect, useState, useMemo } from 'react'; // Add useMemo import
import axios from 'axios';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', gender: '', role: '' });
  const token = localStorage.getItem('token');
  
  // Wrap config in useMemo to prevent recreation on every render
  const config = useMemo(() => ({ 
    headers: { 'x-auth-token': token } 
  }), [token]); // Recreate only when token changes

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members', config);
        setMembers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers(); // Remove config parameter here - it's not needed
  }, [config]); // config is now stable

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/members', form, config);
      const res = await axios.get('http://localhost:5000/api/members', config);
      setMembers(res.data);
      setForm({ name: '', phone: '', email: '', gender: '', role: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Members</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
        <button type="submit">Add Member</button>
      </form>
      <ul>
        {members.map(m => <li key={m._id}>{m.name} - {m.email} - {m.role}</li>)}
      </ul>
    </div>
  );
};

export default Members;