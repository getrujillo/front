import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css';

export default function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role || 'jobseeker';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.email.trim()) e.email = 'Ingresa tu correo.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Correo inválido.';
    if (!form.password) e.password = 'Ingresa tu contraseña.';
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres.';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);

    try {
      await login({ email: form.email, password: form.password, role });

      if (role === 'employer') {
        navigate('/employer-dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setServerError(err.message || 'No se pudo iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero-bg auth-bg">
      <div className="hero-rings"><span></span><span></span></div>

      <div className="auth-wrap">
        <div className="auth-card">
          <span className="role-pill">
            {role === 'jobseeker' ? 'Jobseeker' : 'Employer'}
          </span>

          <p className="auth-card__eyebrow">Welcome back</p>
          <h2 className="auth-card__title">Log in to your account</h2>

          {serverError && <div className="form-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={errors.email ? 'has-error' : ''}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={errors.password ? 'has-error' : ''}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
              />
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Log In'}
            </button>
          </form>

          <p className="auth-card__footer">
            Don't have an account? <Link to="/register" state={{ role }}>Sign up</Link>
          </p>

          <Link to="/signin" className="auth-card__back">
            ← Choose a different role
          </Link>
        </div>
      </div>
    </div>
  );
}
