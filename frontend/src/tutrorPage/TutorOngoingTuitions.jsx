import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { AuthContext } from "../providers/AuthContext";

const TutorOngoingTuitions = () => {
  const { user } = useContext(AuthContext);
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`https://tuitionsbd.vercel.app/tutor/ongoing/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTuitions(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 mt-9">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-10 border-b pb-3 text-indigo-600">
        📚 Tutor Ongoing Tuitions
      </h2>

      {/* Empty State */}
      {tuitions.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-600">
            😔 No Accepted Tuitions Found
          </h3>
          <p className="text-gray-400 mt-2">
            Once a student accepts and completes payment, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="group bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="max-w-[70%]">
                  <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
                    {tuition.tutorName}
                  </h3>
                  <p className="text-sm text-gray-500 break-words mt-1">
                    {tuition.tutorEmail}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    tuition.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : tuition.status === "Accepted"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                  }`}
                >
                  {tuition.status === "Pending"
                    ? "⏳ Pending"
                    : tuition.status === "Accepted"
                      ? " Active"
                      : "Closed"}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-3 text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  🎓 <span className="font-semibold">Qualification:</span>{" "}
                  {tuition.qualification || "Not Provided"}
                </p>

                <p className="flex items-center gap-2">
                  💰 <span className="font-semibold">Salary:</span> ৳
                  {tuition.expectedSalary}
                </p>

                <p className="flex items-center gap-2">
                  📅 <span className="font-semibold">Applied:</span>{" "}
                  {tuition.appliedAt
                    ? new Date(tuition.appliedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Footer Button */}
              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-md">
                  🚀 Mark as Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorOngoingTuitions;
