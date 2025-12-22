import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import useIsPremium from "../../Hooks/useIsPremium";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isPremium } = useIsPremium();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error("Logout failed. Try again");
        console.error(error);
      });
  };

  const navigationLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
      </li>
      <li>
        <NavLink to="/public-lessons">Public Lessons</NavLink>
      </li>
      {user && (
        <>
          {isPremium ? (
            <li>
              <span className="text-yellow-500 font-semibold">Premium ⭐</span>
            </li>
          ) : (
            <li>
              <NavLink to="/upgrade">Upgrade</NavLink>
            </li>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm relative z-50">
      <div className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {navigationLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/">
            <span className="btn btn-ghost text-xl font-bold">
              Digital Life Lessons
            </span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navigationLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <div className="dropdown dropdown-end relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {user.photoURL ? (
                    <img
                      className="w-full h-full object-cover"
                      alt={user.displayName || "User Avatar"}
                      src={user.photoURL}
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full">
                      <CgProfile className="h-full w-full" />
                    </div>
                  )}
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
              >
                <li className="text-center font-semibold">
                  {user.displayName ? user.displayName : "Name not found"}
                </li>
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="btn btn-primary text-base-content">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn-secondary text-base-content">
                  Register
                </button>
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
