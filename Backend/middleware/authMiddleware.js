const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../model/userModel');

// protected Routes function
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log(req.headers.authorization);

    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log(token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      // If there is no user
      if (!req.user) {
        res.status(401);
        throw new Error('Not authirised');
      }

      next();

    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

module.exports = { protect };
