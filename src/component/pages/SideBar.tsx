import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdDashboard,
  MdBrush,
  MdPerson,
  MdShoppingCart,
  MdReceipt,
  MdMail,
  MdHelp,
} from "react-icons/md";
import clsx from "clsx";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setIsOpen, isOpen, user }) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const sideBarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
        setIsOpen(false);
        setSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen, setSidebarOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClass = clsx(
    "flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 transition-all",
    {
      "justify-center": isMobile,
    }
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        ref={sideBarRef}
        className={clsx(
          "transition-all fixed top-[5rem] left-0 z-50 h-[95vh] max-h-[95vh] scrollbar overflow-y-auto bg-white shadow-md duration-300 sm:block hidden",
          {
            "w-64": isOpen,
            "w-14": !isOpen,
          }
        )}
      >
        <div className="flex flex-col w-full">
          <ul className="flex flex-col gap-2 mt-4">
            <li>
              <Link to="/home" className={linkClass}>
                {isOpen ? (
                  <>
                    <MdDashboard /> Dashboard
                  </>
                ) : (
                  <MdDashboard />
                )}
              </Link>
            </li>

            {user === "provider" ? (
              <>
                <li>
                  <Link to="/home/applications" className={linkClass}>
                    {isOpen ? (
                      <>
                        <MdBrush /> Job Applications
                      </>
                    ) : (
                      <MdBrush />
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/home/running" className={linkClass}>
                    {isOpen ? (
                      <>
                        <MdShoppingCart /> Running Jobs
                      </>
                    ) : (
                      <MdShoppingCart />
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/home/completed" className={linkClass}>
                    {isOpen ? (
                      <>
                        <MdReceipt /> Completed Jobs
                      </>
                    ) : (
                      <MdReceipt />
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/home/payments" className={linkClass}>
                    {isOpen ? (
                      <>
                        <MdMail /> Payment History
                      </>
                    ) : (
                      <MdMail />
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/home/post-job" className={linkClass}>
                    {isOpen ? (
                      <>
                        <MdBrush /> Post a Job
                      </>
                    ) : (
                      <MdBrush />
                    )}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/home/available" className={linkClass}>
                    {isOpen ? (
                      <>
                        <MdDashboard /> Available Jobs
                      </>
                    ) : (
                      <MdDashboard />
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/home/applied" className={linkClass}>
                    {isOpen ? (
                      <>
                        <MdShoppingCart /> Applied Jobs
                      </>
                    ) : (
                      <MdShoppingCart />
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/home/completed" className={linkClass}>
                    {isOpen ? (
                      <>
                        <MdReceipt /> Completed Jobs
                      </>
                    ) : (
                      <MdReceipt />
                    )}
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/home/profile" className={linkClass}>
                {isOpen ? (
                  <>
                    <MdPerson /> Profile
                  </>
                ) : (
                  <MdPerson />
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/auth"
                className={linkClass}
                onClick={() => navigate("/auth")}
              >
                {isOpen ? (
                  <>
                    <MdHelp /> Logout
                  </>
                ) : (
                  <MdHelp />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 sm:hidden flex justify-around items-center py-3 border-t">
        <Link
          to="/home"
          className="flex flex-col items-center justify-center text-xs"
        >
          <MdDashboard size={20} />
          <span>Home</span>
        </Link>

        {user === "provider" ? (
          <>
            <Link
              to="/home/applications"
              className="flex flex-col items-center justify-center text-xs"
            >
              <MdBrush size={20} />
              <span>Jobs</span>
            </Link>
            <Link
              to="/home/running"
              className="flex flex-col items-center justify-center text-xs"
            >
              <MdShoppingCart size={20} />
              <span>Running</span>
            </Link>
            <Link
              to="/home/completed"
              className="flex flex-col items-center justify-center text-xs"
            >
              <MdReceipt size={20} />
              <span>Completed</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/home/available"
              className="flex flex-col items-center justify-center text-xs"
            >
              <MdDashboard size={20} />
              <span>Available</span>
            </Link>
            <Link
              to="/home/applied"
              className="flex flex-col items-center justify-center text-xs"
            >
              <MdShoppingCart size={20} />
              <span>Applied</span>
            </Link>
            <Link
              to="/home/completed"
              className="flex flex-col items-center justify-center text-xs"
            >
              <MdReceipt size={20} />
              <span>Completed</span>
            </Link>
          </>
        )}

        <Link
          to="/home/profile"
          className="flex flex-col items-center justify-center text-xs"
        >
          <MdPerson size={20} />
          <span>Profile</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;