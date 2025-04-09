const projectSchema = new mongoose.Schema({
    // Core Metadata
    title: {
      type: String,
      required: [true, 'Project title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
      trim: true
    },
    client: {
      name: String,
      referenceId: String
    },
  
    // Project Structure
    experiences: [{
      experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ARExperience'
      },
      version: String,
      isPrimary: Boolean
    }],
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template'
    },
  
    // Team Collaboration
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    teamMembers: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['viewer', 'editor', 'admin'],
        default: 'viewer'
      },
      lastAccess: Date
    }],
  
    // Workflow Management
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'completed', 'archived'],
      default: 'draft'
    },
    milestones: [{
      name: String,
      dueDate: Date,
      completed: Boolean,
      completedAt: Date
    }],
  
    // Settings & Configuration
    settings: {
      qualityPreset: {
        type: String,
        enum: ['low', 'medium', 'high', 'ultra'],
        default: 'medium'
      },
      analyticsEnabled: {
        type: Boolean,
        default: true
      },
      offlineAccess: Boolean
    },
  
    // Version Control
    currentVersion: {
      type: Number,
      default: 1
    },
    changelog: [{
      version: Number,
      timestamp: Date,
      changes: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }],
  
    // Statistics
    viewCount: {
      type: Number,
      default: 0
    },
    lastAccessed: Date
  }, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });
  
  // Indexes
  projectSchema.index({ title: 'text' });
  projectSchema.index({ 'client.name': 1 });
  projectSchema.index({ owner: 1, status: 1 });
  projectSchema.index({ 'teamMembers.user': 1 });
  
  // Virtuals
  projectSchema.virtual('progress').get(function() {
    if (!this.milestones.length) return 0;
    const completed = this.milestones.filter(m => m.completed).length;
    return Math.round((completed / this.milestones.length) * 100);
  });
  
  // Middleware
  projectSchema.pre('save', function(next) {
    if (this.isModified('milestones')) {
      this.markModified('milestones');
    }
    next();
  });
  
  // Query Helpers
  projectSchema.query.byStatus = function(status) {
    return this.where({ status: status });
  };
  
  projectSchema.query.byTeamMember = function(userId) {
    return this.where({ 'teamMembers.user': userId });
  };