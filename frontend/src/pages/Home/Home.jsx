import { useEffect, useState } from "react";
import Tuition from "../../components/Home/Tuition";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import HeroSection from "./HeroSection";
import LatestTuitionSection from "./LatestTuitionSection";
import LatestTutorsSection from "./LatestTutorsSection";

const Home = () => {
  const [approvedTuitions, setApprovedTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/tuition?status=Approved",
        );
        const data = await res.json();
        setApprovedTuitions(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchTuitions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* 🔥 Hero Section */}
      <HeroSection />

      {/* 🔥 Latest Tuition Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <LatestTuitionSection />
        </div>
      </section>
      <LatestTutorsSection></LatestTutorsSection>
      {/* 🔥 Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* 🔥 All Approved Tuition Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              All Approved Tuitions
            </h2>
            <p className="text-gray-500 mt-3">
              Browse through verified and approved tuition opportunities
            </p>
          </div>

          <Tuition tuitions={approvedTuitions} />
        </div>
      </section>

      {/* 🔥 Call To Action Section */}
      <section className="bg-lime-500 py-16 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Looking for a Tutor or Tuition?
          </h2>
          <p className="mb-6 text-lg opacity-90">
            Post your tuition requirement today and find the best tutor near
            you.
          </p>
          <button className="bg-white text-lime-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
            Post a Tuition
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
