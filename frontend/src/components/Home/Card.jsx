import { Link } from "react-router";

const Card = ({ item }) => {
  return (
    <div className="group w-[265px] mb-3.5 bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={item.image || ""}
          alt={item.subject || "Tuition Image"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          Student: {item.studentName}
        </h3>
        <p className="text-gray-600 text-sm truncate">
          Subject: {item.subject}
        </p>
        <p className="text-gray-600 text-sm">Budget: {item.budget} Tk</p>
        <p className="text-gray-600 text-sm">Schedule: {item.schedule}</p>

        <p className="text-gray-600 text-sm truncate">
          {item.description?.length > 60
            ? item.description.slice(0, 60) + "..."
            : item.description}
        </p>

        {/* View Details Button */}
        <Link
          to={`/tuition/${item._id}`}
          className="mt-auto inline-block text-center w-full py-2 px-4 bg-lime-500 text-white font-medium rounded-lg hover:bg-lime-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
