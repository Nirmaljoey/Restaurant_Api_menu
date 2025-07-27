const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MenuCategory = sequelize.define("PS_MENU_CATEGORY", {
  CATEGORY_NAME: DataTypes.STRING,
  IS_ACTIVE: DataTypes.BOOLEAN,
  IS_DELETED: DataTypes.BOOLEAN
}, {
  timestamps: false,
  tableName: "PS_MENU_CATEGORY"
});

module.exports = MenuCategory;
