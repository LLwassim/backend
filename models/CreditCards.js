const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Import your Sequelize instance
const User = require("./User"); // Import your User model

const CreditCards = sequelize.define(
  "CreditCards",
  {
    card_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "customer_id",
      },
    },
    card_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    card_type: {
      type: DataTypes.STRING,
    },
    credit_limit: {
      type: DataTypes.DECIMAL(10, 2),
    },
    outstanding_balance: {
      type: DataTypes.DECIMAL(10, 2),
    },
    available_credit: {
      type: DataTypes.DECIMAL(10, 2),
    },
    due_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "CreditCards", // Specify the table name here
    timestamps: false,
  }
);

// Define the association between CreditCards and User (one-to-many)
CreditCards.belongsTo(User, { foreignKey: "customer_id" });
User.hasMany(CreditCards, { foreignKey: "customer_id" });

module.exports = CreditCards;
