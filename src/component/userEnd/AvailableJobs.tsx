import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import useApplyMutation from "./appliedHTTP/useApplyMutation";

const AvailableJobs = () => {
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/user/getAllJob"
      );
      setAvailableJobs(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const { mutate, isPending } = useApplyMutation();
  const handleJobApplied = (id) => {
    mutate(id);
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
          <button
            onClick={getAllJobs}
            className="ml-4 px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (availableJobs.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
        <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No available jobs at the moment.</p>
          <button
            onClick={getAllJobs}
            className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Available Jobs</h2>
        <button
          onClick={getAllJobs}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
          Refresh Jobs
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableJobs.map((job) => (
          <div
            key={job._id}
            className="p-5 bg-white rounded-lg shadow hover:shadow-md border border-gray-100 transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Posted by:{" "}
                  <span className="font-medium">
                    {job.userid?.name || "Unknown"}
                  </span>
                </p>
              </div>
              {job.urgency && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  Urgent
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-3">{job.description}</p>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Location:</span> {job.location}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Date:</span>{" "}
                {new Date(job.dateTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Duration:</span> {job.duration}{" "}
                hours
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium text-green-600">
                ₹{job.payOffered}
              </span>
              <span className="text-xs text-gray-400">
                Posted {formatDate(job.createdAt)}
              </span>
            </div>

            <button
              onClick={() => handleJobApplied(job._id)}
              className="mt-4 w-full px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              {job.status === "applied" ? "Applied" : "Apply Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableJobs;
