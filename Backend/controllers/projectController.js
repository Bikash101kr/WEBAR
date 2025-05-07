const mongoose = require('mongoose');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const QRCode = require('qrcode');
const Project = require('../models/project');
const templates = require('../models/templatesHardcoded');

// @desc    Create new project from template
// @route   POST /api/v1/projects/template
// @access  Private
exports.createProject = asyncHandler(async (req, res, next) => {
  const { templateId } = req.body;

  if (!templateId) {
    return next(new ErrorResponse('Template ID is required', 400));
  }

  const template = templates.find(t => t._id === templateId);
  if (!template) {
    return next(new ErrorResponse('Template not found', 404));
  }

  let filePath = '';
  let qrCode = '';

  if (req.file) {
    filePath = `/uploads/${req.file.filename}`;
    const arViewUrl = `${process.env.FRONTEND_URL}/ar-view/${req.file.filename}`;
    qrCode = await QRCode.toDataURL(arViewUrl);
  }

  const projectData = {
    name: template.name,
    description: template.description,
    owner:  req.user.role === 'admin' && req.body.owner ? req.body.owner : req.user.id,
    thumbnail: template.thumbnail,
    sceneData: {},
    assets: [],
    settings: {
      versionControl: false,
      autoSave: true,
      saveInterval: 300000
    },
    tags: [template.type],
    isPublic: false,
    isArchived: false,
    fileUrl: filePath,
    qrCode
  };

  const project = await Project.create(projectData);
  res.status(201).json({ success: true, data: project });
});

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
exports.getAllProjects = asyncHandler(async (req, res) => {
  const query = req.user.role === 'admin' ? {} : { owner: req.user.id };
  const projects = await Project.find(query).populate('owner', 'firstName lastName email');


  res.status(200).json({
    success: true,
    data: projects
  });
});

// @desc    Get a project by ID
// @route   GET /api/v1/projects/:id
// @access  Private
exports.getProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse('Invalid project ID format', 400));
  }

  const project = await Project.findById(id).populate('owner', 'name email');
  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  if (project.owner._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to view this project', 401));
  }

  res.status(200).json({ success: true, data: project });
});

// @desc    Update a project
// @route   PUT /api/v1/projects/:id
// @access  Private
exports.updateProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse('Invalid project ID format', 400));
  }

  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this project', 401));
  }

  Object.assign(project, req.body);
  project.updatedAt = Date.now();

  await project.save();
  res.status(200).json({ success: true, data: project });
});

// @desc    Delete a project
// @route   DELETE /api/v1/projects/:id
// @access  Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Validate the project ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse('Invalid project ID format', 400));
  }

  // Find the project by ID
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  // Check if the user is authorized to delete the project
  if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this project', 401));
  }

  // Delete the project using findByIdAndDelete
  await Project.findByIdAndDelete(id);

  res.status(200).json({ success: true, data: {} });
});
