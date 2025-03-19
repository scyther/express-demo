const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 8000;

app.use(express.json());

// Get Request
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Post Request
app.post("/api", (req, res) => {
  console.log(req.body);
  res.json({ message: "Post Request!" });
});

// file upload using multer
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ message: "File Uploaded!", filename: req.file.originalname });
});

// Serve single Static File
app.get('/', function(req,res) {
  res.sendFile('index.html', { root: __dirname });
});

// Serve Static Files
app.use(express.static('public'));

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
