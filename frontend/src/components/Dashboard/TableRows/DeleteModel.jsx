import { FiAlertTriangle } from "react-icons/fi";

const DeleteModel = ({ isOpen, closeModal, confirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
      ></div>

      {/* Modal */}
      <div className="relative w-[420px] p-[1px] rounded-2xl bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 shadow-2xl animate-fadeInScale">
        <div className="bg-white rounded-2xl p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-red-50 text-red-600">
              <FiAlertTriangle size={26} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            Delete Confirmation
          </h2>

          {/* Subtitle */}
          <p className="text-center text-gray-500 text-sm mt-2 leading-relaxed">
            This action is irreversible. The tuition will be permanently removed
            from the system.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition font-medium text-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={confirm}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 transition text-white font-medium shadow-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
