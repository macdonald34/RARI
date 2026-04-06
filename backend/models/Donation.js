const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['tithe', 'offering', 'donation'], default: 'donation' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);