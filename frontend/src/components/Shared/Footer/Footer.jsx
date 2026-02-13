import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
        {/* About Platform */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            About eTuitionBD
          </h2>
          <p className="text-sm leading-6">
            eTuitionBD connects students with trusted tutors across Bangladesh.
            Our goal is to make learning easier, smarter, and accessible for
            everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tutors" className="hover:text-white transition">
                Tutors
              </Link>
            </li>
            <li>
              <Link to="/add-tuition" className="hover:text-white transition">
                Add Tuition
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>
          <p className="text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-sm">📧 support@etuitionbd.com</p>
          <p className="text-sm">📞 +880 1234-567890</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>

          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} eTuitionBD Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
