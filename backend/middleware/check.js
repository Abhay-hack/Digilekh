const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Adjust according to your user model path

const checkforAuthentication = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the JWT token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded token (which includes user ID)
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Attach the user info to the request object
    req.user = {
      userId: user._id,
      username: user.username,  // You can include other fields if necessary
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = { checkforAuthentication };
