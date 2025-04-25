import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../userEnd/Dashboard";
import JobApplications from "../userEnd/JobApplications";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/applications" element={<JobApplications />} />
      {/* <Route path="/running" element={<RunningJobs />} />
      <Route path="/completed" element={<CompletedJobs />} />
      <Route path="/payments" element={<PaymentHistory />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/available" element={<AvailableJobs />} />
      <Route path="/applied" element={<AppliedJobs />} />
      <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
}

export default AppRoutes;
