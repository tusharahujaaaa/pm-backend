const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to PM Community Backend");
});

// Routes
const authRoutes = require("./routes/auth.routes");
const trainingRoutes = require("./routes/training.routes");
const blogRoutes = require("./routes/blog.routes");
const commentRoutes = require("./routes/comment.route");

app.use("/api/auth", authRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
