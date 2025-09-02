import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      
      {/* Full-page 3D Canvas */}
      <Canvas className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls enableZoom={false} enablePan={false} />

        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          {/* Box */}
          <mesh position={[-3, 1, -2]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="#3B82F6" />
          </mesh>

          {/* Cylinder (bottle) */}
          <mesh position={[2, 0.5, -1]}>
            <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
            <meshStandardMaterial color="#F59E0B" />
          </mesh>

          {/* Crate-like cube */}
          <mesh position={[0, -1.5, 1]}>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial color="#10B981" />
          </mesh>

          {/* Another box */}
          <mesh position={[1.5, 2, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#EF4444" />
          </mesh>
        </Float>
      </Canvas>

      {/* UI overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <motion.h1
          className="text-5xl font-extrabold mb-6 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
        >
          Welcome to Inventory Management
        </motion.h1>

        <motion.p
          className="text-lg text-gray-200 max-w-xl mb-6"
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
              >
                Login
              </Link>{" "}
              or{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:underline font-medium"
              >
                Signup
              </Link>{" "}
              to manage inventory.
            </>
          )}
        </motion.p>

        {user && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Home;
