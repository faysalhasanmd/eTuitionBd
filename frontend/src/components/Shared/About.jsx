import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🔥 Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-3"
        >
          About eTuitionBD
        </motion.h1>
        <p className="max-w-xl mx-auto text-sm md:text-lg opacity-90">
          Connecting students with top tutors across Bangladesh — simple,
          secure, and efficient.
        </p>
      </div>

      {/* ⚡ Overview + Why */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-3">
            What is eTuitionBD?
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            A complete Tuition Management System where students post tuition,
            tutors apply, and admins monitor the platform efficiently.
          </p>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold text-indigo-600 mb-3">
            Why We Built This
          </h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside text-sm md:text-base">
            <li>Connect students & tutors easily</li>
            <li>Find qualified tutors quickly</li>
            <li>Secure & transparent payments</li>
            <li>Reduce manual hassle using automation</li>
          </ul>
        </div>
      </div>

      {/* 🛠 How It Works */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-blue-600">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Post Tuition",
              desc: "Students create tuition posts.",
              color: "bg-blue-50",
              accent: "text-blue-600",
            },
            {
              title: "Apply",
              desc: "Tutors browse and apply for jobs.",
              color: "bg-indigo-50",
              accent: "text-indigo-600",
            },
            {
              title: "Approval & Payment",
              desc: "Students approve tutors and pay securely.",
              color: "bg-teal-50",
              accent: "text-teal-600",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-6 shadow-lg rounded-xl text-center ${item.color}`}
            >
              <h3 className={`font-semibold text-lg mb-2 ${item.accent}`}>
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ⭐ Features */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-blue-700">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
            {[
              "📌 Tuition posting system",
              "📌 Tutor application system",
              "📌 Admin dashboard & control",
              "📌 Secure payment (Stripe)",
              "📌 Role-based authentication",
              "📌 Real-time analytics dashboard",
            ].map((feature, i) => (
              <p key={i}>{feature}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 👨‍💻 Developer */}
      <div className="py-16 text-center max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-600">
          Developer
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          Developed by <span className="font-semibold">Md Faysal Hasan</span> —
          building scalable and user-friendly applications.
        </p>
      </div>
    </div>
  );
};

export default About;
