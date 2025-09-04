import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import { CategoriesProvider } from "./context/CategoriesContext.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditItem from "./pages/EditItem.jsx";
import Navbar from "./components/common/Navbar.jsx";

function App() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <Router>
          <div className="bg-gray-900 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/edit/:id" element={<EditItem />} />
            </Routes>
          </div>
        </Router>
      </CategoriesProvider>
    </AuthProvider>
  );
}

export default App;
