const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const Tickets = require('../model/ticketModal');

// @desc Get user tickets
// @route Get /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user useing id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error('User name not found');
  }

  const tickets = await Tickets.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc Get user ticket
// @route Get /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  
  // Get user useing id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error('User name not found');
  }

  const ticket = await Tickets.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  res.status(200).json(ticket);
});

// @desc delete ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user useing id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error('User name not found');
  }

  const ticket = await Tickets.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await ticket.deleteOne();
  res.status(200).json({ success: true });
});

// @desc update ticket
// @route UPDATE /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user useing id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error('User name not found');
  }

  const ticket = await Tickets.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const updatedTicket = await Tickets.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTicket);
});

// Create Tickets

// @desc Create user tickets
// @route Post /api/tickets
// @access Private
const createTickets = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Tickets.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets, createTickets, getTicket, deleteTicket, updateTicket
};