require('dotenv/config');

module.exports = {
  jwt_secret: process.env.JWT_SECRET,
  expiresIn: '7d',
};
