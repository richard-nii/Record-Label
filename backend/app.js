require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/artists", require("./routes/artistRoutes"));
app.use("/api/releases", require("./routes/musicRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/subscribers", require("./routes/subscriberRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", label: "Grind Don't Stop Records API" }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found." }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error." });
});

module.exports = app;
