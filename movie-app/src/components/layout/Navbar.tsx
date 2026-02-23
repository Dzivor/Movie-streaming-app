import { useState } from "react";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SignInDialog } from "../Auth-forms/SignInDialog";

const Navbar = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <nav className="bg-black  text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          {/* Logo - Left */}
          <div className="flex items-center gap-2 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Stream<span className="text-red-600">Vibe</span>
            </h1>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center gap-1 bg-gray-900/60 backdrop-blur-md rounded-full px-2 py-2 border border-white/10 shadow-xl">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "px-6 py-2 rounded-full bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium text-gray-300"
                    : "px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium text-gray-300"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/Movies"
                className={({ isActive }) =>
                  isActive
                    ? "px-6 py-2 rounded-full bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium text-gray-300"
                    : "px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium text-gray-300"
                }
              >
                Movies
              </NavLink>
              <NavLink
                to="/Support"
                className={({ isActive }) =>
                  isActive
                    ? "px-6 py-2 rounded-full bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium text-gray-300"
                    : "px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-medium text-gray-300"
                }
              >
                Support
              </NavLink>
            </div>
          </div>

          {/* Auth Buttons - Right */}
          <div className="flex items-center justify-end gap-3 md:gap-4">
            <Search
              className="hidden md:block cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-300"
              size={20}
            />
            <NavLink
              to="/signin"
              onClick={(event) => {
                event.preventDefault();
                setIsSignInOpen(true);
              }}
              className="hidden md:block text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/Sign Up"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105"
            >
              Sign Up
            </NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex items-center justify-center gap-2">
          <NavLink
            to="/"
            className="px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 text-xs font-medium text-gray-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/Movies"
            className="px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 text-xs font-medium text-gray-300"
          >
            Movies
          </NavLink>
          <NavLink
            to="/Support"
            className="px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 text-xs font-medium text-gray-300"
          >
            Support
          </NavLink>
          <NavLink
            to="/signin"
            onClick={(event) => {
              event.preventDefault();
              setIsSignInOpen(true);
            }}
            className="px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 text-xs font-medium text-gray-300"
          >
            Sign In
          </NavLink>
        </div>
      </div>

      <SignInDialog
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
