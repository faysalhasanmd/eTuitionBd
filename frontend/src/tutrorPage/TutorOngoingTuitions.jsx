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
    fetch(`http://localhost:3000/tutor/ongoing/${user.email}`)
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
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-8 border-b pb-3 text-indigo-600">
        Tutor Ongoing Tuitions
      </h2>

      {/* Empty State */}
      {tuitions.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold text-gray-600">
            No Accepted Tuitions Found
          </h3>
          <p className="text-gray-400 mt-2">
            Once a student accepts and completes payment, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border p-6 flex flex-col justify-between break-words overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="max-w-[70%]">
                  <h3 className="text-xl font-bold text-indigo-700 truncate">
                    {tuition.tutorName}
                  </h3>
                  <p className="text-sm text-gray-500 break-words">
                    {tuition.tutorEmail}
                  </p>
                </div>

                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-600 whitespace-nowrap">
                  {tuition.status}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-2 text-gray-700 text-sm break-words">
                <p>
                  <span className="font-semibold">Qualification:</span>{" "}
                  {tuition.qualification || "Not Provided"}
                </p>

                <p>
                  <span className="font-semibold">Expected Salary:</span> ৳
                  {tuition.expectedSalary}
                </p>

                <p>
                  <span className="font-semibold">Applied Date:</span>{" "}
                  {tuition.appliedAt
                    ? new Date(tuition.appliedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-5">
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                  Mark as Completed
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
