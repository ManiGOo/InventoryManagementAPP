import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { motion } from "framer-motion";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Heading with bounce */}
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-white text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
      >
        Welcome to Inventory Management
      </motion.h1>

      {/* Animated message */}
      <motion.p
        className="text-lg text-center max-w-xl mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {user ? (
          <>
            Hello, <span className="font-semibold">{user.username}</span>! Go to your{" "}
            <Link
              to="/dashboard"
              className="text-blue-400 hover:underline font-medium"
              whileHover={{ scale: 1.1 }}
            >
              Dashboard
            </Link>
            .
          </>
        ) : (
          <>
            Please{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:underline font-medium"
              whileHover={{ scale: 1.1 }}
            >
              Login
            </Link>{" "}
            or{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:underline font-medium"
              whileHover={{ scale: 1.1 }}
            >
              Signup
            </Link>{" "}
            to manage inventory.
          </>
        )}
      </motion.p>

      {/* Optional animated button */}
      <motion.div
        className="mt-6 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {user && (
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Dashboard
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Home;
