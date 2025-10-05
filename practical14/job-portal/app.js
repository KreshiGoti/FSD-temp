const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3002;

// Set EJS as template engine
app.set('view engine', 'ejs');

// Explicitly set the views folder
app.set('views', path.join(__dirname, 'views'));

// Serve uploaded files statically
app.use(express.static('uploads'));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Only allow PDFs
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.pdf') cb(null, true);
  else cb(new Error('Only PDF files are allowed'));
};

// Limit file size to 2MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// GET route - show upload form
app.get('/', (req, res) => {
  res.render('upload', { error: null });
});

// POST route - handle file upload
app.post('/upload', (req, res) => {
  const singleUpload = upload.single('resume');

  singleUpload(req, res, function(err) {
    if (err) {
      return res.render('upload', { error: err.message });
    }
    if (!req.file) {
      return res.render('upload', { error: 'Please select a PDF file to upload' });
    }
    res.render('result', { filename: req.file.filename });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
