require('dotenv').config();

const options = {
  host: process.env.DB_HOSTNAME || process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
};

module.exports = {
  development: {
    ...options,
  },
};
