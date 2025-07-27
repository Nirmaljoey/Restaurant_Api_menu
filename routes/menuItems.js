/**
 * @swagger
 * tags:
 *   name: Menu Items
 *   description: Endpoints for managing menu items
 */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require("../controllers/menuItemsController");

/**
 * @swagger
 * /api/menu-items:
 *   get:
 *     summary: Get all menu items (with optional search/category filter)
 *     tags: [Menu Items]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of menu items
 */
router.get("/", getMenuItems);

/**
 * @swagger
 * /api/menu-items:
 *   post:
 *     summary: Add a new menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ITEM_NAME
 *               - DEFAULT_PRICE
 *               - CATEGORY_ID
 *             properties:
 *               ITEM_NAME:
 *                 type: string
 *               DEFAULT_PRICE:
 *                 type: number
 *               IMAGE_THUMBNAIL:
 *                 type: string
 *               CATEGORY_ID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Menu item created
 *       500:
 *         description: Failed to add item
 */
router.post("/", auth, createMenuItem);

/**
 * @swagger
 * /api/menu-items/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ITEM_NAME:
 *                 type: string
 *               DEFAULT_PRICE:
 *                 type: number
 *               IMAGE_THUMBNAIL:
 *                 type: string
 *               CATEGORY_ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Menu item updated
 *       404:
 *         description: Item not found
 */
router.put("/:id", auth, updateMenuItem);

/**
 * @swagger
 * /api/menu-items/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
router.delete("/:id", auth, deleteMenuItem);

module.exports = router;
