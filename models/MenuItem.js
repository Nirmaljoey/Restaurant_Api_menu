const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MenuItem = sequelize.define("PS_MENU_ITEMS", {
  ITEM_NAME: DataTypes.STRING,
  DEFAULT_PRICE: DataTypes.DECIMAL,
  IMAGE_THUMBNAIL: DataTypes.TEXT,
  CATEGORY_ID: DataTypes.INTEGER,
  IS_ACTIVE: DataTypes.BOOLEAN,
  IS_DELETED: DataTypes.BOOLEAN
}, {
  timestamps: false,
  tableName: "PS_MENU_ITEMS"
});

module.exports = MenuItem;
