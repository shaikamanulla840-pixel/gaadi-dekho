const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, 'jwtSecret'); // In a real app, use a secret from environment variables
        req.user = decoded.user;

        // Check for dealer or admin role
        if (req.user.role !== 'dealer' && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Dealer or admin role required.' });
        }

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
