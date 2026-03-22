const express = require("express");
const router = express.Router();
const { register, login, getMe, getStats } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/stats", protect, getStats);

module.exports = router;
