const jwt = require('jsonwebtoken');

// Remove hardcoded secret and use environment variable
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log(token)

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware; 