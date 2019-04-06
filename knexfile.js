/**
 * @file knexfile
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

const dotenv = require("dotenv");

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL + '?ssl=true'
};
