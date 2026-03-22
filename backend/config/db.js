const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes("<username>")) {
    throw new Error(
      "MONGO_URI is not configured. Open backend/.env and replace <username> and <password> with your MongoDB Atlas credentials."
    );
  }
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
