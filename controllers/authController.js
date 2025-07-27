const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { loginId, password } = req.body;

  // ✅ Validate input
  if (!loginId || !password) {
    console.warn(" Missing loginId or password in request body");
    return res.status(400).json({ msg: "Please provide both loginId and password" });
  }

  try {
    const user = await User.findOne({ where: { LOGIN_ID: loginId, IS_ACTIVE: true } });

    if (!user) {
      console.log(" User not found:", loginId);
      return res.status(404).json({ msg: "User not found" });
    }

    console.log(" Comparing password for user:", loginId);
    const isMatch = await bcrypt.compare(password, user.PSWD);

    if (!isMatch) {
      console.log(" Invalid password for:", loginId);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.ID, username: user.USER_NAME },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    console.log(" Login successful:", loginId);
    res.json({ token });

  } catch (err) {
    console.error(" Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
