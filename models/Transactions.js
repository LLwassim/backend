const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const Account = require("./Account");

const Transactions = sequelize.define(
  "Transaction",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2), // Assuming 2 decimal places for the amount
      allowNull: false,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Transactions",
    timestamps: false,
  }
);

// Define a foreign key relationship to the accounts table
Transactions.belongsTo(Account, {
  foreignKey: "account_id",
});
Account.hasMany(Transactions, { foreignKey: "account_id" });

module.exports = Transactions;
