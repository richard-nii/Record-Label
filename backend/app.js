const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/artists", require("./routes/artistRoutes"));

module.exports = app;