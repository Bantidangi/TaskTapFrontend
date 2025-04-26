import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobPostingForm = () => {
  const userLogin = useSelector((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const jobData = {
        ...data,
        duration: Number(data.duration),
        payOffered: Number(data.payOffered),
        userid: userLogin.user.user.id,
        jobUniqueId: `${userLogin.user.user.id}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      };

      await axios.post(
        "http://localhost:4000/api/user/jobpost",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      navigate("/home");
    } catch (error) {
      console.error(
        "Error posting job:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-8">
      <div className="md:flex">
        <div className="w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Post a New Job</h1>
            <p className="mt-2 text-gray-600">
              Fill out the form to find the right help for your task
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Task Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Task Title *
              </label>
              <input
                type="text"
                {...register("title", { required: "Task title is required" })}
                placeholder="e.g., Help moving furniture"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Provide details about the task..."
                rows="4"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="e.g., 123 Main St or Downtown"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Date and Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date and Time *
              </label>
              <input
                type="datetime-local"
                {...register("dateTime", {
                  required: "Date and time are required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.dateTime ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dateTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateTime.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  {...register("duration", {
                    required: "Duration is required",
                    min: {
                      value: 0.5,
                      message: "Duration must be at least 0.5 hours",
                    },
                  })}
                  placeholder="e.g., 2"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* Pay Offered */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pay Offered ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    {...register("payOffered", {
                      required: "Pay offered is required",
                      min: { value: 1, message: "Pay must be at least $1" },
                    })}
                    placeholder="e.g., 30"
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.payOffered ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.payOffered && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.payOffered.message}
                  </p>
                )}
              </div>
            </div>

            {/* Urgency */}
            <div className="flex items-center">
              <input
                id="urgency"
                type="checkbox"
                {...register("urgency")}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor="urgency"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Urgent - Need this done ASAP
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/20000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting...
                </span>
              ) : (
                "Post Job"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;