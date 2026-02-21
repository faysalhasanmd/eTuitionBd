import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const LatestTutorsSection = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://etuitionbd-zeta.vercel.app/users/latest-tutors")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
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
        Loading Latest Tutors...
      </div>
    );
  }

  return (
    <section className="py-20 bg-indigo-50">
      <div className="container mx-auto px-6">
        {/* Tutors Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor, index) => (
            <div
              key={tutor._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform transition duration-700 ease-out"
              style={{
                opacity: 0,
                transform: "translateY(32px)",
                animation: `fadeInUp 0.7s forwards`,
                animationDelay: `${index * 150}ms`,
              }}
            >
              <img
                src={tutor.image}
                alt={tutor.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {tutor.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  Subjects: {tutor.subjects || "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  Education: {tutor.education || "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  Location: {tutor.location || "N/A"}
                </p>
                <Link to={`/tutors/${tutor._id}`}>
                  <button className="mt-5 w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-300">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Keyframes Animation */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(32px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default LatestTutorsSection;
