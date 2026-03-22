const mongoose = require("mongoose");

const releaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: [true, "Artist is required"],
    },
    artistName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Single", "EP", "Album", "Mixtape"],
      required: [true, "Release type is required"],
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
    },
    coverUrl: {
      type: String,
      default: "",
    },
    streamingLinks: {
      spotify: { type: String, default: "" },
      apple: { type: String, default: "" },
      youtube: { type: String, default: "" },
      audiomack: { type: String, default: "" },
      boomplay: { type: String, default: "" },
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Release", releaseSchema);
