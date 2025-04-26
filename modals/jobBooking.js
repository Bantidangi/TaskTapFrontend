const mongoose = require("mongoose");

const JobBookingSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "applied", "cancelled", "inProgress"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobBooking", JobBookingSchema);
