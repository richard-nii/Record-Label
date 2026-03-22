const Booking = require("../models/Booking");

// POST /api/bookings  (public)
const submitBooking = async (req, res) => {
  try {
    const {
      artistName, organizerName, organizerEmail, organizerPhone,
      organization, eventName, eventDate, eventVenue, eventCity,
      eventCountry, eventType, estimatedBudget, additionalInfo,
    } = req.body;

    const required = { artistName, organizerName, organizerEmail, organizerPhone, eventName, eventDate, eventVenue, eventCity, eventCountry };
    const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
    if (missing.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
    }

    if (!/^\S+@\S+\.\S+$/.test(organizerEmail)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    const booking = await Booking.create({
      artistName, organizerName, organizerEmail, organizerPhone,
      organization: organization || "", eventName, eventDate,
      eventVenue, eventCity, eventCountry, eventType: eventType || "Other",
      estimatedBudget: estimatedBudget || "", additionalInfo: additionalInfo || "",
    });

    res.status(201).json({ message: "Booking request submitted successfully.", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// GET /api/bookings  [protected]
const getBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// GET /api/bookings/:id  [protected]
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// PATCH /api/bookings/:id/status  [protected]
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ["pending", "reviewed", "approved", "rejected"];
    if (!valid.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// DELETE /api/bookings/:id  [protected]
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    res.json({ message: "Booking deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = { submitBooking, getBookings, getBooking, updateStatus, deleteBooking };
