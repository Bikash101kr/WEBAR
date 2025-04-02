const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  roles:{
    type: String
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  }
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8); // Hash the password with 8 rounds
  }
  next();
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

