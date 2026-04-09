import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

import Tuition from "../../components/Home/Tuition";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import HeroSection from "./HeroSection";
import LatestTuitionSection from "./LatestTuitionSection";
import LatestTutorsSection from "./LatestTutorsSection";
import About from "../../components/Shared/About";
import Contact from "../../components/Shared/Contact";

const Home = () => {
  const [approvedTuitions, setApprovedTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // ✅ AOS init
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // ✅ route change হলে refresh
  useEffect(() => {
    AOS.refresh();
  }, [location]);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await fetch(
          "https://etuitionbd-fawn.vercel.app/tuition?status=Approved",
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
      <div data-aos="fade-up">
        <HeroSection />
      </div>

      {/* 🔥 Latest Tuition Section */}
      <section
        data-aos="fade-up"
        className="py-20 bg-white border-t border-b border-gray-200 shadow-sm"
      >
        <div className="mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest Tuition Opportunities
            </h2>
            <p className="mt-3 text-lg">
              Check out the most recent tuition posts from students.
            </p>
          </div>

          <div data-aos="fade-up">
            <LatestTuitionSection />
          </div>
        </div>
      </section>

      {/* 🔥 Latest Tutors Section */}
      <section
        data-aos="fade-up"
        className="py-20 bg-gray-50 border-t border-gray-200"
      >
        <div className="mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold">
              Top Tutors Available
            </h2>
            <p className="mt-3 text-lg">
              Explore our verified tutors and find your perfect match.
            </p>
          </div>

          <div data-aos="fade-up">
            <LatestTutorsSection />
          </div>
        </div>
      </section>

      {/* 🔥 Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-gray-300 my-12"></div>
      </div>

      {/* 🔥 All Approved Tuition */}
      <section
        data-aos="fade-up"
        className="py-24 bg-white border border-gray-100 rounded-xl shadow-sm"
      >
        <div className="mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Verified Tuition Opportunities
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg">
              Explore approved tuition postings and connect with students.
            </p>
          </div>

          <div data-aos="fade-up">
            <Tuition tuitions={approvedTuitions} />
          </div>
        </div>
      </section>

      {/* 🔥 About + Contact */}
      <section className="mt-10 space-y-10">
        <div data-aos="fade-up">
          <About />
        </div>
        {/* <div data-aos="fade-up">
          <Contact />
        </div> */}
      </section>

      {/* 🔥 CTA */}
      <section className="bg-green-600 py-20 mt-12 rounded-lg shadow-lg border border-green-700">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <div className="mb-8 border-b border-white pb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Find the Right Tutor
            </h2>
            <p className="text-lg">
              Connect students and tutors easily with our platform.
            </p>
          </div>

          <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-100 transition">
            Post a Tuition
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
