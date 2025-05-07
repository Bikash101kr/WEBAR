const multer = require('multer');
const path = require('path');

// Configure storage options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// File filter to allow only specific file types (e.g., images, 3D models)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|gltf|glb/; // Image and 3D models (GLTF/GLB)
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    cb(new Error('Only images or 3D models are allowed'), false); // Reject the file
  }
};

// Create the multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit to 50MB file size
  fileFilter: fileFilter,
});

// Export the middleware for use in routes
module.exports = upload;
