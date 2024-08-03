const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const osisRoutes = require("./routes/osisRoutes");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/osis", osisRoutes);

app.listen(port, "localhost", () => {
  console.log(`Server running on http://localhost:${port}`);
});
