const express = require("express");
const router = express.Router();
const { getReleases, getRelease, createRelease, updateRelease, deleteRelease } = require("../controllers/musicController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getReleases);
router.get("/:id", getRelease);
router.post("/", protect, createRelease);
router.put("/:id", protect, updateRelease);
router.delete("/:id", protect, deleteRelease);

module.exports = router;
