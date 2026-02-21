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
          "https://etuitionbd-zeta.vercel.app/tuition?status=Approved",
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
      <div className="flex justify-center items-center min-h-[60vh] bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🔥 Hero Section */}
      <HeroSection />

      {/* 🔥 Latest Tuition Section */}
      <section className="py-20 bg-white border-t border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 border-b border-gray-300 pb-6">
            <h2 className="text-3xl md:text-4xl text-blue-500 font-bold">
              Latest Tuition Opportunities
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Check out the most recent tuition posts from students.
            </p>
          </div>
          <LatestTuitionSection />
        </div>
      </section>

      {/* 🔥 Latest Tutors Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 border-b border-gray-300 pb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500">
              Top Tutors Available
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Explore our verified tutors and find your perfect match.
            </p>
          </div>
          <LatestTutorsSection />
        </div>
      </section>

      {/* 🔥 Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-gray-300 my-12"></div>
      </div>

      {/* 🔥 All Approved Tuition Section */}
      <section className="py-24 bg-white border border-gray-100 rounded-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 border-b border-gray-300 pb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 tracking-tight">
              Verified Tuition Opportunities
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
              Explore a curated list of approved tuition postings and connect
              with students who match your expertise.
            </p>
          </div>

          <Tuition tuitions={approvedTuitions} />
        </div>
      </section>

      {/* 🔥 Call To Action Section */}
      <section className="bg-green-600 py-20 mt-12 rounded-lg shadow-lg border border-green-700">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <div className="mb-8 border-b border-white pb-6">
            <h2 className="text-3xl md:text-4xl  font-bold mb-3">
              Find the Right Tutor. Post Your Requirement Today.
            </h2>
            <p className="text-white/90 text-lg">
              Whether you're a student seeking guidance or a tutor looking for
              new opportunities, our platform connects you with the perfect
              match.
            </p>
          </div>
          <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-100 transition duration-300">
            Post a Tuition
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
