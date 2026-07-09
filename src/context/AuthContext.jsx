import { createContext, useContext, useState, useEffect } from 'react';

/**
 * AuthContext
 * -----------
 * Maneja el estado de sesión en toda la app: usuario logueado,
 * token y rol (jobseeker | employer).
 *
 * BACKEND HOOK:
 * Reemplaza las funciones `login`, `register` y `logout` de abajo
 * por las llamadas reales a la API (fetch/axios). Por ahora
 * simulan una autenticación exitosa y guardan todo en localStorage
 * para que el resto de la UI (rutas protegidas, navbar, etc.)
 * ya funcione mientras el backend se conecta.
 */

const AuthContext = createContext(null);

const STORAGE_KEY = 'jf_auth';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  // BACKEND HOOK: sustituir por POST /api/auth/login
  async function login({ email, password, role }) {
    // Ejemplo real:
    // const res = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password, role }),
    // });
    // if (!res.ok) throw new Error('Credenciales inválidas');
    // const data = await res.json(); // { token, user }

    await new Promise((r) => setTimeout(r, 500)); // simula latencia de red
    const fakeUser = { name: email.split('@')[0], email, role };
    const fakeToken = 'demo-token-' + Date.now();
    setAuth({ token: fakeToken, user: fakeUser });
    return fakeUser;
  }

  // BACKEND HOOK: sustituir por POST /api/auth/register
  async function register({ name, email, password, role }) {
    await new Promise((r) => setTimeout(r, 500));
    const fakeUser = { name, email, role };
    const fakeToken = 'demo-token-' + Date.now();
    setAuth({ token: fakeToken, user: fakeUser });
    return fakeUser;
  }

  function logout() {
    setAuth(null);
  }

  const value = {
    user: auth?.user ?? null,
    token: auth?.token ?? null,
    isAuthenticated: !!auth,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
