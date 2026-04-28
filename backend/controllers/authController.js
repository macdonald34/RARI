// controllers/authController.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Member = require('../models/Member');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    if (user.status !== 'approved') return res.status(400).json({ msg: 'Account not approved yet' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) return res.status(500).json({ msg: 'Error signing token' });
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const signup = async (req, res) => {
  const { username, password, name, email, phone } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create member
    const member = new Member({ name, email, phone });
    await member.save();

    // Create user
    user = new User({ username, password, role: 'member', status: 'approved', memberId: member._id });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ msg: 'User approved' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ msg: 'User rejected' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' }).populate('memberId');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const register = async (req, res) => {
  const { username, password, role, memberId } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ username, password, role, memberId });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ msg: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// MAKE SURE ALL FUNCTIONS ARE EXPORTED
module.exports = { 
  login, 
  signup, 
  register, 
  approveUser, 
  rejectUser, 
  getPendingUsers 
};