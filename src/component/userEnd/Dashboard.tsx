import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../pages/SideBar";
import DashboardOverview from "./DashboardOverview";
import AvailableJobs from "./AvailableJobs";
import JobApplications from "./JobApplications";
import RunningJob from "./RunningJob";
import CompletedJobs from "./CompeleteJobs";
import Payment from "./Payment";
import AppliedJobs from "./AppliedJobs";
import Profile from "./Profile";
import JobPostingForm from "../pages/jobpostingform";

const Dashboard = ({ role }: { role: string }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [smallWidth, setSmallWidth] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setSmallWidth(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="fixed z-10">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={role}
        />
      </div>

      <div
        className={`flex-1 transition-all duration-300 overflow-auto pt-3 px-4 pb-6 ${
          smallWidth ? "ml-0" : isOpen ? "ml-64" : "ml-14"
        }`}
      >
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="available" element={<AvailableJobs />} />
            <Route path="applications" element={<JobApplications />} />
            <Route path="running" element={<RunningJob />} />
            <Route path="completed" element={<CompletedJobs />} />
            <Route path="payments" element={<Payment />} />
            <Route path="post-job" element={<JobPostingForm />} />
            <Route path="applied" element={<AppliedJobs />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
