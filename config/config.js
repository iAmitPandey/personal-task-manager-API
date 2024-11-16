/* eslint-disable no-undef */
import 'dotenv/config.js';

// // Database configuration
export const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DIALECT,
  dbPort: process.env.DB_PORT,
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET,
  tokenExpiration:'1h',
};
