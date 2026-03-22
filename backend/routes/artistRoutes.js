const express = require("express");
const router = express.Router();
const { getArtists, getArtist, createArtist, updateArtist, deleteArtist } = require("../controllers/artistController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getArtists);
router.get("/:id", getArtist);
router.post("/", protect, createArtist);
router.put("/:id", protect, updateArtist);
router.delete("/:id", protect, deleteArtist);

module.exports = router;
