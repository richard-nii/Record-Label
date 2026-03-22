const Artist = require("../models/Artist");

// GET /api/artists
const getArtists = async (req, res) => {
  try {
    const filter = {};
    // Public route only shows active artists; admin can see all
    if (!req.admin) filter.isActive = true;

    const artists = await Artist.find(filter).sort({ createdAt: -1 });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// GET /api/artists/:id
const getArtist = async (req, res) => {
  try {
    // Support lookup by MongoDB _id or by slug
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.id }
      : { slug: req.params.id };

    const artist = await Artist.findOne(query);
    if (!artist) return res.status(404).json({ message: "Artist not found." });

    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// POST /api/artists  [protected]
const createArtist = async (req, res) => {
  try {
    const { name, genre, bio, imageUrl, socialLinks } = req.body;

    if (!name || !genre || !bio) {
      return res.status(400).json({ message: "Name, genre, and bio are required." });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    // Ensure slug uniqueness
    const exists = await Artist.findOne({ slug });
    const finalSlug = exists ? `${slug}-${Date.now()}` : slug;

    const artist = await Artist.create({
      name,
      slug: finalSlug,
      genre,
      bio,
      imageUrl: imageUrl || "",
      socialLinks: socialLinks || {},
    });

    res.status(201).json(artist);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "An artist with that name already exists." });
    }
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// PUT /api/artists/:id  [protected]
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artist) return res.status(404).json({ message: "Artist not found." });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// DELETE /api/artists/:id  [protected]
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found." });
    res.json({ message: "Artist deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = { getArtists, getArtist, createArtist, updateArtist, deleteArtist };
