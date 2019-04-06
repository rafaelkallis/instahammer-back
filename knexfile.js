/**
 * @file knexfile
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

const dotenv = require("dotenv");

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

exports.client = "pg";
exports.connection = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  exports.connection += "?ssl=true";
}
