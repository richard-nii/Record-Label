const Release = require("../models/Release");
const Artist = require("../models/Artist");

// GET /api/releases
const getReleases = async (req, res) => {
  try {
    const filter = {};
    if (req.query.artistId) filter.artistId = req.query.artistId;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.featured === "true") filter.isFeatured = true;

    const releases = await Release.find(filter).sort({ releaseDate: -1 });
    res.json(releases);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// GET /api/releases/:id
const getRelease = async (req, res) => {
  try {
    const release = await Release.findById(req.params.id).populate("artistId", "name slug");
    if (!release) return res.status(404).json({ message: "Release not found." });
    res.json(release);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// POST /api/releases  [protected]
const createRelease = async (req, res) => {
  try {
    const { title, artistId, type, releaseDate, coverUrl, streamingLinks, description, isFeatured } =
      req.body;

    if (!title || !artistId || !type || !releaseDate) {
      return res.status(400).json({ message: "Title, artist, type, and release date are required." });
    }

    const artist = await Artist.findById(artistId);
    if (!artist) return res.status(404).json({ message: "Artist not found." });

    const release = await Release.create({
      title,
      artistId,
      artistName: artist.name,
      type,
      releaseDate,
      coverUrl: coverUrl || "",
      streamingLinks: streamingLinks || {},
      description: description || "",
      isFeatured: isFeatured || false,
    });

    res.status(201).json(release);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// PUT /api/releases/:id  [protected]
const updateRelease = async (req, res) => {
  try {
    const release = await Release.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!release) return res.status(404).json({ message: "Release not found." });
    res.json(release);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// DELETE /api/releases/:id  [protected]
const deleteRelease = async (req, res) => {
  try {
    const release = await Release.findByIdAndDelete(req.params.id);
    if (!release) return res.status(404).json({ message: "Release not found." });
    res.json({ message: "Release deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = { getReleases, getRelease, createRelease, updateRelease, deleteRelease };
