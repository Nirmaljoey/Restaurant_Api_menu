const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("BO_USERS", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  LOGIN_ID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  USER_NAME: {
    type: DataTypes.STRING
  },
  PSWD: {
    type: DataTypes.STRING,
    allowNull: false
  },
  IS_ACTIVE: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: "BO_USERS",
  timestamps: false
});

module.exports = User;
