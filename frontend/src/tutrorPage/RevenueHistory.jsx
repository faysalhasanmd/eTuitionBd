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
    fetch(`https://tuitionsbd.vercel.app/payments/tutor/${user.email}`)
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

  const totalEarnings = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const paidCount = payments.filter((p) => p.paymentStatus === "paid").length;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 mt-6 sm:mt-8 lg:mt-9">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">
          Revenue History
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-1">
          Track all your earnings from tutoring sessions
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Total Earnings Card */}
        <div className="sm:col-span-2 bg-indigo-600 text-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-indigo-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-indigo-200 text-xs sm:text-sm font-medium uppercase tracking-widest mb-1">
              Total Earnings
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold leading-none">
              ৳{totalEarnings.toLocaleString()}
            </p>
            <p className="text-indigo-300 text-xs sm:text-sm mt-1">
              BDT · All time
            </p>
          </div>
          <div className="bg-indigo-500/50 rounded-xl p-3 sm:p-4 text-center min-w-[90px]">
            <p className="text-2xl sm:text-3xl font-bold">{payments.length}</p>
            <p className="text-indigo-200 text-xs mt-1 uppercase tracking-wide">
              Transactions
            </p>
          </div>
        </div>

        {/* Paid Count Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start gap-2">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-1">
              Paid
            </p>
            <p className="text-3xl font-extrabold text-green-600">
              {paidCount}
            </p>
          </div>
          <div className="bg-green-50 rounded-full px-3 py-1">
            <span className="text-green-600 text-xs font-semibold">
              {payments.length > 0
                ? Math.round((paidCount / payments.length) * 100)
                : 0}
              % success
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-16 sm:py-24 px-6">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.42 0-8-1.79-8-4V6c0-2.21 3.58-4 8-4s8 1.79 8 4v8c0 2.21-3.58 4-8 4z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-700">
            No Payments Yet
          </h3>
          <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xs mx-auto">
            Once a student completes payment, it will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table — hidden on mobile */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    Session ID
                  </th>
                  <th className="text-left px-6 py-4 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    Method
                  </th>
                  <th className="text-left px-6 py-4 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-mono text-slate-700 text-xs">
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-600 break-all">
                        {payment.sessionId}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 capitalize">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          payment.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            payment.paymentStatus === "paid"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        {payment.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-bold text-base ${
                          payment.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {payment.currency?.toUpperCase()} {payment.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tablet Cards — sm to lg */}
          <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col justify-between gap-4"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">
                      Session ID
                    </p>
                    <p className="font-mono text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded break-all">
                      {payment.sessionId}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      payment.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        payment.paymentStatus === "paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    {payment.paymentStatus.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 capitalize">
                      {payment.paymentMethod}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <p
                    className={`font-bold text-xl ${
                      payment.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {payment.currency?.toUpperCase()} {payment.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cards — xs only */}
          <div className="flex flex-col gap-3 sm:hidden">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
              >
                {/* Top row: status badge + amount */}
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      payment.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        payment.paymentStatus === "paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    {payment.paymentStatus.toUpperCase()}
                  </span>
                  <p
                    className={`font-bold text-lg ${
                      payment.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {payment.currency?.toUpperCase()} {payment.amount}
                  </p>
                </div>

                {/* Session ID */}
                <div className="mb-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">
                    Session ID
                  </p>
                  <p className="font-mono text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded break-all">
                    {payment.sessionId}
                  </p>
                </div>

                {/* Method + Date */}
                <div className="flex justify-between items-center text-xs text-slate-400 mt-2 pt-2 border-t border-slate-50">
                  <span className="capitalize">{payment.paymentMethod}</span>
                  <span>
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueHistory;
