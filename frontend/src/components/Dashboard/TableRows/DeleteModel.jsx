const DeleteModel = ({ isOpen, closeModal, confirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-green-50 p-6 rounded-xl w-80 shadow-xl">
        <h2 className="text-xl font-semibold mb-3">Are you sure?</h2>

        <p>This will remove the tuition permanently.!</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closeModal}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            No
          </button>

          <button
            onClick={confirm}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
