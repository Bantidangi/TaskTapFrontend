import { Routes, Route } from "react-router-dom";

import { ProviderDashboard, SeekerDashboard } from "./HomePage";
import { useEffect, useState } from "react";
import Sidebar from "../pages/SideBar";
import DashboardOverview from "./DashboardOverview";
import AvailableJobs from "./AvailableJobs";
import JobApplications from "./JobApplications";
import RunningJob from "./RunningJob";
import CompeleteJobs from "./CompeleteJobs";
import Payment from "./Payment";
import AppliedJobs from "./AppliedJobs";
import Profile from "./Profile";
import CompletedJobs from "./CompeleteJobs";
import JobPostingForm from "../pages/jobpostingform";

const Dashboard = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [smallWidth, setSmallWidth] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSmallWidth(true);
      } else {
        setSmallWidth(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex w-full min-h-screen bg-gray-200">
      <div className="">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={role}
        />
      </div>

      <div
        className={`flex-1 mt-20 transition-all duration-300 bg-zinc-100 overflow-auto ${
          smallWidth ? "ml-0" : isOpen ? "ml-64" : "ml-14"
        }`}>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="available" element={<AvailableJobs />} />
          <Route path="applications" element={<JobApplications />} />

          <Route path="running" element={<RunningJob />} />

          {/* <Route  path="completed"  element={<CompeleteJobs/>}  /> */}

          <Route path="payments" element={<Payment />} />

          <Route path="post-job" element={<JobPostingForm />} />

          <Route path="completed" element={<CompletedJobs />} />
          <Route path="applied" element={<AppliedJobs />} />

          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
