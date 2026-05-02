const express = require('express');
const router = express.Router();
const { getDonations, createDonation, updateDonation, deleteDonation } = require('../controllers/donationsController');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, getDonations);
router.post('/', auth, createDonation);
router.put('/:id', auth, adminAuth, updateDonation);
router.delete('/:id', auth, adminAuth, deleteDonation);

module.exports = router;
