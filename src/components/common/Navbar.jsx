import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-gray-100 p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-center relative">
        {/* Centered Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
          Inventory App
        </Link>

        {/* Floating Menu Button */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition text-white font-bold"
          >
            ☰
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className="mt-2 bg-gray-800 rounded-xl shadow-lg absolute right-0 w-40 flex flex-col overflow-hidden"
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
