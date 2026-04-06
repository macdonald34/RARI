const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  role: { type: String, default: 'member' }, // e.g., pastor, elder, member
  joinDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', MemberSchema);