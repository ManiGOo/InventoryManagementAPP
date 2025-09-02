import { motion } from "framer-motion";
import SignupForm from "../components/auth/SignupForm.jsx";

function Signup() {
  return (
    <motion.main
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.section
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center text-white tracking-wide">
          Signup
        </h1>
        <SignupForm />
      </motion.section>
    </motion.main>
  );
}

export default Signup;
