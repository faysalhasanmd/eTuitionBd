import { useEffect, useState } from "react";

const TutorAppliedTuition = ({ tuitionId }) => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    const res = await fetch(
      `http://localhost:3000/applications/tuition/${tuitionId}`
    );
    const data = await res.json();
    setApplications(data);
  };

  useEffect(() => {
    fetchApplications();
  }, [tuitionId]);

  const handleApprove = async (id) => {
    await fetch(`http://localhost:3000/applications/approve/${id}`, {
      method: "PUT",
    });
    fetchApplications();
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:3000/applications/reject/${id}`, {
      method: "PUT",
    });
    fetchApplications();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tutor Applications</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-bold">{app.tutorName}</h3>
            <p>Email: {app.tutorEmail}</p>
            <p>Qualification: {app.qualification}</p>
            <p>Experience: {app.experience}</p>
            <p>Expected Salary: {app.expectedSalary}</p>
            <p>Status: {app.status}</p>
            <div className="flex gap-4 mt-3">
              {app.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleApprove(app._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorAppliedTuition;
