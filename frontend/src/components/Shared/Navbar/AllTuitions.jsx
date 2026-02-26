import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Card from "../../Home/Card";

const AllTuitions = () => {
  const navigate = useNavigate(); // React Router hook
  const [tuitions, setTuitions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/tuition?status=Approved")
      .then((res) => setTuitions(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Filter & Search
  const filteredTuitions = tuitions.filter(
    (item) =>
      item.subject?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase()),
  );

  // Sorting
  const sortedTuitions = [...filteredTuitions].sort((a, b) => {
    if (sortOption === "lowHigh") return a.budget - b.budget;
    if (sortOption === "highLow") return b.budget - a.budget;
    if (sortOption === "newest")
      return new Date(b.postedAt) - new Date(a.postedAt);
    if (sortOption === "oldest")
      return new Date(a.postedAt) - new Date(b.postedAt);
    return 0;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-white">
            All Approved Tuitions
          </h1>
          <p className="text-blue-200 mt-2 text-lg">
            Find verified tuition opportunities easily
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-200 border border-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          &larr; Back
        </button>
      </div>

      {/* Search & Sort */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white shadow-md rounded-xl p-5">
          <input
            type="text"
            placeholder="Search by subject or location..."
            className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="w-full md:w-1/4 border text-gray-400 border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-green-400 outline-none transition"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="lowHigh">Budget: Low → High</option>
            <option value="highLow">Budget: High → Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedTuitions.length > 0 ? (
            sortedTuitions.map((item) => <Card key={item._id} item={item} />)
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-xl font-semibold text-gray-600">
                No Tuitions Found
              </h3>
              <p className="text-gray-400 mt-2">
                Try different search keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTuitions;
