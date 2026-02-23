import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Chart.js setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const AdminStatistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/dashboard-stats",
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  // Admin count calculation if not provided
  const admins =
    stats.admins !== undefined
      ? stats.admins
      : stats.users - (stats.students + stats.tutors);

  // Pie chart: Users breakdown
  const usersPieData = {
    labels: ["Students", "Tutors", "Admins"],
    datasets: [
      {
        label: "Users Distribution",
        data: [stats.students, stats.tutors, admins],
        backgroundColor: ["#4e73df", "#1cc88a", "#f6c23e"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  // Bar chart: Total Revenue
  const revenueBarData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Total Revenue (BDT)",
        data: [stats.totalRevenue],
        backgroundColor: "#36b9cc",
        borderRadius: 8,
      },
    ],
  };

  // Bar chart: Total Tuitions
  const tuitionsBarData = {
    labels: ["Tuitions"],
    datasets: [
      {
        label: "Approved",
        data: [stats.approvedTuitions],
        backgroundColor: "#4e73df",
        borderRadius: 6,
      },
      {
        label: "Pending",
        data: [stats.totalTuitions - stats.approvedTuitions],
        backgroundColor: "#e74a3b",
        borderRadius: 6,
      },
    ],
  };

  // Pie chart: Total Applications
  const applicationsPieData = {
    labels: ["Applications"],
    datasets: [
      {
        label: "Total Applications",
        data: [stats.totalApplications],
        backgroundColor: ["#858796"],
        borderColor: ["#fff"],
        borderWidth: 2,
      },
    ],
  };

  // Professional card component
  const Card = ({ title, value, color }) => (
    <div
      style={{
        flex: "1 1 180px",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: color || "#f8f9fc",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center",
        transition: "transform 0.2s",
      }}
      className="card-hover"
    >
      <h4 style={{ margin: 0, fontWeight: 500, color: "#333" }}>{title}</h4>
      <p
        style={{
          margin: "10px 0 0",
          fontWeight: "bold",
          fontSize: "1.3rem",
          color: "#111",
        }}
      >
        {value}
      </p>
    </div>
  );

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f1f3f6",
      }}
    >
      <h2 style={{ marginBottom: "30px", color: "#4e73df" }}>
        Admin Dashboard
      </h2>

      {/* Overview Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "50px",
        }}
      >
        <Card title="Total Users" value={stats.users} />
        <Card title="Students" value={stats.students} color="#4e73df" />
        <Card title="Tutors" value={stats.tutors} color="#1cc88a" />
        <Card title="Admins" value={admins} color="#f6c23e" />
        <Card
          title="Total Revenue"
          value={`${stats.totalRevenue} BDT`}
          color="#36b9cc"
        />
        <Card
          title="Total Tuitions"
          value={`${stats.totalTuitions} (Approved: ${stats.approvedTuitions})`}
          color="#4e73df"
        />
        <Card
          title="Total Applications"
          value={stats.totalApplications}
          color="#858796"
        />
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#4e73df" }}>
            Users Breakdown
          </h3>
          <Pie data={usersPieData} />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#4e73df" }}>
            Total Revenue
          </h3>
          <Bar
            data={revenueBarData}
            options={{
              indexAxis: "y",
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#4e73df" }}>
            Total Tuitions
          </h3>
          <Bar data={tuitionsBarData} />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#4e73df" }}>
            Total Applications
          </h3>
          <Pie data={applicationsPieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
