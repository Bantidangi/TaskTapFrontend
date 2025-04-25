const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures no duplicate emails
    lowercase: true, // Stores email in lowercase
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Prevents password from being returned in queries by default
  },
  role: {
    type: String,
    enum: ['provider', 'seeker'], // Restricts to Job Provider or Job Seeker
    required: [true, 'Role is required'],
  },
  location: {
    type: String,
    trim: true,
    default: '', // Optional, can be updated later
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [200, 'Bio cannot exceed 200 characters'],
    default: '', // Optional for Job Seekers
  },
  skills: [{
    type: String,
    trim: true,
    enum: ['moving', 'cleaning', 'errands', 'other'], // Predefined skills for Job Seekers
    default: [],
  }],
  hourlyRate: {
    type: Number,
    min: [0, 'Hourly rate cannot be negative'],
    default: null, // Optional for Job Seekers
  },
  isVerified: {
    type: Boolean,
    default: false, // For ID verification or email confirmation
  },
  verificationDocs: {
    type: String, // URL to uploaded ID (e.g., stored in AWS S3)
    default: null,
  },
  ratings: {
    average: { type: Number, min: 0, max: 5, default: 0 },
    count: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tokens:[
    {
      type: String,
    }
  ]
});
module.exports = mongoose.model('User', userSchema)