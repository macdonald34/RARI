const express = require('express');
const router = express.Router();
const { getMembers, getMember, createMember, updateMember, deleteMember } = require('../controllers/membersController');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, getMembers);
router.get('/:id', auth, getMember);
router.post('/', auth, adminAuth, createMember);
router.put('/:id', auth, adminAuth, updateMember);
router.delete('/:id', auth, adminAuth, deleteMember);

module.exports = router;