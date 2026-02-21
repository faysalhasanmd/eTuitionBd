import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyAppliedTuition = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://etuitionbd-zeta.vercel.app/applications/tutor/${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => setApplications(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const res = await fetch(
      `https://etuitionbd-zeta.vercel.app/applications/${id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();

    if (data.deletedCount > 0) {
      setApplications(applications.filter((app) => app._id !== id));
    }
  };

  const handleUpdate = async (id) => {
    const res = await fetch(
      `https://etuitionbd-zeta.vercel.app/applications/update/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expectedSalary: salary }),
      },
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      setEditingId(null);
      window.location.reload();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        My Applied Tuitions
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Title</th>
              <th>Student</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="font-semibold">{app.tuitionTitle}</td>
                <td>{app.studentName}</td>
                <td>{app.location}</td>

                <td>
                  {editingId === app._id ? (
                    <input
                      type="number"
                      defaultValue={app.expectedSalary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="input input-bordered w-24"
                    />
                  ) : (
                    `৳${app.expectedSalary}`
                  )}
                </td>

                <td>
                  <span
                    className={`font-semibold ${
                      app.status === "Pending"
                        ? "text-yellow-500"
                        : app.status === "Approved"
                          ? "text-green-600"
                          : "text-red-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td>{new Date(app.appliedAt).toLocaleDateString()}</td>

                <td>
                  {app.status === "Pending" && (
                    <div className="flex gap-2">
                      {editingId === app._id ? (
                        <button
                          onClick={() => handleUpdate(app._id)}
                          className="btn btn-sm btn-success"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(app._id);
                            setSalary(app.expectedSalary);
                          }}
                          className="btn btn-sm btn-info"
                        >
                          Update
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppliedTuition;
