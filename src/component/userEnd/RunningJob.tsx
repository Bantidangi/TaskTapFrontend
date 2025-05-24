import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "../utils/axios";
import { BASE_URL } from "../utils/exports";

interface JobPost {
  _id: string;
  title: string;
  location: string;
  payOffered: number;
  duration: number;
  dateTime: string;
  status: "pending" | "running" | "completed";
  description?: string;
}

const useGetJobPosts = () => {
  const fetchJobs = async (): Promise<JobPost[]> => {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/getAllJob`);
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch job posts");
      throw error;
      return []
    }
  };

  return useQuery({
    queryKey: ["jobPosts"],
    queryFn: fetchJobs,
  });
};

// Modern, efficient job card visualizer without Three.js
const JobPostVisualizer = ({ jobs }: { jobs: JobPost[] }) => {
  const [activeJobIndex, setActiveJobIndex] = useState(0);
  const activeJob = jobs[activeJobIndex];
  
  // Get status color classes
  const getStatusClasses = (status: string) => {
    switch(status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "running":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  // Get card background color based on status
  const getCardBgColor = (status: string) => {
    switch(status) {
      case "completed":
        return "bg-gradient-to-br from-green-50 to-green-100 border-green-200";
      case "running":
        return "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200";
      default:
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2">
        {jobs.map((job, index) => (
          <div 
            key={job._id}
            onClick={() => setActiveJobIndex(index)}
            className={`${getCardBgColor(job.status)} cursor-pointer rounded-lg shadow-md border p-4 transition-all duration-300 hover:shadow-lg ${
              index === activeJobIndex ? "ring-2 ring-blue-500 transform scale-[1.02]" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{job.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusClasses(job.status)}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="line-clamp-1">{job.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ${job.payOffered} per hour
              </div>
              
              <div className="flex items-center text-gray-600 text-xs mt-2">
                {formatDistanceToNow(new Date(job.dateTime), { addSuffix: true })}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow-lg border border-gray-100">
        {activeJob && (
          <>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{activeJob.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusClasses(activeJob.status)}`}>
                {activeJob.status.charAt(0).toUpperCase() + activeJob.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {activeJob.location}
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ${activeJob.payOffered} per hour
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {activeJob.duration} hour(s)
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDistanceToNow(new Date(activeJob.dateTime), { addSuffix: true })}
              </div>
            </div>
            
            {activeJob.description && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{activeJob.description}</p>
              </div>
            )}
            
            <div className="mt-6 flex justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveJobIndex((prev) => (prev > 0 ? prev - 1 : jobs.length - 1))}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => setActiveJobIndex((prev) => (prev < jobs.length - 1 ? prev + 1 : 0))}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm">
                Edit Job
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const JobPostList = () => {
  const { data: jobPosts, isLoading, error } = useGetJobPosts();

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-2">Failed to load job posts</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Job Posts</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm">
          Create New Job
        </button>
      </div>

      {!jobPosts || jobPosts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="mt-2 text-gray-600">No job posts found.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Create Your First Job
          </button>
        </div>
      ) : (
        <JobPostVisualizer jobs={jobPosts} />
      )}
    </div>
  );
};

export default JobPostList;
