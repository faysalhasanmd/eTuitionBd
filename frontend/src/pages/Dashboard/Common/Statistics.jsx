import { Navigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";

const Statistics = () => {
  const [role, loading] = useRole();

  if (loading) {
    return <LoadingSpinner />;
  }
  console.log(role);
  if (role?.toLowerCase() === "admin") {
    return <Navigate to="/dashboard/admin-statistics" />;
  }

  if (role?.toLowerCase() === "tutor") {
    return <Navigate to="/dashboard/tutor-statistics" />;
  }

  if (role?.toLowerCase() === "student") {
    return <Navigate to="/dashboard/student-statistics" />;
  }

  return <p>No role found</p>;
};

export default Statistics;
