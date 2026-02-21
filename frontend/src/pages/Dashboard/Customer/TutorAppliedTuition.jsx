import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const TutorAppliedTuition = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const defaultAvatar = "https://i.ibb.co/4pDNDk1/avatar.png";

  // 🔹 Load Applications
  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);
    fetch(
      `https://etuitionbd-zeta.vercel.app/applications/student/${userEmail}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load applications");
        setLoading(false);
      });
  }, [userEmail]);

  // 🔹 Reject Application
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `https://etuitionbd-zeta.vercel.app/applications/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app,
          ),
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // 🔹 Payment Handler (FIXED)
  const handlePayment = async (app) => {
    try {
      const res = await fetch(
        "https://etuitionbd-zeta.vercel.app/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(app), // ✅ FIXED HERE
        },
      );

      const data = await res.json();

      if (data.success && data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert("Failed to create payment session");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-indigo-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Applied Tutors
        </h2>

        {error && <p className="text-center text-red-500 mb-6">{error}</p>}

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">No tutor applications yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-300">
                      <img
                        src={app.tutorImage || defaultAvatar}
                        alt={app.tutorName}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = defaultAvatar)}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{app.tutorName}</h3>
                      <p className="text-sm text-gray-500">{app.tutorEmail}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Qualification:</span>{" "}
                      {app.qualification}
                    </p>
                    <p>
                      <span className="font-medium">Experience:</span>{" "}
                      {app.experience}
                    </p>
                    <p>
                      <span className="font-medium">Expected Salary:</span>{" "}
                      <span className="text-indigo-600 font-semibold">
                        {app.expectedSalary} BDT
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-500">
                    Status:{" "}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-600"
                        : app.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                {/* Buttons */}
                {app.status === "Pending" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowModal(true);
                      }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleStatusChange(app._id, "Rejected")}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Payment Modal */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-50">
              <h3 className="text-xl font-semibold mb-4">Confirm Payment</h3>

              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>Tutor:</strong> {selectedApp.tutorName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedApp.tutorEmail}
                </p>
                <p>
                  <strong>Salary:</strong> {selectedApp.expectedSalary} BDT
                </p>
                <p>
                  <strong>Tuition ID:</strong> {selectedApp.tuitionId}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handlePayment(selectedApp)}
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                >
                  Pay & Accept
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorAppliedTuition;
