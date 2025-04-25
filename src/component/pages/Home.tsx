import React from "react";
import { SideBar } from "./SideBar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const user = {
    username: "John Doe",
    role: "Admin",
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-[20vw] h-full bg-red-200 sticky">
        <SideBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          user={user}
        />
      </div>
      <div className=" h-full bg-red-800"></div>
    </div>
  );
};

export default Home;
