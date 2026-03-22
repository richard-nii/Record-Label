const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Artist = require("../models/Artist");
const Release = require("../models/Release");
const Booking = require("../models/Booking");
const Subscriber = require("../models/Subscriber");
const ContactMessage = require("../models/ContactMessage");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/admin/register
// Only allowed when no admins exist (first-time setup)
const register = async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) {
      return res.status(403).json({
        message: "Admin already exists. Registration is disabled.",
      });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const admin = await Admin.create({
      username,
      email,
      passwordHash: password, // pre-save hook hashes this
    });

    const token = signToken(admin._id);

    res.status(201).json({
      message: "Admin account created successfully.",
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Username or email already in use." });
    }
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// POST /api/admin/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = signToken(admin._id);

    res.json({
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// GET /api/admin/me  [protected]
const getMe = async (req, res) => {
  res.json({
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email,
    },
  });
};

// GET /api/admin/stats  [protected]
const getStats = async (req, res) => {
  try {
    const [artists, releases, bookings, subscribers, messages, pendingBookings, unreadMessages] =
      await Promise.all([
        Artist.countDocuments({ isActive: true }),
        Release.countDocuments(),
        Booking.countDocuments(),
        Subscriber.countDocuments(),
        ContactMessage.countDocuments(),
        Booking.countDocuments({ status: "pending" }),
        ContactMessage.countDocuments({ isRead: false }),
      ]);

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("organizerName artistName eventDate status createdAt");

    res.json({
      artists,
      releases,
      bookings,
      subscribers,
      messages,
      pendingBookings,
      unreadMessages,
      recentBookings,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = { register, login, getMe, getStats };
