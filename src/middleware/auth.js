require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (token) => {
    try {
        if(token) {
            return jwt.verify(token, process.env.SECRET_KEY);
        };
        return "Login in to access resource";
    } catch (error) {
        console.log(error);
    }
};

module.exports = auth;