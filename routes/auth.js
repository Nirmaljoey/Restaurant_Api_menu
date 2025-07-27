const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - loginId
 *               - password
 *             properties:
 *               loginId:
 *                 type: string
 *                 example: admin123
 *               password:
 *                 type: string
 *                 example: secretpassword
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Missing credentials
 *       401:
 *         description: Invalid login or password
 */
router.post("/login", login);

// Optional: Enable registration for testing (commented by default)
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// /**
//  * @swagger
//  * /api/auth/register:
//  *   post:
//  *     summary: Register a test user (dev only)
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - loginId
//  *               - username
//  *               - password
//  *             properties:
//  *               loginId:
//  *                 type: string
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User created
//  *       500:
//  *         description: Registration failed
//  */
// router.post("/register", async (req, res) => {
//   const { loginId, username, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       LOGIN_ID: loginId,
//       USER_NAME: username,
//       PSWD: hashedPassword,
//       IS_ACTIVE: true
//     });
//     res.status(201).json({ msg: "User created", user: newUser });
//   } catch (err) {
//     console.error("Register error:", err.message);
//     res.status(500).json({ msg: "Registration failed" });
//   }
// });

module.exports = router;
