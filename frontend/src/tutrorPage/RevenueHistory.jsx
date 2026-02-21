import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { AuthContext } from "../providers/AuthContext";

const RevenueHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:3000/payments/tutor/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch payments:", err);
        setLoading(false);
      });
  }, [user?.email]);

  // Total earnings calculation
  const totalEarnings = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 border-b pb-2 text-indigo-600">
        Revenue History
      </h2>

      {/* Total Earnings */}
      <div className="bg-indigo-600 text-white rounded-xl p-6 mb-6 shadow-md flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Total Earnings</h3>
          <p className="text-3xl font-bold mt-1">৳{totalEarnings} BDT</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-indigo-100">All-time earnings</p>
        </div>
      </div>

      {/* Empty State */}
      {payments.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold text-gray-600">
            No Payments Found
          </h3>
          <p className="text-gray-400 mt-2">
            Once a student completes payment, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-xl shadow-md border p-5 flex flex-col md:flex-row justify-between items-start md:items-center break-words"
            >
              {/* Left Column */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                <div>
                  <p className="text-gray-700 font-medium">
                    <span className="font-semibold">Session ID:</span>{" "}
                    {payment.sessionId}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {payment.paymentMethod}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    <span className="font-semibold">Date:</span>{" "}
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="text-right mt-4 md:mt-0">
                <p
                  className={`font-bold text-xl ${
                    payment.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {payment.currency.toUpperCase()} {payment.amount}
                </p>
                <p
                  className={`text-sm font-medium ${
                    payment.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {payment.paymentStatus.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RevenueHistory;
