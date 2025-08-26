import SignupForm from '../components/auth/SignupForm.jsx';
import { motion } from 'framer-motion';

function Signup() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Signup</h1>
        <SignupForm />
      </div>
    </motion.div>
  );
}

export default Signup;
