import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

/**
 * Página de ejemplo protegida (requiere sesión iniciada).
 * Tus amigos pueden reemplazar el contenido con los datos reales
 * del jobseeker o employer, según user.role.
 */
export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <div className="dashboard-header">
        <DashboardNavbar />
        <div className="dashboard-header__content">
          <span className="role-pill">{user.role === 'jobseeker' ? 'Jobseeker' : 'Employer'}</span>
          <h1>Welcome, {user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      <section className="dashboard-body">
        <p>
          Este es un placeholder de dashboard protegido. Solo se puede ver con sesión
          iniciada (revisa <code>ProtectedRoute.jsx</code> y <code>AuthContext.jsx</code>).
        </p>
      </section>

      <Footer />
    </>
  );
}
