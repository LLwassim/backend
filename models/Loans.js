const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Import your Sequelize instance
const User = require("./User"); // Import your User model

const Loans = sequelize.define(
  "Loans",
  {
    loan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "customer_id",
      },
    },
    loan_type: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    interest_rate: {
      type: DataTypes.DECIMAL(10, 2),
    },
    term: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    date_applied: {
      type: DataTypes.DATE,
    },
    date_approved: {
      type: DataTypes.DATE,
    },
    date_paid: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Loans", // Specify the table name here
    timestamps: false,
  }
);

// Define the association between Loans and User (one-to-many)
Loans.belongsTo(User, { foreignKey: "customer_id" });
User.hasMany(Loans, { foreignKey: "customer_id" });

module.exports = Loans;
