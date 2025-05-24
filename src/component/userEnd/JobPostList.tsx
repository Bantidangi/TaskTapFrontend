import React from "react";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { BASE_URL } from "../utils/exports";

interface JobPost {
  _id: string;no
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
      return res.data.jobs;
    } catch (error) {
      toast.error("Failed to fetch job posts");
      throw error;
    }
  };

  return useQuery({
    queryKey: ["jobPosts"],
    queryFn: fetchJobs,
  });
};

const JobStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "running":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles()} border`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const JobCard = ({ job }: { job: JobPost }) => (
  <div className="p-5 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
      <JobStatusBadge status={job.status} />
    </div>
    
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="flex items-center text-sm text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {job.location}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ${job.payOffered}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {job.duration} hour(s)
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {new Date(job.dateTime).toLocaleString()}
      </div>
    </div>
    
    {job.description && (
      <p className="text-sm text-gray-700 mt-2 line-clamp-2">{job.description}</p>
    )}
    
    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
        View Details
      </button>
    </div>
  </div>
);

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
        <div className="flex gap-2">
          <select className="px-3 py-2 border rounded-md text-sm">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm">
            Create New Job
          </button>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobPosts.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostList;
