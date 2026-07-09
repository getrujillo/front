import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Envuelve cualquier página que requiera sesión iniciada.
 * Uso en App.jsx:
 *   <Route path="/dashboard" element={
 *     <ProtectedRoute><Dashboard /></ProtectedRoute>
 *   } />
 *
 * Si se necesita restringir por rol, pasar allowedRole="jobseeker" | "employer".
 */
export default function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
