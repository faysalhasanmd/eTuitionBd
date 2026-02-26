import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Card from "../../Home/Card";

const AllTuitions = () => {
  const navigate = useNavigate();
  const [tuitions, setTuitions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [filterClass, setFilterClass] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/tuition?status=Approved")
      .then((res) => setTuitions(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredTuitions = tuitions.filter((item) => {
    const matchesSearch =
      item.subject?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());
    const matchesClass = filterClass
      ? item.class?.toLowerCase().includes(filterClass.toLowerCase())
      : true;
    const matchesSubject = filterSubject
      ? item.subject?.toLowerCase().includes(filterSubject.toLowerCase())
      : true;
    const matchesLocation = filterLocation
      ? item.location?.toLowerCase().includes(filterLocation.toLowerCase())
      : true;

    return matchesSearch && matchesClass && matchesSubject && matchesLocation;
  });

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

      <div className="max-w-7xl mx-auto px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-lime-500 border border-gray-300 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-lime-700 transition"
        >
          &larr; Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-wrap gap-4 justify-between items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by subject or location..."
            className="flex-1 min-w-[200px] border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm hover:shadow-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Class Filter */}
          <input
            type="text"
            placeholder="Class"
            className="flex-1 min-w-[120px] border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm hover:shadow-md"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          />

          {/* Subject Filter */}
          <input
            type="text"
            placeholder="Subject"
            className="flex-1 min-w-[120px] border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm hover:shadow-md"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          />

          {/* Location Filter */}
          <input
            type="text"
            placeholder="Location"
            className="flex-1 min-w-[150px] border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm hover:shadow-md"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />

          {/* Sort */}
          <select
            className="flex-1 min-w-[150px] border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm hover:shadow-md"
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
                Try different search keywords or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTuitions;
