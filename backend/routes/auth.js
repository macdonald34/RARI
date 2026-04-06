const express = require('express');
const router = express.Router();
const { login, signup, register, approveUser, rejectUser, getPendingUsers } = require('../controllers/authController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/login', login);
router.post('/signup', signup);
router.post('/register', auth, adminAuth, register);
router.get('/pending', auth, adminAuth, getPendingUsers);
router.put('/approve/:id', auth, adminAuth, approveUser);
router.put('/reject/:id', auth, adminAuth, rejectUser);

module.exports = router;