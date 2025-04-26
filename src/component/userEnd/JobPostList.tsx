import React, { useEffect, useState } from "react";
import axios from "axios";

const JobPostList = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/getAllJob");
        setJobPosts(res.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="p-4">Loading job posts...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Job Posts</h2>

      {jobPosts.length === 0 ? (
        <p>No job posts found.</p>
      ) : (
        <div className="grid gap-4">
          {jobPosts.map((job) => (
            <div
              key={job._id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md border"
            >
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Location: {job.location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Pay: ${job.payOffered}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Duration: {job.duration} hour(s)
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Date & Time: {new Date(job.dateTime).toLocaleString()}
              </p>
              <p
                className={`text-sm font-medium mt-1 ${
                  job.status === "completed"
                    ? "text-green-600"
                    : job.status === "running"
                    ? "text-yellow-600"
                    : "text-blue-600"
                }`}
              >
                Status: {job.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostList;
