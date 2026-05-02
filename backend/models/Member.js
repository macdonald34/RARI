const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  address: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  membershipDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'visitor'],
    default: 'active'
  },
  role: {
    type: String,
    enum: ['member', 'elder', 'pastor', 'admin'],
    default: 'member'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);