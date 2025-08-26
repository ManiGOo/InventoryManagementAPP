import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditItem from './pages/EditItem.jsx';
import Navbar from './components/common/Navbar.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="max-w-7xl mx-auto p-4">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/edit/:id" element={<EditItem />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;