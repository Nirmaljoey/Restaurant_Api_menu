const MenuItem = require("../models/MenuItem");
const { Op } = require("sequelize");

// GET /api/menu-items?categoryId=4&search=pizza
exports.getMenuItems = async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    const where = {
      IS_ACTIVE: true,
      IS_DELETED: false
    };

    if (categoryId) where.CATEGORY_ID = categoryId;
    if (search) where.ITEM_NAME = { [Op.like]: `%${search}%` };

    const items = await MenuItem.findAll({ where });
    res.json(items);
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    res.status(500).json({ msg: "Failed to fetch menu items" });
  }
};

// POST /api/menu-items
exports.createMenuItem = async (req, res) => {
  const { name, price, imageUrl, categoryId } = req.body;
  try {
    const newItem = await MenuItem.create({
      ITEM_NAME: name,
      DEFAULT_PRICE: price,
      IMAGE_THUMBNAIL: imageUrl,
      CATEGORY_ID: categoryId,
      IS_ACTIVE: true,
      IS_DELETED: false
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error("❌ Create error:", err.message);
    res.status(500).json({ msg: "Failed to add item" });
  }
};

// PUT /api/menu-items/:id
exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, imageUrl, categoryId } = req.body;
  try {
    const item = await MenuItem.findByPk(id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    item.ITEM_NAME = name ?? item.ITEM_NAME;
    item.DEFAULT_PRICE = price ?? item.DEFAULT_PRICE;
    item.IMAGE_THUMBNAIL = imageUrl ?? item.IMAGE_THUMBNAIL;
    item.CATEGORY_ID = categoryId ?? item.CATEGORY_ID;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error("❌ Update error:", err.message);
    res.status(500).json({ msg: "Failed to update item" });
  }
};

// DELETE /api/menu-items/:id
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await MenuItem.findByPk(id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    // soft delete: mark IS_DELETED instead of physical delete
    item.IS_DELETED = true;
    await item.save();

    res.json({ msg: "Item deleted (soft delete)" });
  } catch (err) {
    console.error("❌ Delete error:", err.message);
    res.status(500).json({ msg: "Failed to delete item" });
  }
};
