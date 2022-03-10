require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = (req, requireAuth = true) => {
    const header = req.req.headers.authorization;

    if(header) {
        const token = header.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decodedToken;
    };

    if(requireAuth) {
        throw new Error('Login in to access resource');
    };

    return null;
};

module.exports = { authenticate };

