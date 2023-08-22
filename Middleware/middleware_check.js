// Middleware/middleware_check.js
const studentMiddleware = (req, res, next) => {
    // Check student-specific authentication
    if (!req.isAuthenticated) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // If authenticated, proceed to the next middleware or function
    next();
  };
  
  const deanMiddleware = (req, res, next) => {
    // Check dean-specific authentication
    if (!req.isAuthenticated) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // If authenticated, proceed to the next middleware or function
    next();
  };
  
  module.exports = { studentMiddleware, deanMiddleware };
  