import { useState } from "react";
import Card from "./Card";
import Container from "../Shared/Container";

const Tuition = ({ tuitions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // প্রতি page-এ কতটা tuition দেখাবো

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTuitions = tuitions.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(tuitions.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container>
      {/* Tuition Cards */}
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
        {currentTuitions && currentTuitions.length > 0 ? (
          currentTuitions.map((tuition) => (
            <Card key={tuition._id} item={tuition} />
          ))
        ) : (
          <p className="col-span-full text-center font-semibold py-10">
            No approved tuitions found.
          </p>
        )}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-lime-500 text-white hover:bg-lime-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === i + 1
                  ? "bg-lime-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-lime-500 text-white hover:bg-lime-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </Container>
  );
};

export default Tuition;
