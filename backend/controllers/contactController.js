const ContactMessage = require("../models/ContactMessage");

// POST /api/contact  (public)
const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    const contact = await ContactMessage.create({ name, email, subject, message });
    res.status(201).json({ message: "Message sent successfully. We'll be in touch.", contact });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// GET /api/contact  [protected]
const getMessages = async (req, res) => {
  try {
    const filter = {};
    if (req.query.unread === "true") filter.isRead = false;
    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// PATCH /api/contact/:id/read  [protected]
const markRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: "Message not found." });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// DELETE /api/contact/:id  [protected]
const deleteMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found." });
    res.json({ message: "Message deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = { submitMessage, getMessages, markRead, deleteMessage };
