import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // 🔥 Fetch Approved Tuition Images
  useEffect(() => {
    fetch("https://etuitionbd-zeta.vercel.app/tuition?status=Approved")
      .then((res) => res.json())
      .then((data) => {
        const imageList = data.map((item) => item.image).filter((img) => img);
        setImages(imageList);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔥 Slideshow Effect
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-yellow-400 min-h-screen flex items-center justify-center p-6">
      {/* Main Rounded Hero Container */}
      <div className="relative w-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl">
        {/* 🔥 Dynamic Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            fade ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
          style={{
            backgroundImage: `url(${images[current]})`,
          }}
        ></div>

        {/* 🔥 Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* 🔥 Floating Elements (Design Style) */}
        <div className="absolute top-10 left-10 w-32 h-32 border-8 border-red-500 rounded-full opacity-70"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-8 border-blue-500 rounded-full opacity-70"></div>
        <div className="absolute top-1/2 right-20 text-7xl font-bold text-green-400 opacity-70">
          A+
        </div>

        {/* 🔥 Content */}
        <div className="relative z-10 px-10 py-20 md:px-20 md:py-28 text-white max-w-3xl">
          <p className="text-lg mb-3 tracking-wide">Back to Learning</p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Find The Best <br />
            Home Tutors Near You
          </h1>

          <p className="text-gray-200 mb-8">
            Post your tuition needs or discover the perfect tutor effortlessly.
          </p>

          {/* 🔎 Search Bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg max-w-md">
            <input
              type="text"
              placeholder="Search subject, class, location..."
              className="flex-1 px-5 py-3 text-black outline-none"
            />
            <button className="bg-red-500 px-6 py-3 text-white font-semibold hover:bg-red-600 transition">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
