const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");

const User = sequelize.define(
  "User",
  {
    customer_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    contact_number: DataTypes.STRING,
    address: DataTypes.TEXT,
    account_type: DataTypes.STRING,
    created_at: DataTypes.DATE,
  },
  {
    tableName: "users", // Specify the table name here
    timestamps: false,
  }
);

module.exports = User;
