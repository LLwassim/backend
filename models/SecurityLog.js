const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Import your Sequelize instance
const User = require("./User"); // Import your User model

const SecurityLog = sequelize.define(
  "SecurityLog",
  {
    log_id: {
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
    action: {
      type: DataTypes.STRING,
    },
    date_time: {
      type: DataTypes.DATE,
    },
    IP_address: {
      type: DataTypes.STRING,
    },
    device_info: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "SecurityLog", // Specify the table name here
    timestamps: false,
  }
);

// Define the association between SecurityLog and User (one-to-many)
SecurityLog.belongsTo(User, { foreignKey: "customer_id" });
User.hasMany(SecurityLog, { foreignKey: "customer_id" });

module.exports = SecurityLog;
