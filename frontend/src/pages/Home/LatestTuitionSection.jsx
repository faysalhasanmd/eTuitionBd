import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const LatestTuitionSection = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://etuitionbd-zeta.vercel.app/tuition/latest")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setTuitions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (tuitions.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No Latest Tuition Found
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={tuition.image}
                alt={tuition.subject}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {tuition.subject} Tuition
                </h3>

                <p className="text-gray-600 mb-1">Class: {tuition.class}</p>

                <p className="text-gray-600 mb-1">
                  Location: {tuition.location}
                </p>

                <p className="text-lime-600 font-bold mb-4">
                  Budget: ৳{tuition.budget}
                </p>

                <button className="w-full bg-lime-500 text-white py-2 rounded-lg hover:bg-lime-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTuitionSection;
