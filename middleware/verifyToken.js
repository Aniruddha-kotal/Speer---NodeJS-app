// middleware/verifyToken.js
const jwt = require('jsonwebtoken');
const secret = "$uperMan@123";

function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }

    req.userId = decoded.userId; // Attach the user ID to the request for further processing

    
    next();
  });
}

module.exports = verifyToken;
