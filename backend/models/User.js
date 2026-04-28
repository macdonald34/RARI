const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' }
});

module.exports = mongoose.model('User', UserSchema);