// db.js
const { Pool } = require("pg");

// Tạo pool 
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "order_management",
  password: "123456",
  port: 5432,
});

module.exports = pool;
