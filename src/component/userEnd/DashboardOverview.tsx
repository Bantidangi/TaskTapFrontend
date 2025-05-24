import React from "react";
import useGerDashboard from "./dashboardHTTP/useGerDashboard";

const DashboardSection = ({ id, title, children }) => (
  <section id={id} className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
    {children}
  </section>
);

const StatCard = ({ label, value, color }) => (
  <div className={`${color} p-4 rounded-lg text-center`}>
    <p className="text-gray-600 font-medium">{label}</p>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const DashboardOverview = () => {
  const { data, isLoading, error } = useGerDashboard();
  
  // Extract the dashboard data from data?.data or provide defaults
  const dashboardData = data?.data || {
    stats: {
      applications: 0,
      runningJobs: 0,
      completedJobs: 0,
      pendingPayments: 0,
    },
    jobApplications: [],
    runningJobs: [],
    completedJobs: [],
    paymentHistory: [],
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  const {
    stats,
    jobApplications,
    runningJobs,
    completedJobs,
    paymentHistory,
  } = dashboardData;

  return (
    <div className="">
      <DashboardSection id="dashboard" title="Dashboard Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Applications"
            value={stats.applications}
            color="bg-blue-100"
          />
          <StatCard
            label="Running Jobs"
            value={stats.runningJobs}
            color="bg-yellow-100"
          />
          <StatCard
            label="Completed Jobs"
            value={stats.completedJobs}
            color="bg-green-100"
          />
          <StatCard
            label="Pending Payments"
            value={stats.pendingPayments}
            color="bg-red-100"
          />
        </div>
      </DashboardSection>

      {/* Additional dashboard sections */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardSection id="applications" title="Recent Applications">
          {jobApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant/Employer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobApplications.map((app) => (
                    <tr key={app.id || app._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{app.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{app.applicant || app.employer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            app.status === 'applied' ? 'bg-blue-100 text-blue-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(app.appliedDate || app.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent applications</p>
          )}
        </DashboardSection>

        <DashboardSection id="running-jobs" title="Running Jobs">
          {runningJobs.length > 0 ? (
            <div className="space-y-4">
              {runningJobs.map((job) => (
                <div key={job.id || job._id} className="border-l-4 border-yellow-500 pl-4 py-2">
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-600">With: {job.worker || job.employer}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: job.progress || '50%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Started on {new Date(job.startDate || job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No running jobs</p>
          )}
        </DashboardSection>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardSection id="completed-jobs" title="Completed Jobs">
          {completedJobs.length > 0 ? (
            <div className="space-y-3">
              {completedJobs.map((job) => (
                <div key={job.id || job._id} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{job.title}</h3>
                    <span className="font-bold">{job.pay || `$${job.payOffered || '0'}`}</span>
                  </div>
                  <p className="text-sm text-gray-600">With: {job.worker || job.employer}</p>
                  <p className="text-xs text-gray-500">
                    Completed on {new Date(job.date || job.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No completed jobs</p>
          )}
        </DashboardSection>

        <DashboardSection id="payments" title="Payment History">
          {paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id || payment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.amount || `$${payment.payOffered || '0'}`}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(payment.date || payment.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {payment.status || 'Paid'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No payment history</p>
          )}
        </DashboardSection>
      </div>
    </div>
  );
};

export default DashboardOverview;