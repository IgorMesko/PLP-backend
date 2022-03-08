require('dotenv').config();
const jwt = require('jsonwebtoken');

const getUser = token => {
    try {
        if(token) {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        };
        return null;
    } catch (error) {
        return null;
    }
};

module.exports = getUser;

