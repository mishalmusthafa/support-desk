const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/userController');

router.post('/', registerUser);   
router.post('/login', loginUser);

module.exports = router;


// We use routes for cleaning up the server. We can just call the endpoints in the server and we can request post or get from here from the userRoutes. And we can do the login from here or do it in using controller