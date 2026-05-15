import Container from "../Container";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/bd-tuition.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ sidebarOpen, onSidebarToggle }) => {
  const { user, logOut, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition duration-300 ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300"
        : "text-gray-700 hover:text-blue-500"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 text-sm border-b border-gray-100 transition duration-200 ${
      isActive
        ? "text-blue-600 font-semibold bg-blue-50"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  const roleLinks = () => {
    if (!user) return null;
    if (role === "Student")
      return (
        <NavLink to="/dashboard/my-tuition" className={navLinkClass}>
          My Tuitions
        </NavLink>
      );
    if (role === "Tutor")
      return (
        <NavLink to="/dashboard/tutor-applied-tuition" className={navLinkClass}>
          Applied Tuitions
        </NavLink>
      );
    if (role === "Admin")
      return (
        <>
          <NavLink to="/dashboard/manage-users" className={navLinkClass}>
            Manage Users
          </NavLink>
          <NavLink to="/dashboard/manage-student-post" className={navLinkClass}>
            Manage Posts
          </NavLink>
        </>
      );
  };

  const mobileRoleLinks = () => {
    if (!user) return null;
    if (role === "Student")
      return (
        <NavLink
          to="/dashboard/my-tuition"
          className={mobileNavLinkClass}
          onClick={() => setMobileMenuOpen(false)}
        >
          My Tuitions
        </NavLink>
      );
    if (role === "Tutor")
      return (
        <NavLink
          to="/dashboard/tutor-applied-tuition"
          className={mobileNavLinkClass}
          onClick={() => setMobileMenuOpen(false)}
        >
          Applied Tuitions
        </NavLink>
      );
    if (role === "Admin")
      return (
        <>
          <NavLink
            to="/dashboard/manage-users"
            className={mobileNavLinkClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/manage-student-post"
            className={mobileNavLinkClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            Manage Posts
          </NavLink>
        </>
      );
  };

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="py-3">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onSidebarToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition text-black"
                aria-label="Toggle sidebar"
              >
                <div
                  className={`transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  {sidebarOpen ? (
                    <AiOutlineClose size={22} />
                  ) : (
                    <GiHamburgerMenu size={22} />
                  )}
                </div>
              </button>

              <Link to="/" className="flex items-center gap-2 shrink-0">
                <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
                <span className="font-bold text-lg hidden sm:block">
                  eTuitionBd
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/all-tuitions" className={navLinkClass}>
                Tuitions
              </NavLink>
              <NavLink to="/dashboard/users/tutors" className={navLinkClass}>
                Tutors
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
              {roleLinks()}
            </div>

            <div className="flex items-center gap-2">
              {/* Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-full cursor-pointer hover:shadow-md transition select-none"
                >
                  <BsThreeDots size={18} className="text-gray-500" />
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={user?.photoURL || avatarImg}
                    referrerPolicy="no-referrer"
                    alt="profile"
                  />
                </div>

                {isOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden text-sm z-50">
                    {user && (
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-800 truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col">
                      {!user ? (
                        <>
                          <NavLink
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                          >
                            Login
                          </NavLink>
                          <NavLink
                            to="/signup"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                          >
                            Register
                          </NavLink>
                        </>
                      ) : (
                        <>
                          <NavLink
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2.5 hover:bg-gray-50 font-semibold text-gray-800"
                          >
                            Dashboard
                          </NavLink>
                          <button
                            onClick={() => {
                              logOut();
                              setIsOpen(false);
                            }}
                            className="text-left px-4 py-2.5 hover:bg-gray-50 text-red-500"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Toggle menu"
              >
                <div
                  className={`transition-transform duration-300 ease-in-out ${
                    mobileMenuOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  {mobileMenuOpen ? (
                    <AiOutlineClose size={22} />
                  ) : (
                    <AiOutlineMenu size={22} />
                  )}
                </div>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-gray-100 shadow-md`}
      >
        <nav className="flex flex-col text-sm font-medium">
          <NavLink
            to="/"
            className={mobileNavLinkClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/all-tuitions"
            className={mobileNavLinkClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            Tuitions
          </NavLink>
          <NavLink
            to="/dashboard/users/tutors"
            className={mobileNavLinkClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            Tutors
          </NavLink>
          <NavLink
            to="/about"
            className={mobileNavLinkClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={mobileNavLinkClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </NavLink>
          {mobileRoleLinks()}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
