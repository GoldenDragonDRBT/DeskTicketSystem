const asyncHandler = require('express-async-handler')

const User = require('../models/userModel.jsx')
const Ticket = require('../models/ticketModel.jsx')

// Description: Get user tickets
// Route: GET /api/tickets
// Access: Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the "id" in the "JWT"
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

// Description: Get user ticket
// Route: GET /api/tickets/:id
// Access: Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the "id" in the "JWT"
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket)
})

// Description: Create new ticket
// Route: POST /api/tickets
// Access: Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  // Get user using the "id" in the "JWT"
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })

  res.status(201).json(ticket)
})

// Description: Delete ticket
// Route: DELETE /api/tickets/:id
// Access: Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the "id" in the "JWT"
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.deleteOne() // To remove the ticket after request delete 

  res.status(200).json({ success: true })
})

// Description: Update ticket
// Route: PUT /api/tickets/:id
// Access: Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the "id" in the "JWT"
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}

/* Note:
"req.user.id" because when we validate with the "token" (send with the token validation) in other words we sending "req.user" through a "Middleware" function.
As we know that "Middleware" functions are functions that have access to the request object ( req ), the response object ( res ), and the next middleware function in the application's request-response cycle. 
*/