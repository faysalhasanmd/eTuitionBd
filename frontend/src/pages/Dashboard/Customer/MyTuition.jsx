import { useEffect, useState } from "react";
import axios from "axios";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyTuition = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://etuitionbd-zeta.vercel.app/tuition?status=Approved",
      );
      setTuitions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-xl overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-5 py-3 border-b">Image</th>
                  <th className="px-5 py-3 border-b">Name</th>
                  <th className="px-5 py-3 border-b">Subject</th>
                  <th className="px-5 py-3 border-b">Budget</th>
                  <th className="px-5 py-3 border-b">Schedule</th>
                  <th className="px-5 py-3 border-b">Status</th>
                  <th className="px-5 py-3 border-b">Action</th>
                </tr>
              </thead>

              <tbody>
                {tuitions.map((item) => (
                  <CustomerOrderDataRow
                    key={item._id}
                    item={item}
                    refetch={fetchData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTuition;
