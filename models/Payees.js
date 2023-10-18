const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User"); 

const Payees = sequelize.define(
  "Payees",
  {
    payee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.UUID,
    },
    payee_name: {
      type: DataTypes.STRING,
    },
    account_number: {
      type: DataTypes.STRING,
    },
    bank_name: {
      type: DataTypes.STRING,
    },
    branch: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Payees", // Specify the table name here
    timestamps: false,
  }
);

// Define the association between Payees and User (one-to-many)
Payees.belongsTo(User, { foreignKey: "customer_id" });
User.hasMany(Payees, { foreignKey: "customer_id" });

module.exports = Payees;
