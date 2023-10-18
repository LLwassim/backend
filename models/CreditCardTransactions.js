const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Import your Sequelize instance
const CreditCards = require("./CreditCards"); // Import your CreditCards model

const CreditCardTransactions = sequelize.define(
  "CreditCardTransactions",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CreditCards,
        key: "card_id",
      },
    },
    transaction_type: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    date_time: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "CreditCardTransactions", // Specify the table name here
    timestamps: false,
  }
);

// Define the association between CreditCardTransactions and CreditCards (one-to-many)
CreditCardTransactions.belongsTo(CreditCards, { foreignKey: "card_id" });
CreditCards.hasMany(CreditCardTransactions, { foreignKey: "card_id" });

module.exports = CreditCardTransactions;
