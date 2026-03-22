const Event = require("../models/Event");

// GET /api/events  (public — upcoming only; ?all=true for admin)
const getEvents = async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { date: { $gte: new Date() } };
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// POST /api/events  [protected]
const createEvent = async (req, res) => {
  try {
    const { name, artistName, date, venue, city, ticketUrl } = req.body;

    if (!name || !artistName || !date || !venue || !city) {
      return res.status(400).json({
        message: "Name, artist, date, venue, and city are required.",
      });
    }

    const event = await Event.create({
      name,
      artistName,
      date,
      venue,
      city,
      ticketUrl: ticketUrl || "",
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// PUT /api/events/:id  [protected]
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found." });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// DELETE /api/events/:id  [protected]
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found." });
    res.json({ message: "Event deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
