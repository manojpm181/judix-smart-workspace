const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =======================
// REGISTER / SIGNUP
// =======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hash });

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// =======================
// LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // optional: token expiry
    );

    res.json({ msg: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
