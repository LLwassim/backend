const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
require("dotenv").config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: "mysql",
  logging: (query) => {
    console.log(query);
  },
  define: {
    timestamps: false, // Disable timestamps for all models
  },
  database: process.env.DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  pool: pool, // Use the MySQL connection pool
});

// Export the Sequelize instance to be used by other parts of your application
module.exports = sequelize;
