const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (payload) => {
  console.log(payload, "heheeh");
  return jwt.sign(payload, JWT_SECRET || "SECRET");
} 