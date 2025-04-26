import React from 'react'


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

      const jobApplications = [
    {
      id: 1,
      title: "Move Furniture",
      applicant: "Alice Smith",
      status: "Pending",
      appliedDate: "2025-03-22",
    },
    {
      id: 2,
      title: "Clean Garage",
      applicant: "Bob Johnson",
      status: "Pending",
      appliedDate: "2025-03-23",
    },
  ];

  const runningJobs = [
    {
      id: 3,
      title: "Paint Room",
      worker: "Charlie Brown",
      progress: "50%",
      startDate: "2025-03-21",
    },
  ];
  const completedJobs = [
    {
      id: 4,
      title: "Fix Sink",
      worker: "Dana White",
      date: "2025-03-20",
      pay: "$40",
    },
  ];
  const paymentHistory = [
    {
      id: 5,
      title: "Move Furniture",
      amount: "$60",
      date: "2025-03-18",
      status: "Paid",
    },
    {
      id: 6,
      title: "Clean Garage",
      amount: "$50",
      date: "2025-03-19",
      status: "Pending",
    },
  ];




  return (
    <div className=''>
      <DashboardSection id="dashboard" title="Dashboard Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Applications"
            value={jobApplications.length}
            color="bg-blue-100"
          />
          <StatCard
            label="Running Jobs"
            value={runningJobs.length}
            color="bg-yellow-100"
          />
          <StatCard
            label="Completed Jobs"
            value={completedJobs.length}
            color="bg-green-100"
          />
          <StatCard
            label="Pending Payments"
            value={paymentHistory.filter((p) => p.status === "Pending").length}
            color="bg-red-100"
          />
        </div>
      </DashboardSection>
    </div>
  )
}

export default DashboardOverview;
