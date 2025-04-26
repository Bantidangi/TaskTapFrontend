import React from "react";

const runningJobs = [
  {
    id: 1,
    title: "Full Stack Developer",
    client: "Acme Corp",
    startedAt: "April 1, 2025",
    deadline: "April 20, 2025",
    status: "In Progress",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    client: "Creative Studio",
    startedAt: "March 28, 2025",
    deadline: "April 15, 2025",
    status: "On Hold",
  },
  {
    id: 3,
    title: "SEO Optimization",
    client: "Digital Boost",
    startedAt: "April 5, 2025",
    deadline: "April 25, 2025",
    status: "In Progress",
  },
];

const RunningJob = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Running Jobs</h2>
      <div className="grid gap-4">
        {runningJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow border rounded-lg p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <span
                className={`text-sm px-2 py-1 rounded-full font-medium ${
                  job.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {job.status}
              </span>
            </div>
            <p className="text-sm text-gray-700">Client: {job.client}</p>
            <p className="text-sm text-gray-500">
              Start Date: {job.startedAt}
            </p>
            <p className="text-sm text-gray-500">
              Deadline: {job.deadline}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningJob;
