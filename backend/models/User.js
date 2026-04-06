const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' }, // for approval workflow
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' } // for members
});

module.exports = mongoose.model('User', UserSchema);