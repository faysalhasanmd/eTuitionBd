import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const HeroSection = () => {
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // 🔹 Fetch Approved Posts
  useEffect(() => {
    fetch("http://localhost:3000/tuition?status=Approved")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Slideshow
  useEffect(() => {
    if (posts.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % posts.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts]);

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${posts[current].image})`,
          filter: "blur(3px)",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-6">
        <h1
          className={`text-4xl md:text-6xl font-bold mb-4 transition-all duration-1000 ${
            fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          {posts[current].subject} Tuition
        </h1>

        <p
          className={`text-xl md:text-2xl transition-all duration-1000 ${
            fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          Posted by {posts[current].studentName}
        </p>

        <p className="mt-4 text-lg">
          Location: {posts[current].location} | Budget: ৳{posts[current].budget}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
