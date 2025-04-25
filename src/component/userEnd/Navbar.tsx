import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logoutUser, setAuthorization } from "../../redux/slices/userslices";
import { useNavigate } from "react-router-dom";
import { AiFillMessage, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMsgBoxOpen, setIsMsgBoxOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMsgBox = () => {
    setIsMsgBoxOpen(!isMsgBoxOpen);
    // Close profile menu if open when opening message box
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logoutUser());
    setIsProfileOpen(false);
    dispatch(setAuthorization(false));
    navigate("/auth");
  };

  // Mock messages data - replace with actual data from your backend
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      text: "Hi there! How are you?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "Task Support",
      text: "Your task has been approved!",
      time: "Yesterday",
    },
    {
      id: 3,
      sender: "Sarah Smith",
      text: "Let's meet tomorrow",
      time: "Mar 25",
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 py-4 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-700">
          <a href="/">TaskTap</a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="hover:text-blue-600">
            How It Works
          </a>
          <a href="#why-choose" className="hover:text-blue-600">
            Why TaskTap
          </a>
          <a href="#testimonials" className="hover:text-blue-600">
            Testimonials
          </a>
          <a href="#jobs" className="hover:text-blue-600">
            Jobs
          </a>

          {isAuthorized ? (
            // Profile Icon & Dropdown
            <div className="relative flex items-center gap-4">
              <div className="relative">
                <AiFillMessage
                  size="1.8em"
                  className="text-blue-700 cursor-pointer hover:text-blue-800"
                  onClick={toggleMsgBox}
                />
                {messages.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {messages.length}
                  </span>
                )}
              </div>

              <FaUserCircle
                className="text-3xl cursor-pointer text-blue-700 hover:text-blue-800"
                onClick={toggleProfileMenu}
              />

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                  <p className="px-4 py-2 text-gray-700 border-b">
                    {user?.name}
                  </p>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}>
                    My Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="/signup">
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg">
                  Sign Up
                </button>
              </a>
              <a href="/signin">
                <button className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg">
                  Sign In
                </button>
              </a>
            </>
          )}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 rounded-lg px-4 py-2">
          <a
            href="#how-it-works"
            className="block py-2 hover:text-blue-600"
            onClick={toggleMenu}>
            How It Works
          </a>
          <a
            href="#why-choose"
            className="block py-2 hover:text-blue-600"
            onClick={toggleMenu}>
            Why TaskTap
          </a>
          <a
            href="#testimonials"
            className="block py-2 hover:text-blue-600"
            onClick={toggleMenu}>
            Testimonials
          </a>
          <a
            href="#jobs"
            className="block py-2 hover:text-blue-600"
            onClick={toggleMenu}>
            Jobs
          </a>

          {isAuthorized ? (
            <>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/signup">
                <button className="block w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg mt-2">
                  Sign Up
                </button>
              </a>
              <a href="/signin">
                <button className="block w-full border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg mt-2">
                  Sign In
                </button>
              </a>
            </>
          )}
        </div>
      )}

      {/* Message Box */}
      {isMsgBoxOpen && (
        <div className="fixed right-4 top-20 w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-200">
          <div className="flex justify-between items-center border-b p-4 bg-blue-700 text-white rounded-t-lg">
            <h3 className="font-semibold">Messages</h3>
            <button
              onClick={toggleMsgBox}
              className="text-white hover:text-gray-200">
              <AiOutlineClose size={20} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-blue-700">
                      {message.sender}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {message.text}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No messages yet
              </div>
            )}
          </div>

          <div className="p-3 border-t">
            <button
              className="w-full py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
              onClick={() => {
                navigate("/messages");
                toggleMsgBox();
              }}>
              View All Messages
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
