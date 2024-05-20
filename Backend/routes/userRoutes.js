const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controller/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;


// We use routes for cleaning up the server. We can just call the endpoints in the server and we can request post or get from here from the userRoutes. And we can do the login from here or do it in using controller