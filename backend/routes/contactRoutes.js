const express = require("express");
const router = express.Router();
const { submitMessage, getMessages, markRead, deleteMessage } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", submitMessage);
router.get("/", protect, getMessages);
router.patch("/:id/read", protect, markRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
