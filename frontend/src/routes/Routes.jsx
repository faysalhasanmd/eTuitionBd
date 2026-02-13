import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import AddTuition from "../pages/Dashboard/Seller/AddTuition";
import MyTuition from "../pages/Dashboard/Customer/MyTuition";
import TutorAppliedTuition from "../pages/Dashboard/Customer/TutorAppliedTuition";
import MyAppliedTuition from "../pages/Dashboard/Seller/MyAppliedTuition";
import ManageStudentPost from "../pages/Dashboard/Seller/ManageStudentPost";
import TuitionDetails from "../components/Home/TuitionDetails";
import Tutor from "../pages/Tutor/Tutor";
import TutorProfile from "../pages/Tutor/TutorProfile";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tuition/:id",
        element: <TuitionDetails />,
      },
      {
        path: "/tutors/:id", // Public Tutor Profile (sidebar nai)
        element: <TutorProfile />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-tuition",
        element: (
          <PrivateRoute>
            <AddTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "tutor-applied-tuition",
        element: (
          <PrivateRoute>
            <TutorAppliedTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "my-applied-tuition",
        element: (
          <PrivateRoute>
            <MyAppliedTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tuition",
        element: (
          <PrivateRoute>
            <MyTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-student-post",
        element: <ManageStudentPost />,
      },

      // Dashboard Tutors Routes
      {
        path: "users/tutors", // All Tutors inside Dashboard
        element: <Tutor />,
      },
      {
        path: "tutors/:id", // Tutor Profile inside Dashboard
        element: <TutorProfile />,
      },
    ],
  },
]);
