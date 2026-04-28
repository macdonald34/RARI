const Member = require('../models/Member');

// Add this line to verify the controller is loaded
console.log('Member controller loaded');

exports.getMembers = async (req, res) => {
  console.log('getMembers function called'); // Debug log
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error('Error in getMembers:', err);
    res.status(500).send('Server error');
  }
};

exports.getMember = async (req, res) => {
  console.log('getMember function called for id:', req.params.id); // Debug log
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error('Error in getMember:', err);
    res.status(500).send('Server error');
  }
};

exports.createMember = async (req, res) => {
  console.log('createMember function called with body:', req.body); // Debug log
  const { name, phone, email, gender, role } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({ msg: 'Name and email are required' });
  }
  
  try {
    // Check if member already exists
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ msg: 'Member with this email already exists' });
    }
    
    const member = new Member({ name, phone, email, gender, role });
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    console.error('Error in createMember:', err);
    res.status(500).send('Server error');
  }
};

exports.updateMember = async (req, res) => {
  console.log('updateMember function called for id:', req.params.id); // Debug log
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error('Error in updateMember:', err);
    res.status(500).send('Server error');
  }
};

exports.deleteMember = async (req, res) => {
  console.log('deleteMember function called for id:', req.params.id); // Debug log
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json({ msg: 'Member deleted' });
  } catch (err) {
    console.error('Error in deleteMember:', err);
    res.status(500).send('Server error');
  }
};

// Also export using module.exports as backup (optional)
module.exports = exports;