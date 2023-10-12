const express = require('express');
const router = express.Router({ mergeParams: true });
const { getNotes, addNote } = require('../controllers/noteController.jsx');

const { protect } = require('../middleware/authMiddleware.jsx');

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router;

// The way the route will be formatted  =>  /api/tickets/:ticketId/notes