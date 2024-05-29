const express = require('express');
const router = express.Router({ messageParams: true });
const { getNotes } = require('../controller/noteController');

const { protect } = require('../middleware/authMiddleware');
router.route('/').get(protect, getNotes);

module.exports = router;