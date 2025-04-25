const express = require("express");
const router = express.Router();
const { signUp, signIn, checkToken } = require("../controllers/userController");
const {
  jobpost,
  jobfetch,
  getAllJob,
  applyJob,
  getAppliedJobs,
} = require("../controllers/jobPostController");
const authenticateToken = require("../middleware/authozirationToken");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/check-token", authenticateToken, checkToken);
router.post("/jobpost", authenticateToken, jobpost);
router.get("/jobget", authenticateToken, jobfetch);
router.get("/getAllJob", getAllJob);
router.post("/applyjob/:id?", authenticateToken, applyJob);
router.get("/applied-job", authenticateToken, getAppliedJobs);

module.exports = router;
