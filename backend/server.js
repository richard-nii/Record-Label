require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`GDS Records API running on http://localhost:${PORT}`);

  connectDB()
    .then(() => console.log("Database ready."))
    .catch((err) => {
      console.error("\n[DB ERROR]", err.message);
      console.error("API is running but database is unavailable. Fix MONGO_URI in backend/.env and restart.\n");
    });
});
