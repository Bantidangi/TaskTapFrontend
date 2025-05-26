import React, { useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import useGetJobList from "./appliedHTTP/useGetJobList";
import useCompleteMutation from "./appliedHTTP/useCompleteMutation";

interface Job {
  id: string;
  jobName: string;
  postedBy: string;
  appliedAt: string;
  status: "pending" | "confirmed" | "inProgress" | "cancelled" | "completed";
  description?: string;
  location?: string;
  payOffered?: number;
}

const StatusBadge: React.FC<{ status: Job["status"] }> = ({ status }) => {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pending" },
    confirmed: { color: "bg-green-100 text-green-800 border-green-200", label: "Confirmed" },
    inProgress: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "In Progress" },
    cancelled: { color: "bg-red-100 text-red-800 border-red-200", label: "Cancelled" },
    completed: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Completed" }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color} border`}>
      {config.label}
    </span>
  );
};

const AppliedJobs: React.FC = () => {
  const { data, isLoading, isError } = useGetJobList();
  const { mutateAsync, isPending } = useCompleteMutation();

  const [isProccesing , setIsProccesing] = useState(false)

  const handleComplete = (id: string) => {
    setIsProccesing(true)
    mutateAsync(id).then(()=>{
      setIsProccesing(false)
    })
  };

  const sortedJobs = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      // Sort by status priority: inProgress first, then confirmed, then pending, then others
      const statusPriority: Record<string, number> = {
        inProgress: 1,
        confirmed: 2,
        pending: 3,
        completed: 4,
        cancelled: 5
      };
      return (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99);
    });
  }, [data]);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-medium">Failed to load applied jobs.</p>
          <p className="text-sm mt-1">Please try again later or contact support if the issue persists.</p>
        </div>
      </div>
    );
  }

  if (sortedJobs.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
        <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-600">You haven't applied to any jobs yet.</p>
          <p className="text-sm text-gray-500 mt-1">Browse available jobs to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Applied Jobs</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedJobs.map((job: Job) => (
          <div
            key={job.id}
            className="p-5 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {job.jobName || "Untitled Job"}
              </h3>
              <StatusBadge status={job.status} />
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                {job.postedBy || "Unknown"}
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {formatDistanceToNow(new Date(job.appliedAt), { addSuffix: true })}
              </p>
            </div>

            {job.status === "inProgress"  && (
              <button
                onClick={() => handleComplete(job.jobId)}
                disabled={isPending}
                className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center">
                {isProccesing === job?.jobId ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Mark as Completed"
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
