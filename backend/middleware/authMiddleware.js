const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorised. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select("-passwordHash");

    if (!req.admin) {
      return res.status(401).json({ message: "Admin account not found." });
    }

    next();
  } catch {
    return res.status(401).json({ message: "Not authorised. Invalid or expired token." });
  }
};

module.exports = { protect };
