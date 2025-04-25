import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import JobPostingForm from "../pages/jobpostingform";
import axios from "axios";
import Dashboard from "./Dashboard";

const HomePage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userlogin = useSelector((state) => state);
  const role = userlogin?.user?.user?.role;
  const username = userlogin?.user?.user?.name;
  console.log(`Role: ${username}`);

  const user = { name: username, role: role };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Dashboard role={user?.role} />
    </div>
  );
};

export default HomePage;
