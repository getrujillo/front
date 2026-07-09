import { useNavigate } from 'react-router-dom';
import './SignIn.css';

export default function SignIn() {
  const navigate = useNavigate();

  function chooseRole(role) {
    // Pasamos el rol elegido a la pantalla de login vía state de la ruta
    navigate('/login', { state: { role } });
  }

  return (
    <div className="hero-bg auth-bg">
      <div className="hero-rings"><span></span><span></span></div>

      <div className="signin-wrap">
        <div className="signin-card">
          <p className="signin-card__title">Sign In</p>
          <p className="signin-card__question">Are you a jobseeker or an employer?</p>

          <div className="role-options">
            <button
              type="button"
              className="role-btn role-btn--jobseeker"
              onClick={() => chooseRole('jobseeker')}
            >
              Jobseeker
            </button>
            <button
              type="button"
              className="role-btn role-btn--employer"
              onClick={() => chooseRole('employer')}
            >
              Employer
            </button>
          </div>

          <a href="/" className="signin-card__back">← Back to home</a>
        </div>
      </div>
    </div>
  );
}
