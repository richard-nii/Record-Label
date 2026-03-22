const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    artistName: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
    },
    organizerName: {
      type: String,
      required: [true, "Organizer name is required"],
      trim: true,
    },
    organizerEmail: {
      type: String,
      required: [true, "Organizer email is required"],
      lowercase: true,
      trim: true,
    },
    organizerPhone: {
      type: String,
      required: [true, "Organizer phone is required"],
      trim: true,
    },
    organization: {
      type: String,
      default: "",
      trim: true,
    },
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    eventVenue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    eventCity: {
      type: String,
      required: [true, "Event city is required"],
      trim: true,
    },
    eventCountry: {
      type: String,
      required: [true, "Event country is required"],
      trim: true,
    },
    eventType: {
      type: String,
      enum: ["Concert", "Festival", "Corporate", "Private", "TV/Radio", "Other"],
      default: "Other",
    },
    estimatedBudget: {
      type: String,
      default: "",
    },
    additionalInfo: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
