const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
    maxlength: [200, "Location cannot exceed 200 characters"],
  },
  dateTime: {
    type: Date,
    required: [true, "Date and time are required"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: [0.5, "Duration must be at least 0.5 hours"],
  },
  payOffered: {
    type: Number,
    required: [true, "Pay offered is required"],
    min: [1, "Pay must be at least $1"],
  },
  urgency: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["open", "inProgress", "completed", "applied"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
