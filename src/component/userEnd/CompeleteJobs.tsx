import React from "react";
import getJobCompleted from "./getOnJobHTTP/getCompletedJobs";

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
  const { data: completedJobs, isLoading } = getJobCompleted();
   if(isLoading){
    return <div>...Loading</div>
   }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Completed Jobs</h2>
      <div className="grid gap-4">
        {completedJobs.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md border">
            <h3 className="text-lg font-bold">{job.jobId.title}</h3>
            <p className="text-sm text-gray-600">{job.jobId.description}</p>
            <p className="text-sm text-gray-500">
              Completed on:{" "}
              {new Date(job.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedJobs;
