const asyncHandler = require('express-async-handler');

const User = require('../models/userModel.js');
const Note = require('../models/noteModel.js');
const Ticket = require('../models/ticketModel.js');

// Description: Get notes for a ticket
// Route: GET /api/tickets/:ticketId/notes
// Access: Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the "id" in the "JWT"
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// Description: Create ticket note
// Route: POST /api/tickets/:ticketId/notes
// Access: Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the "id" in the "JWT"
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
