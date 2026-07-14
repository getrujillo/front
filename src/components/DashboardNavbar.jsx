import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || 'jobseeker';

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="navbar">
      <Link
        to={role === 'employer' ? '/employer-dashboard' : '/dashboard'}
        className="navbar__logo"
      >
        <span className="dot">●</span> JOBNET
      </Link>

      <nav className="navbar__links">
        {role === 'employer' ? (
          <>
            <Link to="/employer-dashboard">Dashboard</Link>
            <Link to="/employer-dashboard">Post Job</Link>
            <Link to="/employer-dashboard">My Jobs</Link>
            <Link to="/employer-dashboard">Applicants</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/jobs">Find Jobs</Link>
            <Link to="/dashboard">Applications</Link>
            <Link to="/dashboard">Saved Jobs</Link>
          </>
        )}
      </nav>

      <div className="navbar__actions">
        <span className="navbar__user">
          Hello, {user?.name || 'User'}
        </span>

        <button
          type="button"
          className="btn btn--outline"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
