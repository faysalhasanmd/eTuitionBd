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
import Marquee from "react-fast-marquee";
import MarqueeTuition from "./MarqueeTuition";
import AllTutor from "./AllTutor";

const Home = () => {
  const [approvedTuitions, setApprovedTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await fetch(
          "https://tuitionsbd.vercel.app/tuition?status=Approved",
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
      <div className="mt-8 px-4">
        <div className=" rounded-2xl py-4 bg-blue-200 shadow-xl overflow-hidden">
          <Marquee
            speed={50}
            pauseOnHover
            gradient={false}
            className="flex justify-between"
          >
            <div className="bg-blue-200 py-4 flex items-center gap-10 ">
              <span className="bg-blue-400 text-white font-bold px-4 py-1 rounded-full text-sm  backdrop-blur-md">
                📢 Notice
              </span>

              <p className="font-bold text-black text-3xl md:text-lg leading-relaxed max-w-5xl">
                Tuition is a type of private education. Students attend classes
                with a tutor, where they receive one-on-one guidance...
              </p>
            </div>
          </Marquee>
        </div>
      </div>

      {/* 🔥 Latest Tuition Section */}
      <section data-aos="fade-up" className="mt-5">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold">
            Latest Tuition Opportunities
          </h2>
          <p className="mt-3 text-lg">
            Check out the most recent tuition posts from students.
          </p>
        </div>
      </section>
      <section
        data-aos="fade-up"
        className="py-10 w-[full] bg-white border-t border-b border-gray-200 shadow-sm"
      >
        <div className="mx-auto px-6">
          <div data-aos="fade-up">
            <LatestTuitionSection />
          </div>
        </div>
      </section>

      {/* 🔥 Latest Tutors Section */}
      <section data-aos="fade-up" className="mt-6">
        <div className="bg-gradient-to-r w-full from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold">
            Top Tutors Available
          </h2>
          <p className="mt-3 text-lg">
            Explore our verified tutors and find your perfect match.
          </p>
        </div>
      </section>
      <section
        data-aos="fade-up"
        className="py-14 bg-gray-50 border-t border-gray-200"
      >
        <div className="mx-auto px-6">
          <div data-aos="fade-up">
            <LatestTutorsSection />
          </div>
        </div>
      </section>
      <section data-aos="fade-up">
        <AllTutor></AllTutor>
      </section>

      {/* 🔥 All Approved Tuition */}
      <section data-aos="fade-up" className="mt-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Verified Tuition Opportunities
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Explore approved tuition postings and connect with students.
          </p>
        </div>
      </section>
      <section
        data-aos="fade-up"
        className="py-14 bg-white border border-gray-100 rounded-xl shadow-sm"
      >
        <div className="mx-auto px-6">
          <div data-aos="fade-up">
            <Tuition tuitions={approvedTuitions} />
          </div>
        </div>
      </section>
      <section>
        <MarqueeTuition tuitions={approvedTuitions}></MarqueeTuition>
      </section>

      <section className="mt-10 space-y-10">
        <div data-aos="fade-up">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              🎓 Empowering Smarter Learning
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg">
              eTuitionBD connects students with trusted tutors — making
              education accessible, efficient, and stress-free.
            </p>
          </div>
          <About />
        </div>
      </section>
    </div>
  );
};

export default Home;
