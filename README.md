# JOBNET — Frontend (React)

Frontend en React + React Router, con autenticación simulada lista
para conectar con el backend de tu equipo.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Estructura

```
src/
  components/
    Navbar.jsx        -> barra de navegación responsive
    Footer.jsx
    ProtectedRoute.jsx -> wrapper para rutas que requieren login
  context/
    AuthContext.jsx    -> AQUÍ se conecta el backend real (login/register/logout)
  pages/
    Home.jsx           -> landing + buscador + categorías
    SignIn.jsx         -> selección jobseeker / employer
    Login.jsx          -> formulario de login con validación
    Register.jsx       -> formulario de registro con validación
  App.jsx              -> rutas de la app
  main.jsx             -> punto de entrada
```

## Dónde conecta el backend

Busca los comentarios `BACKEND HOOK` en:
- `src/context/AuthContext.jsx` -> reemplazar `login()` y `register()` por
  llamadas fetch/axios reales a la API.
- `src/pages/Home.jsx` -> función `handleSearch`, para pegar la búsqueda
  de empleos a la API real.

Mientras el backend no esté listo, la app simula login/registro exitoso
y guarda la sesión en localStorage, para que el resto de la UI (rutas
protegidas, navbar con usuario logueado, etc.) ya funcione.

## Rutas protegidas

Usa `ProtectedRoute` para páginas que requieren sesión, ej. en `App.jsx`:

```jsx
<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />
```

Puedes restringir por rol con `allowedRole="jobseeker"` o `"employer"`.
# front
