const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(protect);

// Route to create a new project from a template
router.post('/template',  upload.single('file'), createProject);
// Route to get all projects
router.get('/', getAllProjects);

// Route to get a specific project by ID
router.get('/:id', getProject);

// Route to update a specific project by ID
router.put('/:id', updateProject);

// Route to delete a specific project by ID
router.delete('/:id', deleteProject);

module.exports = router;
