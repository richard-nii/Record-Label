const Subscriber = require("../models/Subscriber");

// POST /api/subscribers  (public)
const subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "This email is already subscribed." });
    }

    const subscriber = await Subscriber.create({ email, name: name || "" });
    res.status(201).json({ message: "Subscribed successfully. Thank you!", subscriber });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "This email is already subscribed." });
    }
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// GET /api/subscribers  [protected]
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// DELETE /api/subscribers/:id  [protected]
const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) return res.status(404).json({ message: "Subscriber not found." });
    res.json({ message: "Subscriber removed." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = { subscribe, getSubscribers, deleteSubscriber };
