require('dotenv').config();

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

module.exports = {
  PORT, DB_ADDRESS,
};
