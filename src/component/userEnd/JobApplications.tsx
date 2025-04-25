import React from "react";

const jobApplications = [
  {
    id: 1,
    applicant: "John Doe",
    jobTitle: "Backend Developer",
    submittedAt: "April 8, 2025",
    resume: "johndoe_resume.pdf",
    status: "Pending",
  },
  {
    id: 2,
    applicant: "Sarah Kim",
    jobTitle: "Marketing Specialist",
    submittedAt: "April 6, 2025",
    resume: "sarahkim_cv.pdf",
    status: "Reviewed",
  },
  {
    id: 3,
    applicant: "Ahmed Khan",
    jobTitle: "Graphic Designer",
    submittedAt: "April 4, 2025",
    resume: "ahmedkhan_portfolio.pdf",
    status: "Interview Scheduled",
  },
];

const JobApplications = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Job Applications</h2>
      <div className="grid gap-4">
        {jobApplications.map((app) => (
          <div
            key={app.id}
            className="p-5 bg-white shadow rounded-lg border hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{app.applicant}</h3>
              <span
                className={`text-sm px-2 py-1 rounded-full font-medium ${
                  app.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "Reviewed"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {app.status}
              </span>
            </div>
            <p className="text-sm text-gray-700">
              Applied for: <span className="font-medium">{app.jobTitle}</span>
            </p>
            <p className="text-sm text-gray-500">Submitted: {app.submittedAt}</p>
            <a
              href="#"
              className="text-sm text-indigo-600 underline mt-2 inline-block"
            >
              View Resume ({app.resume})
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplications;
