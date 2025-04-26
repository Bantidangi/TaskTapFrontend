import React from "react";
import providerGetJobList from "./getOnJobHTTP/providerGetJob";
import useAcceptMutation from "./getOnJobHTTP/useProviderJobMutation";

const JobApplications = () => {
  const { data = [], isLoading, isError } = providerGetJobList();

  const { mutate, isPending } = useAcceptMutation();
  const handleJobAppccept = (id) => {
    mutate(id);
  };


  if (isLoading) {
    return <div className="p-6">Loading tasks...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed to load tasks.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Posted Tasks</h2>
      <div className="grid gap-4">
        {data.map((task) => (
          <div
            key={task._id}
            className="p-5 bg-white shadow rounded-lg border hover:shadow-md transition"
          >
            <h3 className="text-lg font-bold mb-2">{task.title}</h3>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Description:</strong> {task.description}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Location:</strong> {task.location}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Date and Time:</strong>{" "}
              {new Date(task.dateTime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Duration:</strong> {task.duration} hours
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Pay Offered:</strong> ${task.payOffered}
            </p>

            {/* Show Accept button if applications exist */}
            {task.applications && task.applications.length > 0 && (
              <button
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => handleJobAppccept(task._id)}
              >
                Accept
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplications;
