import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SellerOrderDataRow = ({ tuition, refetch }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      const res = await axios.put(
        `http://localhost:3000/tuition/approve/${tuition._id}`
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Tuition Approved!");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Approval Failed");
    }
    setIsProcessing(false);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {tuition.subject}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {tuition.studentEmail}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        ৳ {tuition.budget}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {tuition.class}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {tuition.location}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-yellow-600 font-semibold">
        {tuition.status}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={handleApprove}
          disabled={isProcessing}
          className="px-4 py-1 bg-green-500 text-white rounded-md disabled:bg-gray-300"
        >
          {isProcessing ? "Approving..." : "Approve"}
        </button>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
