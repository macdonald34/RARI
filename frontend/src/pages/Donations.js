import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ member: '', amount: '', type: 'donation' });
  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationsRes = await axios.get('http://localhost:5000/api/donations', config);
        const membersRes = await axios.get('http://localhost:5000/api/members', config);
        setDonations(donationsRes.data);
        setMembers(membersRes.data);
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
      await axios.post('http://localhost:5000/api/donations', form, config);
      const res = await axios.get('http://localhost:5000/api/donations', config);
      setDonations(res.data);
      setForm({ member: '', amount: '', type: 'donation' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Donations</h2>
      <form onSubmit={handleSubmit}>
        <select name="member" value={form.member} onChange={handleChange} required>
          <option value="">Select Member</option>
          {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="donation">Donation</option>
          <option value="tithe">Tithe</option>
          <option value="offering">Offering</option>
        </select>
        <button type="submit">Add Donation</button>
      </form>
      <ul>
        {donations.map(d => <li key={d._id}>{d.member.name} - ${d.amount} - {d.type}</li>)}
      </ul>
    </div>
  );
};

export default Donations;