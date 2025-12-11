import axios from "axios";
import { useEffect, useState } from "react";
import SellerOrderDataRow from "../../../components/Dashboard/TableRows/SellerOrderDataRow";
import toast from "react-hot-toast";

const ManageStudentPost = () => {
  const [pending, setPending] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/tuition?status=Pending`
      );
      setPending(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch pending tuitions");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="text-2xl font-bold mt-8 mb-4">Pending Tuitions</h2>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-lime-200 text-left text-xs font-semibold uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-5 py-3 bg-lime-200 text-left text-xs font-semibold uppercase tracking-wider">
                  Student Email
                </th>
                <th className="px-5 py-3 bg-lime-200 text-left text-xs font-semibold uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-5 py-3 bg-lime-200 text-left text-xs font-semibold uppercase tracking-wider">
                  Class
                </th>
                <th className="px-5 py-3 bg-lime-200 text-left text-xs font-semibold uppercase tracking-wider">
                  Location
                </th>
                <th className="px-5 py-3 bg-lime-200 text-left text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 bg-lime-200 text-left text-xs font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {pending.map((t) => (
                <SellerOrderDataRow
                  key={t._id}
                  tuition={t}
                  refetch={fetchData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentPost;
