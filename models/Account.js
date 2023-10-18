const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const User = require("./User");

const Account = sequelize.define(
  "Account",
  {
    account_id: {
      type: DataTypes.UUID, // Set the data type to UUID
      defaultValue: DataTypes.UUIDV4, // Use UUIDv4 as the default value
      primaryKey: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    account_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2), // Assuming 2 decimal places for balance
      allowNull: false,
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_opened: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "accounts",
  }
);

// Define the foreign key relationship to the User model
Account.belongsTo(User, { foreignKey: "customer_id" });
User.hasMany(Account, { foreignKey: "customer_id" });

// Export the Account model for use in other parts of your application
module.exports = Account;
