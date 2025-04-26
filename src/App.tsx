import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import GetStarted from "./component/userEnd/GetStarted";
import Navbar from "./component/userEnd/Navbar";
import AuthPage from "./component/userEnd/AuthPage";
import SigninForm from "./component/userEnd/SigninForm";
import SignupForm from "./component/userEnd/SignupForm";
import HomePage from "./component/userEnd/HomePage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthorization, setUserLoggedIn } from "./redux/slices/userslices";
import { setup } from "./component/utils/axios";

const App = () => {
  setup();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("authToken");

      if (authToken) {
        try {
          const response = await axios.get(
            "http://localhost:4000/api/user/check-token",
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          dispatch(setUserLoggedIn(response.data.user));
          dispatch(setAuthorization(true));
        } catch (error) {
          console.error(
            "Error verifying token:",
            error.response?.data || error
          );
        }
      } else {
        navigate("/auth");
        console.log("No token found.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/home/*" element={<HomePage />} />
      </Routes>
    </div>
  );
};
export default App;
