import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const TutorAppliedTuition = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultAvatar = "https://i.ibb.co/4pDNDk1/avatar.png";

  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);

    fetch(`http://localhost:3000/applications/student/${userEmail}`)
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

  // 🔥 Accept / Reject Handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        const updatedApplications = applications.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app,
        );
        setApplications(updatedApplications);
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Applied Tutors
        </h2>

        {error && <p className="text-center text-red-500 mb-6">{error}</p>}

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">No tutor applications yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    {/* Image with Fallback */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={app.tutorImage || defaultAvatar}
                        alt={app.tutorName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = defaultAvatar;
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {app.tutorName}
                      </h3>
                      <p className="text-sm text-gray-500">{app.tutorEmail}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-700">
                        Qualification:
                      </span>{" "}
                      {app.qualification}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Experience:
                      </span>{" "}
                      {app.experience}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Expected Salary:
                      </span>{" "}
                      <span className="text-indigo-600 font-semibold">
                        {app.expectedSalary} BDT
                      </span>
                    </p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">
                      Status:
                    </span>{" "}
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

                  {app.status === "Pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleStatusChange(app._id, "Accepted")}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition duration-200"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleStatusChange(app._id, "Rejected")}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorAppliedTuition;
