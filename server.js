const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const maxSize = 20 * 1000 * 1000;

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


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// const upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    const filetypes = /jpeg|jpg|png|/;
    const mimetype = filetypes.test(file.mimetype);

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    console.log(mimetype, extname, file?.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },

  // mypic is the name of file attribute
}).single("mypic");

app.get("/", function (req, res) {
  res.render("Signup");
});

app.post("/api/uploadfile", function (req, res, next) {
  // Error MiddleWare for multer file upload, so if any
  // error occurs, the image would not be uploaded!
  upload(req, res, function (err) {
    if (err) {
      // ERROR occurred (here it can be occurred due
      // to uploading image of size greater than
      // 1MB or uploading different file type)
      res.send(err);
    } else {
      // SUCCESS, image successfully uploaded
      res.send("Success, Image uploaded!");
    }
  });
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
