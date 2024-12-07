const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.cookies.authToken; 

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'Abhay');
        req.user = decoded;  
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = authenticate;
