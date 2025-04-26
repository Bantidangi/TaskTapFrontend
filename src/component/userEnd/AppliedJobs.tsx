import React from "react";
import useGetJobList from "./appliedHTTP/useGetJobList";
import useAcceptMutation from "./getOnJobHTTP/useProviderJobMutation";
import useCompleteMutation from "./appliedHTTP/useCompleteMutation";

const AppliedJobs = () => {
  const { data, isLoading, isError } = useGetJobList();
  const { mutate, isPending } = useCompleteMutation();
  const handleComplete = (id) => {
    mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Failed to load applied jobs.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
      <div className="grid gap-4">
        {data.map((job, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md border">
            <h3 className="text-lg font-bold">
              {job.jobName || "Untitled Job"}
            </h3>
            <p className="text-sm text-gray-600">
              Posted By: {job.postedBy || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              Applied on: {new Date(job.appliedAt).toLocaleDateString()}
            </p>
            <p
              className={`text-sm font-medium mt-1 ${
                job.status === "cancelled"
                  ? "text-red-600"
                  : job.status === "confirmed"
                  ? "text-green-600"
                  : job.status === "inProgress"
                  ? "text-blue-600"
                  : "text-yellow-600"
              }`}>
              Status: {job.status}
            </p>

            {job.status === "inProgress" && (
              <button
                onClick={() => handleComplete(job.id)}
                className="mt-3 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                Mark as Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
