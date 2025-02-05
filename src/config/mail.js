require('dotenv/config');

export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  // secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  default: {
    from: process.env.MAIL_FROM,
  },
};
