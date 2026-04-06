const Donation = require('../models/Donation');

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('member');
    res.json(donations);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.createDonation = async (req, res) => {
  const { member, amount, type } = req.body;
  try {
    const donation = new Donation({ member, amount, type });
    await donation.save();
    res.json(donation);
  } catch (err) {
    res.status(500).send('Server error');
  }
};