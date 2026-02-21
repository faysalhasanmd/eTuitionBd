import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const TutorProfile = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://etuitionbd-zeta.vercel.app/users/tutors/${id}`)
      .then((res) => {
        setTutor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load tutor profile");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={tutor.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={tutor.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-primary"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{tutor.name}</h1>
            <p className="text-gray-500 mt-2">{tutor.email}</p>

            <span className="inline-block mt-3 px-4 py-1 text-sm bg-primary/10 text-primary rounded-full">
              Professional Tutor
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t"></div>

        {/* Details Section */}
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h2 className="font-semibold text-lg mb-2">Education</h2>
            <p>{tutor.education || "Not provided"}</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Experience</h2>
            <p>{tutor.experience || "Not provided"}</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Subjects</h2>
            <p>{tutor.subjects || "Not provided"}</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Location</h2>
            <p>{tutor.location || "Not provided"}</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-2">About Tutor</h2>
          <p className="text-gray-600">
            {tutor.about || "No additional information provided."}
          </p>
        </div>

        {/* Action Button */}
        <button className="mt-8 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition text-lg font-medium">
          Hire Tutor
        </button>
      </div>
    </div>
  );
};

export default TutorProfile;
