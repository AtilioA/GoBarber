require('dotenv/config');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: process.env.DEFAULT_NAME,
          email: process.env.DEFAULT_EMAIL,
          hashed_password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD, 8),
          provider: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => { },
};
