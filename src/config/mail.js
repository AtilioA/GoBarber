require('dotenv/config');
console.log(process.env);
export default {
  host: process.env.MAIL_HOST,
  secureConnection: false,
  port: process.env.MAIL_PORT,
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  default: {
    from: process.env.MAIL_FROM,
  },
};
