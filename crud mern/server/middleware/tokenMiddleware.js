const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const secretToken = crypto.randomBytes(32).toString('hex');

const generateToken = (id) => {
    return jwt.sign({ id }, secretToken)
}

module.exports = generateToken;
