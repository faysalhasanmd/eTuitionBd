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
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaChartLine } from "react-icons/fa";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/dashboard-stats",
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // fallback admin count
  const admins =
    stats.admins !== undefined
      ? stats.admins
      : stats.users - (stats.students + stats.tutors);

  // 🎯 Chart Colors
  const COLORS = {
    student: "#4e73df",
    tutor: "#1cc88a",
    admin: "#f6c23e",
    revenue: "#36b9cc",
    pending: "#e74a3b",
    application: "#858796",
  };

  // Users Pie
  const usersPieData = {
    labels: ["Students", "Tutors", "Admins"],
    datasets: [
      {
        data: [stats.students, stats.tutors, admins],
        backgroundColor: [COLORS.student, COLORS.tutor, COLORS.admin],
        borderWidth: 2,
      },
    ],
  };

  // Revenue
  const revenueBarData = {
    labels: ["Revenue"],
    datasets: [
      {
        data: [stats.totalRevenue],
        backgroundColor: COLORS.revenue,
        borderRadius: 8,
      },
    ],
  };

  // Tuitions
  const tuitionsBarData = {
    labels: ["Tuitions"],
    datasets: [
      {
        label: "Approved",
        data: [stats.approvedTuitions],
        backgroundColor: COLORS.student,
      },
      {
        label: "Pending",
        data: [stats.totalTuitions - stats.approvedTuitions],
        backgroundColor: COLORS.pending,
      },
    ],
  };

  // Applications
  const applicationsPieData = {
    labels: ["Applications"],
    datasets: [
      {
        data: [stats.totalApplications],
        backgroundColor: [COLORS.application],
      },
    ],
  };

  // Card component
  const Card = ({ title, value, color }) => (
    <div
      style={{
        flex: "1 1 180px",
        padding: "20px",
        borderRadius: "14px",
        backgroundColor: color,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center",
        transition: "all 0.3s ease",
        cursor: "pointer",
        color: "#fff",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <h4 style={{ margin: 0 }}>{title}</h4>
      <p
        style={{
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "1.4rem",
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
        backgroundColor: "#f1f3f6",
        minHeight: "100vh",
      }}
    >
      {/* 🔥 Header */}
      <div
        style={{
          marginTop: "48px",
          marginBottom: "28px",
          padding: "25px 30px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #4e73df, #224abe)",
          color: "#fff",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaChartLine /> Admin Dashboard
        </h2>

        <p style={{ marginTop: "8px", fontSize: "14px", opacity: 0.9 }}>
          Overview of platform performance, users, revenue & analytics
        </p>

        <p style={{ marginTop: "5px", fontSize: "12px", opacity: 0.8 }}>
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* 🎯 Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "50px",
        }}
      >
        <Card title="Total Users" value={stats.users} color="#6c757d" />

        <Card title="Students" value={stats.students} color={COLORS.student} />

        <Card title="Tutors" value={stats.tutors} color={COLORS.tutor} />

        <Card title="Admins" value={admins} color={COLORS.admin} />

        <Card
          title="Revenue"
          value={`${stats.totalRevenue} BDT`}
          color={COLORS.revenue}
        />

        <Card
          title="Tuitions"
          value={`${stats.totalTuitions}`}
          color={COLORS.pending}
        />

        <Card
          title="Applications"
          value={stats.totalApplications}
          color={COLORS.application}
        />
      </div>

      {/* 📊 Charts */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <div className="chart-box">
          <h3>Users Breakdown</h3>
          <Pie data={usersPieData} />
        </div>

        <div className="chart-box">
          <h3>Total Revenue</h3>
          <Bar
            data={revenueBarData}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>

        <div className="chart-box">
          <h3>Tuitions</h3>
          <Bar data={tuitionsBarData} />
        </div>

        <div className="chart-box">
          <h3>Applications</h3>
          <Pie data={applicationsPieData} />
        </div>
      </div>

      {/* CSS */}
      <style>
        {`
          .chart-box {
            flex: 1;
            min-width: 300px;
            background: #fff;
            padding: 20px;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }

          .chart-box h3 {
            margin-bottom: 15px;
            color: #4e73df;
          }
        `}
      </style>
    </div>
  );
};

export default AdminStatistics;
