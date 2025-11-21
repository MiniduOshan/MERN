const User = require("../models/User");

// GET /api/auth/admin/summary
exports.getAdminSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: "admin" });

    res.json({
      message: "Admin summary",
      stats: {
        users: totalUsers,
        admins: adminCount
      }
    });
  } catch (err) {
    console.error("Admin summary error:", err.message);
    res.status(500).json({ message: "Failed to load summary" });
  }
};

// GET /api/auth/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Get users error:", err.message);
    res.status(500).json({ message: "Failed to load users" });
  }
};

// PUT /api/auth/admin/users/:id/role
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Role updated", user });
  } catch (err) {
    console.error("Update role error:", err.message);
    res.status(500).json({ message: "Failed to update role" });
  }
};

// DELETE /api/auth/admin/users/:id
exports.deleteUser = async (req, res) => {
  try {
    // prevent admin from deleting themselves
    if (req.params.id === req.user.id) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
