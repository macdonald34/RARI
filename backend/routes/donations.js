const express = require('express');
const router = express.Router();
const { getDonations, createDonation } = require('../controllers/donationsController');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, getDonations);
router.post('/', auth, adminAuth, createDonation);

module.exports = router;