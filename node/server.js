const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// Set up HTTP server and WebSocket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add a timestamp to the filename
  },
});

const upload = multer({ storage });

// Handle file upload and emit a WebSocket event
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Emit the uploaded file information to all connected clients
  io.emit("fileUploaded", {
    message: "A new file has been uploaded!",
    fileName: req.file.filename,
    filePath: `http://192.168.14.63:5000/uploads/${req.file.filename}`, //CHANGE
  });

  res
    .status(200)
    .send({ message: "File uploaded successfully!", file: req.file });
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://192.168.14.63:${PORT}`);
});
