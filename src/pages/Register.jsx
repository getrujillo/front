import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css';

const COUNTRY_CODES = [
  { code: 'CA', dial: '+1', label: 'CA +1' },
  { code: 'US', dial: '+1', label: 'US +1' },
  { code: 'MX', dial: '+52', label: 'MX +52' },
  { code: 'AU', dial: '+61', label: 'AU +61' },
  { code: 'ES', dial: '+34', label: 'ES +34' },
];

export default function Register() {
  const { register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role || 'jobseeker';

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    countryCode: 'CA',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptTips: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Please enter your first name.';
    if (!form.lastName.trim()) e.lastName = 'Please enter your last name.';

    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.';

    if (!form.confirmEmail.trim()) e.confirmEmail = 'Please confirm your email.';
    else if (form.confirmEmail !== form.email) e.confirmEmail = 'Emails do not match.';

    if (!form.phone.trim()) e.phone = 'Please enter your mobile phone.';
    else if (!/^\d{6,14}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid phone number.';

    const pwd = form.password;
    if (!pwd) e.password = 'Please create a password.';
    else if (pwd.length < 8) e.password = 'Password must be at least 8 characters.';
    else if (!/[A-Z]/.test(pwd)) e.password = 'Password must contain one upper case letter.';
    else if (!/[0-9]/.test(pwd)) e.password = 'Password must contain one number.';
    else if (/\s/.test(pwd)) e.password = 'Password must not contain spaces.';

    if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match.';

    if (!form.acceptTerms) e.acceptTerms = 'You must agree to the terms to continue.';

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
      // BACKEND HOOK: register() en AuthContext.jsx es donde se conecta la API real
      await register({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        phone: `${COUNTRY_CODES.find((c) => c.code === form.countryCode)?.dial}${form.phone}`,
        role,
      });
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(err.message || 'We could not create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero-bg auth-bg">
      <div className="hero-rings"><span></span><span></span></div>

      <div className="auth-wrap">
        <div className="auth-card auth-card--wide">
          <span className="role-pill">{role === 'jobseeker' ? 'Jobseeker' : 'Employer'}</span>
          <p className="auth-card__eyebrow">Get started</p>
          <h2 className="auth-card__title">Create an account</h2>
          <p className="auth-card__subtitle">
            Already have an account? <Link to="/login" state={{ role }}>Log in</Link>
          </p>

          {serverError && <div className="form-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field-group">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  className={errors.firstName ? 'has-error' : ''}
                  value={form.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  autoComplete="given-name"
                />
                {errors.firstName && <p className="field-error">{errors.firstName}</p>}
              </div>

              <div className="field-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  className={errors.lastName ? 'has-error' : ''}
                  value={form.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                  autoComplete="family-name"
                />
                {errors.lastName && <p className="field-error">{errors.lastName}</p>}
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={errors.email ? 'has-error' : ''}
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="confirmEmail">Confirm email</label>
              <input
                id="confirmEmail"
                type="email"
                className={errors.confirmEmail ? 'has-error' : ''}
                value={form.confirmEmail}
                onChange={(e) => update('confirmEmail', e.target.value)}
                autoComplete="email"
              />
              {errors.confirmEmail && <p className="field-error">{errors.confirmEmail}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="phone">Mobile phone</label>
              <div className="phone-row">
                <select
                  className="phone-row__code"
                  value={form.countryCode}
                  onChange={(e) => update('countryCode', e.target.value)}
                  aria-label="Country code"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <input
                  id="phone"
                  type="tel"
                  className={errors.phone ? 'has-error' : ''}
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  autoComplete="tel-national"
                />
              </div>
              {errors.phone && <p className="field-error">{errors.phone}</p>}
              <p className="field-hint">This will not be displayed publicly.</p>
            </div>

            <div className="field-group">
              <label htmlFor="password">Create password</label>
              <div className="password-row">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={errors.password ? 'has-error' : ''}
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <p className="field-error">{errors.password}</p>}
              <p className="field-hint">
                Password must be at least 8 characters and contain one upper case letter, one number, and no spaces.
              </p>
            </div>

            <div className="field-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className={errors.confirmPassword ? 'has-error' : ''}
                value={form.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                autoComplete="new-password"
              />
              {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={(e) => update('acceptTerms', e.target.checked)}
              />
              <span>
                By registering, I agree to JOBNET's <a href="#terms">Terms of Use</a> and{' '}
                <a href="#privacy">Privacy Policy</a>.
              </span>
            </label>
            {errors.acceptTerms && <p className="field-error">{errors.acceptTerms}</p>}

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.acceptTips}
                onChange={(e) => update('acceptTips', e.target.checked)}
              />
              <span>
                I'd like to receive tips, hiring advice, and product updates. I can unsubscribe anytime.
              </span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Creating account…' : 'Next'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
