import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import Dashboard from './pages/Dashboard';
import EmployerDashboard from './pages/EmployerDashboard';

export default function App() {
  return (
    <AuthProvider>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </AuthProvider>
  );
}