const Category = require("../models/MenuCategory");

// ✅ GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { IS_ACTIVE: true, IS_DELETED: false }
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch categories" });
  }
};

// ✅ POST /api/categories
exports.createCategory = async (req, res) => {
  const { CATEGORY_NAME } = req.body;
  try {
    const newCategory = await Category.create({
      CATEGORY_NAME,
      IS_ACTIVE: true,
      IS_DELETED: false
    });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create category" });
  }
};

// ✅ PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { CATEGORY_NAME } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ msg: "Category not found" });

    category.CATEGORY_NAME = CATEGORY_NAME || category.CATEGORY_NAME;
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update category" });
  }
};

// ✅ DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ msg: "Category not found" });

    category.IS_ACTIVE = false;
    category.IS_DELETED = true;
    await category.save();

    res.json({ msg: "Category deleted (soft delete)" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete category" });
  }
};
