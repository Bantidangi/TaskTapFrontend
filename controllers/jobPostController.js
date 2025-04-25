const JobBooking = require("../modals/jobBooking");
const Job = require("../modals/userJobPostFormModal");

const jobpost = async (req, res) => {
  try {
    const { title, location, dateTime, duration, payOffered } = req.body;
    if (!title || !location || !dateTime || !duration || !payOffered) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const jobPostData = new Job({ ...req.body });
    const savedJob = await jobPostData.save();
    console.log(savedJob);
    res.status(200).json({ message: "Job saved successfully" });
  } catch (error) {
    console.log(error);
  }
};

const jobfetch = async (req, res) => {
  const userId = req.user._id; // Get user ID from JWT token

  try {
    const jobs = await Job.find({ userid: userId }); // Fetch jobs for the user
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("userid", "name"); // Populate username from User
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user?._id;

    console.log(`Job ID: ${jobId}, User ID: ${userId}`);

    if (!jobId) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ Check if already applied
    const alreadyApplied = await JobBooking.findOne({
      jobId: job._id,
      appliedBy: userId,
    });

    if (alreadyApplied) {
      return res
        .status(409)
        .json({ message: "You have already applied for this job." });
    }

    const jobBooking = await JobBooking.create({
      createdBy: job.userid,
      appliedBy: userId,
      jobId: job._id,
      status: "applied",
    });

    console.log("Job Booking:", jobBooking);

    res.status(200).json({ message: "Applied successfully", jobBooking });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const bookings = await JobBooking.find({ appliedBy: userId })
      .populate({
        path: "jobId",
        select: "title userid",
        populate: {
          path: "userid", // ✅ Corrected from userId
          model: "User",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    const formatted = bookings.map((booking) => ({
      jobName: booking.jobId?.title || "N/A",
      postedBy: booking.jobId?.userid?.name || "Unknown",
      status: booking.status,
      appliedAt: booking.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  applyJob,
  getAllJob,
  jobfetch,
  jobpost,
  getAppliedJobs,
};
