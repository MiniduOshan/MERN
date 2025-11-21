// src/components/header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">

        {/* Left menu */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>

          <Link to="/product" className="hover:text-gray-300 transition-colors">
            Products
          </Link>

          <Link to="/form" className="hover:text-gray-300 transition-colors">
            Form
          </Link>
        </div>

        {/* Right menu */}
        <div className="flex items-center space-x-6">
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors"
              >
                Sign up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Hello, {user.name}
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
