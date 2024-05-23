const express = require('express');
const router = express.Router();
const { getTickets, createTickets, getTicket, updateTicket, deleteTicket } = require('../controller/ticketController');

const { protect } = require('../middleware/authMiddleware');
router.route('/').get(protect, getTickets).post(protect, createTickets);
router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket);

module.exports = router;