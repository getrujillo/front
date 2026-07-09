import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const goToHowItWorks = () => {
    setOpen(false);

  
    if (window.location.pathname === '/') {
      document.getElementById('how-it-works')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

   
    navigate('/');

    setTimeout(() => {
      document.getElementById('how-it-works')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 200);
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        <span className="dot">●</span> JOBNET
      </Link>

      <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
        <button className="nav-home" onClick={goToHowItWorks}>
          Home
        </button>

        <NavLink to="/jobs" onClick={() => setOpen(false)}>
          Find Job
       </NavLink>

        <NavLink to="/#reviews" onClick={() => setOpen(false)}>
          Reviews
        </NavLink>

        <div className="navbar__actions navbar__actions--mobile">
          {isAuthenticated ? (
            <>
              <span className="navbar__user">Hola, {user.name}</span>
              <button className="btn btn--outline" onClick={logout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="btn btn--white"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>

              <Link
                to="/signin"
                className="btn btn--outline"
                onClick={() => setOpen(false)}
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="navbar__actions navbar__actions--desktop">
        {isAuthenticated ? (
          <>
            <span className="navbar__user">Hola, {user.name}</span>

            <button className="btn btn--outline" onClick={logout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="btn btn--white">
              Sign Up
            </Link>

            <Link to="/signin" className="btn btn--outline">
              Log In
            </Link>
          </>
        )}
      </div>

      <button
        className="navbar__burger"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}