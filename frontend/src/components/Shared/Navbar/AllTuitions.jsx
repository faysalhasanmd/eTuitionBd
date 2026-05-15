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
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://tuitionsbd.vercel.app/tuition?status=Approved")
      .then((res) => setTuitions(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredTuitions = tuitions.filter((item) => {
    const matchesSearch =
      item.subject?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());
    return (
      matchesSearch &&
      (filterClass
        ? item.class?.toLowerCase().includes(filterClass.toLowerCase())
        : true) &&
      (filterSubject
        ? item.subject?.toLowerCase().includes(filterSubject.toLowerCase())
        : true) &&
      (filterLocation
        ? item.location?.toLowerCase().includes(filterLocation.toLowerCase())
        : true)
    );
  });

  const sortedTuitions = [...filteredTuitions].sort((a, b) => {
    if (sortOption === "lowHigh") return a.budget - b.budget;
    if (sortOption === "highLow") return b.budget - a.budget;
    if (sortOption === "newest")
      return new Date(b.postedAt) - new Date(a.postedAt);
    if (sortOption === "oldest")
      return new Date(a.postedAt) - new Date(b.postedAt);
    return 0;
  });

  const activeFilterCount = [
    filterClass,
    filterSubject,
    filterLocation,
    sortOption,
  ].filter(Boolean).length;

  const clearAll = () => {
    setSearch("");
    setFilterClass("");
    setFilterSubject("");
    setFilterLocation("");
    setSortOption("");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          {/* Back button inside hero on mobile */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-5 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <div className="text-center">
            <span className="inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wider uppercase">
              Verified Listings
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              All Approved Tuitions
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base max-w-md mx-auto">
              Browse {tuitions.length} verified tuition opportunities across
              Bangladesh
            </p>
          </div>

          {/* Search bar — part of hero */}
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by subject or location…"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm shadow-lg bg-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
          {/* Mobile: toggle button */}
          <div className="flex items-center justify-between px-4 py-3 sm:hidden">
            <button
              onClick={() => setFiltersOpen((p) => !p)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h18M7 10h10M11 16h2"
                />
              </svg>
              Filters & Sort
              {activeFilterCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-red-500 font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Mobile collapsible filter body */}
          <div
            className={`px-4 pb-4 sm:hidden ${filtersOpen ? "block" : "hidden"}`}
          >
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Class"
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
              <select
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="lowHigh">Budget: Low → High</option>
                <option value="highLow">Budget: High → Low</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>

          {/* Tablet + Desktop: always visible filters inline */}
          <div className="hidden sm:flex items-center gap-3 flex-wrap px-5 py-4">
            <input
              type="text"
              placeholder="Class"
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm flex-1 min-w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm flex-1 min-w-[110px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm flex-1 min-w-[110px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
            <select
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm flex-1 min-w-[150px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="lowHigh">Budget: Low → High</option>
              <option value="highLow">Budget: High → Low</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="shrink-0 text-xs text-red-500 font-semibold px-3 py-2 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
              >
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-2">
        <p className="text-xs sm:text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {sortedTuitions.length}
          </span>{" "}
          of {tuitions.length} tuitions
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-12 pt-3">
        {sortedTuitions.length > 0 ? (
          <div className="grid gap-3 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {sortedTuitions.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 sm:py-28">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-700">
              No Tuitions Found
            </h3>
            <p className="text-slate-400 mt-2 text-sm max-w-xs mx-auto">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={clearAll}
              className="mt-5 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTuitions;
