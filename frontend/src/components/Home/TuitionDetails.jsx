import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";

// react-icons
import {
  FiMapPin,
  FiUser,
  FiBookOpen,
  FiCalendar,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AuthContext } from "../../providers/AuthContext";
import useRole from "../../hooks/useRole";

const TuitionDetails = () => {
  const { id } = useParams();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();
  console.log(typeof role);
  console.log("hello details");

  // Fetch tuition details
  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const res = await fetch(
          `https://etuitionbd-zeta.vercel.app/tuition/${id}`,
        );
        const data = await res.json();
        setTuition(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchTuition();
  }, [id]);

  // Handle Apply Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const applicationData = {
      tuitionId: id,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      qualification: form.qualification.value,
      experience: form.experience.value,
      expectedSalary: form.expectedSalary.value,
      status: "Pending",
      appliedAt: new Date(),
    };

    try {
      const res = await fetch(
        "https://etuitionbd-zeta.vercel.app/applications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(applicationData),
        },
      );

      if (res.ok) {
        alert("Application Submitted!");
        setOpen(false);
        form.reset();
      }
    } catch (err) {
      console.log(err);
      alert("Failed to submit application!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
        <LoadingSpinner />
      </div>
    );

  if (!tuition)
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
        Tuition not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Tuition Details
      </h1>

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src={
              tuition.image ||
              "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg"
            }
            alt={tuition.subject || "Tuition Image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <h2 className="absolute bottom-4 left-4 text-2xl font-semibold text-white drop-shadow-lg">
            {tuition.studentName}
          </h2>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-center gap-3">
              <FiBookOpen className="w-5 h-5 text-lime-600" />
              <p className="text-gray-700">
                <span className="font-semibold">Subject:</span>{" "}
                {tuition.subject}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FiUser className="w-5 h-5 text-lime-600" />
              <p className="text-gray-700">
                <span className="font-semibold">Class:</span> {tuition.class}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FiMapPin className="w-5 h-5 text-lime-600" />
              <p className="text-gray-700">
                <span className="font-semibold">Location:</span>{" "}
                {tuition.location}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FiDollarSign className="w-5 h-5 text-lime-600" />
              <p className="text-gray-700">
                <span className="font-semibold">Budget:</span> {tuition.budget}{" "}
                Tk
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FiCalendar className="w-5 h-5 text-lime-600" />
              <p className="text-gray-700">
                <span className="font-semibold">Schedule:</span>{" "}
                {tuition.schedule}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <FiFileText className="w-5 h-5 text-lime-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Description
              </h3>
            </div>
            <p className="text-gray-700 leading-6">{tuition.description}</p>
          </div>

          {/* Apply Button */}
          {role === "Tutor" && (
            <button
              onClick={() => setOpen(true)}
              className="w-full p-3 mt-3 font-medium text-white bg-lime-500 rounded-md"
            >
              Apply for Tuition
            </button>
          )}

          {/* Apply Modal */}
          {open && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                  Apply for Tuition
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    readOnly
                    value={user?.displayName}
                    className="border p-2 w-full rounded"
                  />
                  <input
                    readOnly
                    value={user?.email}
                    className="border p-2 w-full rounded"
                  />
                  <input
                    name="qualification"
                    placeholder="Qualification"
                    required
                    className="border p-2 w-full rounded"
                  />
                  <input
                    name="experience"
                    placeholder="Experience"
                    required
                    className="border p-2 w-full rounded"
                  />
                  <input
                    name="expectedSalary"
                    placeholder="Expected Salary"
                    required
                    className="border p-2 w-full rounded"
                  />
                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-lime-500 text-white rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
