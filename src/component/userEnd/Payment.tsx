import React from 'react';

const Payment = () => {
  const payments = [
    {
      id: 1,
      date: '2025-04-01',
      job: 'UI Design for App',
      amount: '$250',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2025-03-20',
      job: 'Landing Page Development',
      amount: '$400',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2025-03-10',
      job: 'SEO Optimization',
      amount: '$150',
      status: 'Pending',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Payment History</h2>
      <h1>Coming Soon</h1>
      {/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Job</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t text-sm hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">{payment.job}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Payment;
