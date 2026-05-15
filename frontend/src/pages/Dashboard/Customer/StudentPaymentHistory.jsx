import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const StudentPaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://tuitionsbd.vercel.app/payments/student/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-3 sm:p-6 mt-9">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-3 sm:p-6 border border-gray-200">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 text-indigo-700">
          Payment History
        </h2>

        {payments.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm sm:text-base">
            No payment history found.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              {/* Header */}
              <thead className="bg-gray-100 text-gray-700">
                <tr className="text-xs sm:text-sm">
                  <th className="py-3 px-3 sm:px-4 text-left border-b bg-lime-200 whitespace-nowrap">
                    💰 Amount
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-left border-b bg-lime-200 whitespace-nowrap">
                    💱 Currency
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-left border-b bg-lime-200 whitespace-nowrap">
                    💳 Method
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-left border-b bg-lime-200 whitespace-nowrap">
                    📊 Status
                  </th>
                  <th className="py-3 px-3 sm:px-4 text-left border-b bg-lime-200 whitespace-nowrap">
                    📅 Date
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="text-xs sm:text-sm">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      ৳ {payment.amount}
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      {payment.currency?.toUpperCase()}
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap capitalize">
                      {payment.paymentMethod}
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {payment.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPaymentHistory;
