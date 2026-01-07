const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

/**
 * @route   GET /api/users/me
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/users/me
 * @desc    Update logged-in user profile
 * @access  Private
 */
router.put("/me", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
});

module.exports = router;
