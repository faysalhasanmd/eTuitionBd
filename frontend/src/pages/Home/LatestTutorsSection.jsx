import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const LatestTutorsSection = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tuitionsbd.vercel.app/users/latest-tutors")
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // 🔄 Skeleton Loading
  if (loading) {
    return (
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow animate-pulse overflow-hidden"
            >
              <div className="h-56 bg-gray-300"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-300 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-6">
        {/* 🧩 Tutors Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <div
              data-aos="fade-up"
              key={tutor._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* 🖼 Image with overlay */}
              <div className="relative overflow-hidden">
                {tutor.image ? (
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="h-56 w-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="h-56 w-full flex items-center justify-center bg-indigo-500 text-white text-4xl font-bold">
                    {tutor.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              </div>

              {/* 📄 Content */}
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {tutor.name}
                </h3>

                <p className="text-gray-600 text-sm">
                  📘Subject {tutor.subjects || "Unknown"}
                </p>
                <p className="text-gray-600 text-sm">
                  🎓 Qualification {tutor.education || "Unknown"}
                </p>
                <p className="text-gray-600 text-sm">
                  📍Location {tutor.location || "Unknown"}
                </p>

                {/* 🚀 Button */}
                <Link to={`/tutors/${tutor._id}`}>
                  <button className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2.5 rounded-xl transition duration-300 shadow-md hover:shadow-lg">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTutorsSection;
