import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle"; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-black/60 backdrop-blur-lg shadow-xl rounded-full px-6 py-3 flex items-center justify-between w-[90%] max-w-4xl border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 tracking-wide">
        SkillSwap
      </h2>

      <div className="flex gap-4 items-center text-sm font-medium">
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "text-indigo-800 " : "hover:text-indigo-500"
          }
        >
          Explore
        </NavLink>
        <NavLink
          to="/my-skills"
          className={({ isActive }) =>
            isActive ? "text-indigo-800 " : "hover:text-indigo-500"
          }
        >
          My Skills
        </NavLink>
        <NavLink
          to="/requests"
          className={({ isActive }) =>
            isActive ? "text-indigo-800 " : "hover:text-indigo-500"
          }
        >
          Requests
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-indigo-800 " : "hover:text-indigo-500"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/create-skill"
          className={({ isActive }) =>
            isActive ? "text-indigo-800 " : "hover:text-indigo-500"
          }
        >
          Create
        </NavLink>
        <DarkModeToggle/>
        <button
          onClick={handleLogout}
          className="bg-blue-900 hover:bg-red-800 text-white px-3 py-1.5 rounded-full transition"
        >
          Logout
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
