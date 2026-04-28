const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const memberController = require('../controllers/memberController');

// Debug: Check if controller functions exist
console.log('Member controller functions:', Object.keys(memberController));

// Public routes (if any)
// router.get('/public', ...);

// Protected routes - all member routes require authentication
router.get('/', auth, memberController.getMembers);
router.get('/:id', auth, memberController.getMember);
router.post('/', auth, adminAuth, memberController.createMember); // Only admin can create
router.put('/:id', auth, adminAuth, memberController.updateMember); // Only admin can update
router.delete('/:id', auth, adminAuth, memberController.deleteMember); // Only admin can delete

module.exports = router;