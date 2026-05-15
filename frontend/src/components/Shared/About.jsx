import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-up" className="bg-gray-50 text-gray-800">
      {/* ⚡ Intro */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          📘 A Better Way to Find Tutors
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Finding the right tutor shouldn’t be complicated. Our platform
          simplifies everything — from posting tuition requests to hiring the
          best tutor — all in one place.
        </p>
      </section>

      {/* ⚙️ How It Works */}
      <section data-aos="fade-up" className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-14">
          ⚙️ How It Works
        </h2>

        <div data-aos="fade-up" className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "📝",
              title: "Post Tuition",
              desc: "Easily create tuition requests within minutes.",
            },
            {
              icon: "🤝",
              title: "Connect",
              desc: "Tutors explore opportunities and apply instantly.",
            },
            {
              icon: "🚀",
              title: "Start Learning",
              desc: "Hire the best tutor and begin your journey.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              data-aos="zoom-in"
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-lg transition border border-gray-100 text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⭐ Stats */}
      <section
        data-aos="fade-up"
        className="bg-white py-20 border-y border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 text-center gap-10">
          {[
            { number: "1000+", label: "👨‍🎓 Students" },
            { number: "500+", label: "👨‍🏫 Tutors" },
            { number: "1200+", label: "✅ Tuitions Done" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold text-blue-600">
                {stat.number}
              </h3>
              <p className="text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ Features */}
      <section data-aos="fade-up" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
          ✨ Why Choose Us
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            "📌 Easy tuition posting system",
            "🎯 Verified & skilled tutors",
            "🔒 Secure payment integration",
            "📊 Smart dashboard",
            "👤 Role-based system",
            "⚡ Fast & responsive UI",
          ].map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition"
            >
              <p className="text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 CTA */}
      <section
        data-aos="zoom-in"
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-t-[40px]"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          🚀 Ready to Get Started?
        </h2>

        <p className="opacity-90 mb-6">
          Join thousands of students and tutors today.
        </p>

        <button
          onClick={() =>
            Swal.fire({
              title: "Welcome to eTuitionBD 🎓",
              text: "Start your journey by creating an account.",
              icon: "info",
              confirmButtonColor: "#6366f1",
              confirmButtonText: "Go to Signup",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/signup");
              }
            })
          }
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Get Started ✨
        </button>
      </section>

      {/* 👨‍💻 Developer */}
      <section data-aos="fade-up" className="py-16 text-center">
        <p className="text-gray-500 text-sm">
          Built with ❤️ by <span className="font-medium">Md Faysal Hasan</span>
        </p>
      </section>
    </div>
  );
};

export default About;
