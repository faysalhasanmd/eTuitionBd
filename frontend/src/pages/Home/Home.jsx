import { useEffect, useState } from "react";
import Tuition from "../../components/Home/Tuition";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Home = () => {
  const [approvedTuitions, setApprovedTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/tuition?status=Approved"
        );
        const data = await res.json();
        setApprovedTuitions(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchTuitions();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  return (
    <div>
      <Tuition tuitions={approvedTuitions} />
    </div>
  );
};

export default Home;
