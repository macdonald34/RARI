// memberController.js - Alternative export pattern
const Member = require('../models/Member');

const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createMember = async (req, res) => {
  const { name, phone, email, gender, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ msg: 'Name and email are required' });
  }
  
  try {
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ msg: 'Member with this email already exists' });
    }
    
    const member = new Member({ name, phone, email, gender, role });
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json({ msg: 'Member deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { 
  getMembers, 
  getMember, 
  createMember, 
  updateMember, 
  deleteMember 
};