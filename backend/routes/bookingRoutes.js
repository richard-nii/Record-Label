const express = require("express");
const router = express.Router();
const { submitBooking, getBookings, getBooking, updateStatus, deleteBooking } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", submitBooking);
router.get("/", protect, getBookings);
router.get("/:id", protect, getBooking);
router.patch("/:id/status", protect, updateStatus);
router.delete("/:id", protect, deleteBooking);

module.exports = router;
