const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getProfile
} = require("../controllers/authController");

const {
  getAdminSummary,
  getAllUsers,
  updateUserRole,
  deleteUser
} = require("../controllers/adminController");

const protect = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

// public auth routes
router.post("/signup", signup);
router.post("/login", login);

// logged in user profile
router.get("/me", protect, getProfile);

// admin dashboard data
router.get("/admin/summary", protect, adminOnly, getAdminSummary);

// admin users management
router.get("/admin/users", protect, adminOnly, getAllUsers);
router.put("/admin/users/:id/role", protect, adminOnly, updateUserRole);
router.delete("/admin/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
