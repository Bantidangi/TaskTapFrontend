import React from "react";

const completedJobs = [
  {
    id: 1,
    title: "Logo Design",
    company: "DesignPro Studios",
    completedOn: "March 10, 2025",
    earnings: "$150",
  },
  {
    id: 2,
    title: "Landing Page Development",
    company: "TechNova",
    completedOn: "March 5, 2025",
    earnings: "$400",
  },
  {
    id: 3,
    title: "Blog Writing",
    company: "Wordify",
    completedOn: "March 2, 2025",
    earnings: "$80",
  },
];

const CompletedJobs = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Completed Jobs</h2>
      <div className="grid gap-4">
        {completedJobs.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md border"
          >
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">
              Completed on: {job.completedOn}
            </p>
            <p className="text-sm font-medium mt-1 text-green-600">
              Earned: {job.earnings}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedJobs;
