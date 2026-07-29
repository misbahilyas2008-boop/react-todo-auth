import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import taskifyIcon from "../../assets/icons/Taskify_icon.svg"; // import svg

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={taskifyIcon} alt="Taskify Icon" className="w-17 h-17 " />
          <span className="text-2xl mb-1 -ml-3 font-extrabold text-blue-400">
            Taskify
          </span>
        </Link>

        {/* Right: Auth Buttons */}
        <div className="flex items-center space-x-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-md"
              >
                <FaSignInAlt /> Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md"
              >
                <FaUserPlus /> Signup
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all shadow-md"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
