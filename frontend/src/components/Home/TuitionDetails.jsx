import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FiMapPin,
  FiUser,
  FiBookOpen,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiMail,
} from "react-icons/fi";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AuthContext } from "../../providers/AuthContext";
import useRole from "../../hooks/useRole";

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const [role] = useRole();

  // Fetch tuition details
  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const res = await fetch(`https://tuitionsbd.vercel.app/tuition/${id}`);
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

  // Apply Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const applicationData = {
      tuitionId: id,
      studentName: tuition?.studentName,
      location: tuition?.location,
      subject: tuition?.subject,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      qualification: form.qualification.value,
      experience: form.experience.value,
      expectedSalary: form.expectedSalary.value,
      status: "Pending",
      appliedAt: new Date(),
    };

    try {
      const res = await fetch("https://tuitionsbd.vercel.app/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (res.ok) {
        alert("✅ Application Submitted!");
        setOpen(false);
        form.reset();
      }
    } catch (err) {
      console.log(err);
      alert("❌ Failed to submit!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );

  if (!tuition)
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
        ❌ Tuition not found
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-5 py-2 rounded-3xl bg-lime-500 text-white shadow hover:scale-105 transition"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10">
        📚 Tuition Details
      </h1>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
        {/* Image */}
        <div className="relative h-80 group overflow-hidden">
          <img
            src={
              tuition.image ||
              "https://i.ibb.co/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg"
            }
            alt={tuition.subject}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold text-white">
              {tuition.studentName}
            </h2>
            <p className="text-gray-200 text-sm">📍 {tuition.location}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "📖", label: "Subject", value: tuition.subject },
              { icon: "🏫", label: "Class", value: tuition.class },

              {
                icon: "📧",
                label: "Student Email",
                value: tuition.studentEmail,
              },

              { icon: "📍", label: "Location", value: tuition.location },
              { icon: "💰", label: "Budget", value: tuition.budget + " Tk" },
              { icon: "🗓️", label: "Schedule", value: tuition.schedule },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-lime-50 hover:shadow-md transition"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>

                  {/* 🔥 Email clickable */}
                  {item.label === "Student Email" ? (
                    <a
                      href={`mailto:${item.value}`}
                      className="font-semibold text-lime-600 break-all hover:underline"
                    >
                      {item.value || "Not provided"}
                    </a>
                  ) : (
                    <p className="font-semibold text-gray-800 break-all">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">📝 Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {tuition.description}
            </p>
          </div>

          {/* Apply Button */}
          {role === "tutor" && (
            <button
              onClick={() => setOpen(true)}
              className="w-full py-3 text-lg font-semibold text-white rounded-xl bg-lime-500 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🚀 Apply for Tuition
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              ✍️ Apply Now
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                readOnly
                value={tuition?.studentName}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={tuition?.location}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={user?.displayName}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={user?.email}
                className="input input-bordered w-full"
              />

              <input
                name="qualification"
                placeholder="🎓 Qualification"
                required
                className="input input-bordered w-full"
              />
              <input
                name="experience"
                placeholder="💼 Experience"
                required
                className="input input-bordered w-full"
              />
              <input
                name="expectedSalary"
                placeholder="💰 Expected Salary"
                required
                className="input input-bordered w-full"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-lime-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;
