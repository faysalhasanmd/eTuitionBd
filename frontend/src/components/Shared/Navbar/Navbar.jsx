import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router"; // ✅ react-router-dom
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="py-3">
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-10" />
              <span className="font-bold text-xl hidden md:block">
                eTuitionBd
              </span>
            </Link>

            {/* Middle Nav (Desktop) */}
            <div className="hidden lg:flex gap-6 font-medium">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/all-tuitions">Tuitions</NavLink>
              <NavLink to="/dashboard/users/tutors">Tutors</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>

              {/* Role-based Dashboard links */}
              {user && role === "Student" && (
                <NavLink to="/dashboard/my-tuition">My Tuitions</NavLink>
              )}
              {user && role === "Tutor" && (
                <NavLink to="/dashboard/tutor-applied-tuition">
                  Applied Tuitions
                </NavLink>
              )}
              {user && role === "Admin" && (
                <>
                  <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
                  <NavLink to="/dashboard/manage-student-post">
                    Manage Posts
                  </NavLink>
                </>
              )}
            </div>

            {/* Right Menu */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 border px-3 py-2 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu size={20} />
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.photoURL || avatarImg}
                  referrerPolicy="no-referrer"
                  alt="profile"
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-md overflow-hidden text-sm">
                  <div className="flex flex-col">
                    {/* Mobile nav */}
                    <NavLink
                      to="/"
                      className="px-4 py-2 hover:bg-neutral-100 lg:hidden"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/all-tuitions"
                      className="px-4 py-2 hover:bg-neutral-100 lg:hidden"
                    >
                      Tuitions
                    </NavLink>
                    <NavLink
                      to="/tutors"
                      className="px-4 py-2 hover:bg-neutral-100 lg:hidden"
                    >
                      Tutors
                    </NavLink>

                    {!user ? (
                      <>
                        <NavLink
                          to="/login"
                          className="px-4 py-2 hover:bg-neutral-100"
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/signup"
                          className="px-4 py-2 hover:bg-neutral-100"
                        >
                          Register
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to={`/dashboard`}
                          className="px-4 py-2 hover:bg-neutral-100 font-semibold"
                        >
                          Dashboard
                        </NavLink>
                        <button
                          onClick={logOut}
                          className="text-left px-4 py-2 hover:bg-neutral-100 text-red-500"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
