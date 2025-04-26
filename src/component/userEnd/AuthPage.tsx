import React, { useState } from 'react';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import Navbar from './Navbar';


const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      
      <div className="py-16 px-4">
        {/* Toggle Buttons */}
        <div className="max-w-md mx-auto flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsSignup(true)}
            className={`px-4 py-2 rounded-lg font-semibold ${isSignup ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignup(false)}
            className={`px-4 py-2 rounded-lg font-semibold ${!isSignup ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Sign In
          </button>
        </div>

        {/* Render Form */}
        {isSignup ? <SignupForm /> : <SigninForm />}
      </div>
    </div>
  );
};

export default AuthPage;