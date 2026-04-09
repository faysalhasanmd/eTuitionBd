import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🔥 Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center rounded-b-3xl shadow-lg">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-3"
        >
          Contact Us
        </motion.h1>
        <p className="max-w-xl mx-auto text-sm md:text-lg opacity-90">
          We’d love to hear from you! Get in touch for queries, support, or
          collaboration.
        </p>
      </div>

      {/* 📌 Contact Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
            Our Contact Info
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            Have questions or need support? Reach out and we’ll get back to you
            as soon as possible.
          </p>
          <ul className="space-y-3 text-gray-700 text-sm md:text-base">
            <li>📧 Email: support@etuitionbd.com</li>
            <li>📞 Phone: +880 1234 567890</li>
            <li>📍 Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* 📝 Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-xl p-8"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-indigo-600 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm md:text-base">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm md:text-base">
                Message
              </label>
              <textarea
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* 🌐 Social Media */}
      <div className="bg-blue-50 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
          Follow Us
        </h2>
        <div className="flex justify-center gap-6 text-blue-600 text-2xl">
          <a href="#" className="hover:text-blue-800 transition">
            🌐
          </a>
          <a href="#" className="hover:text-blue-800 transition">
            📘
          </a>
          <a href="#" className="hover:text-blue-800 transition">
            📸
          </a>
          <a href="#" className="hover:text-blue-800 transition">
            ✉️
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
