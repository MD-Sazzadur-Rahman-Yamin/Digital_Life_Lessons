import React from "react";
import { NavLink, Outlet } from "react-router";
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";
import { FiBook } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <div className="navbar">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Navbar Title</div>
          </div>
          <div>
            <ThemeToggle></ThemeToggle>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Go Back"
                to="/"
              >
                {/*  icon */}
                <RiArrowGoBackFill />
                <span className="is-drawer-close:hidden">Go back</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
                to="/dashboard"
              >
                {/* icon */}
                <IoHomeOutline />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Lesson"
                to="/dashboard/add-lesson"
              >
                {/* icon */}
                <MdOutlineAddBox />
                <span className="is-drawer-close:hidden">Add Lesson</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Lessons"
                to="/dashboard/my-lessons"
              >
                {/* icon */}
                <FiBook />
                <span className="is-drawer-close:hidden">My Lessons</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
                to="/dashboard/profile"
              >
                {/* icon */}
                <CgProfile />
                <span className="is-drawer-close:hidden">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
