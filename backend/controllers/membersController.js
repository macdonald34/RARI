const Member = require('../models/Member');

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.createMember = async (req, res) => {
  const { name, phone, email, gender, role } = req.body;
  try {
    const member = new Member({ name, phone, email, gender, role });
    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndRemove(req.params.id);
    if (!member) return res.status(404).json({ msg: 'Member not found' });
    res.json({ msg: 'Member deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};