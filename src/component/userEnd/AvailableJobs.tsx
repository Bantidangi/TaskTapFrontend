import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import useApplyMutation from "./appliedHTTP/useApplyMutation";
import axiosInstance from "../utils/axios";
import { BASE_URL } from "../utils/exports";

interface JobUser {
  name: string;
  _id: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  dateTime: string;
  duration: number;
  payOffered: number;
  urgency: boolean;
  status: string;
  createdAt: string;
  userid: JobUser;
  isApplied?: boolean;
}

const useGetAvailableJobs = (filters = {}) => {
  const fetchJobs = async (): Promise<Job[]> => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/getAllJob`);
      return response.data;
    } catch {
      toast.error("Failed to fetch available jobs");
      return [];
    }
  };

  return useQuery({
    queryKey: ["getAllJob"], // queryKey is now dynamic
    queryFn: fetchJobs,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};


const AvailableJobs: React.FC = () => {
  const { data: availableJobs, isLoading, error, refetch } = useGetAvailableJobs();
console.log(availableJobs)
  const { mutate } = useApplyMutation();
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  const handleJobApplied = (id: string) => {
    setApplyingJobId(id);
    mutate(id, {
      onSuccess: () => {
        setApplyingJobId(null);
      },
      onError: () => {
        setApplyingJobId(null);
      }
    });
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (isLoading) {
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
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
          <p>Failed to load jobs. Please try again later.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-sm transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!availableJobs || availableJobs.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
        <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <svg 
            className="w-16 h-16 mx-auto text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-500 mb-3">No available jobs at the moment.</p>
          <button
            onClick={() => refetch()}
            className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
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
          onClick={() => refetch()}
          disabled={isLoading}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center gap-2">
          {isLoading ? (
            <>
              <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-gray-600 rounded-full"></span>
              <span>Refreshing...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh Jobs</span>
            </>
          )}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableJobs.map((job) => (
          <div
            key={job._id}
            className="p-5 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200">
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
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full border border-red-200">
                  Urgent
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-3 line-clamp-3">{job.description}</p>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium mr-1">Location:</span> {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium mr-1">Date:</span> {new Date(job.dateTime).toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium mr-1">Duration:</span> {job.duration} hours
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                ₹{job.payOffered}
              </span>
              <span className="text-xs text-gray-400">
                Posted {formatDate(job.createdAt)}
              </span>
            </div>

            <button
              onClick={() => handleJobApplied(job._id)}
              disabled={applyingJobId === job._id || job.isApplied}
              className={`mt-4 w-full px-4 py-2 text-sm rounded transition-colors flex justify-center items-center gap-2
                ${job.isApplied 
                  ? "bg-green-100 text-green-800 cursor-not-allowed" 
                  : applyingJobId === job._id
                  ? "bg-blue-500 text-white cursor-wait"
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}>
              {applyingJobId === job._id ? (
                <>
                  <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                  <span>Applying...</span>
                </>
              ) : job.isApplied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Applied</span>
                </>
              ) : (
                "Apply Now"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableJobs;
