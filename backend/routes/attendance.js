const express = require('express');
const router = express.Router();
const { getAttendance, markAttendance } = require('../controllers/attendanceController');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, getAttendance);
router.post('/', auth, adminAuth, markAttendance);

module.exports = router;