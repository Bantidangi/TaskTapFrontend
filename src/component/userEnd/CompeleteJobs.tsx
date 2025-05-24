import React, { useState } from "react";
import getJobCompleted from "./getOnJobHTTP/getCompletedJobs";

interface CompletedJob {
  id: string;
  jobId: string;
  title: string;
  description: string;
  location: string;
  dateTime: string;
  duration: number;
  payOffered: number;
  completedAt: string;
  role: string;
  employer?: string;
}

interface CompletedJobsData {
  asWorker: CompletedJob[];
  asEmployer: CompletedJob[];
}

const CompletedJobs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"worker" | "employer">("worker");
  const { data, isLoading } = getJobCompleted();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  
  const completedJobsData = data as CompletedJobsData;
  
  const hasWorkerJobs = completedJobsData?.asWorker?.length > 0;
  const hasEmployerJobs = completedJobsData?.asEmployer?.length > 0;
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Completed Jobs</h2>
      
      {/* Tabs */}
      {(hasWorkerJobs || hasEmployerJobs) && (
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === "worker" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("worker")}
          >
            Jobs I Worked On
          </button>
          {/* <button
            className={`px-4 py-2 ${activeTab === "employer" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("employer")}
          >
            Jobs I Posted
          </button> */}
        </div>
      )}
      
      {/* Worker Jobs */}
      {activeTab === "worker" && (
        <div className="grid gap-4">
          {hasWorkerJobs ? (
            completedJobsData.asWorker.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md border"
              >
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.description}</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Employer</p>
                    <p className="text-sm">{job.employer || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm">{job.duration} hours</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment</p>
                    <p className="text-sm font-semibold">${job.payOffered}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Completed on:{" "}
                  {new Date(job.completedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              You haven't completed any jobs as a worker yet.
            </div>
          )}
        </div>
      )}
      
      {/* Employer Jobs */}
      {activeTab === "employer" && (
        <div className="grid gap-4">
          {hasEmployerJobs ? (
            completedJobsData.asEmployer.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md border"
              >
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.description}</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm">{job.duration} hours</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment</p>
                    <p className="text-sm font-semibold">${job.payOffered}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Completed on:{" "}
                  {new Date(job.completedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              You haven't completed any jobs as an employer yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompletedJobs;
