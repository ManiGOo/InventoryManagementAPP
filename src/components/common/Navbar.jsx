import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_HEIGHT = 64; // matches h-16

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900 text-gray-100 px-6 shadow-md fixed top-0 left-0 right-0 z-50 h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold hover:text-gray-300 transition"
          >
            Inventory App
          </Link>

          {/* Hamburger (always visible) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700 transition relative"
          >
            <motion.span
              animate={
                menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-0.5 bg-white rounded mb-1"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white rounded mb-1"
            />
            <motion.span
              animate={
                menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-0.5 bg-white rounded"
            />
          </button>
        </div>

        {/* Dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-6 bg-gray-800 rounded-xl shadow-lg w-44 overflow-hidden flex flex-col"
            >
              <Link
                to="/"
                className="px-4 py-2 hover:bg-gray-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left w-full hover:bg-gray-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 hover:bg-gray-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div style={{ height: NAV_HEIGHT }} />
    </>
  );
}

export default Navbar;
