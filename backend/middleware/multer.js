const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Specify the folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Add a timestamp to the file name
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
