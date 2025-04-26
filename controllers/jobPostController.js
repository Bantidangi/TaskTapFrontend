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
  const userId = req.user._id;

  try {
    // 1. Fetch jobs created by the logged-in user
    const jobs = await Job.find({ userid: userId });

    // 2. Extract all job._id values
    const jobIds = jobs.map((job) => job._id.toString());

    // 3. Fetch all bookings where jobId is one of the user's job IDs
    const bookings = await JobBooking.find({ jobId: { $in: jobIds } });

    // 4. Attach matching bookings to each job
    const jobsWithApplications = jobs.map((job) => {
      const applications = bookings.filter(
        (booking) => booking.jobId.toString() === job._id.toString()
      );
      return {
        ...job.toObject(),
        applications,
      };
    });

    res.json(jobsWithApplications);
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
      id: booking.jobId._id,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const acceptJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);
    const jobBooking = await JobBooking.findOne({ jobId }); // use this if jobId is a field in JobBooking

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (!jobBooking) {
      return res.status(404).json({ message: "Job booking not found" });
    }

    job.status = "inProgress";
    job.updatedAt = new Date();

    jobBooking.status = "inProgress";
    jobBooking.updatedAt = new Date();

    await job.save();
    await jobBooking.save();

    res
      .status(200)
      .json({ message: "Job and booking status updated successfully", job });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const completeJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Job.findById({ _id: jobId });
    const jobBooking = await JobBooking.findOne({ jobId }); // use this if jobId is a field in JobBooking
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (!jobBooking) {
      return res.status(404).json({ message: "Job booking not found" });
    }

    job.status = "completed";
    job.updatedAt = new Date();

    jobBooking.status = "completed";
    jobBooking.updatedAt = new Date();

    await job.save();
    await jobBooking.save();

    res
      .status(200)
      .json({ message: "Job and booking status updated successfully", job });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCompletedJobsByUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const completedJobs = await JobBooking.find({
      appliedBy: userId,
      status: "completed",
    }).populate("jobId", "title description"); // only fetch title and description from Job

    res.status(200).json(completedJobs);
  } catch (error) {
    console.error("Error fetching completed jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCompletedJobsByUser,
  completeJob,
  acceptJob,
  applyJob,
  getAllJob,
  jobfetch,
  jobpost,
  getAppliedJobs,
};
