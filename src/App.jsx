import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TokenProvider } from './contexts/TokenContext';
import { HistoryProvider } from './contexts/HistoryContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Studio from './pages/Studio';
import History from './pages/History';
import VTokens from './pages/VTokens';
import Settings from './pages/Settings';
import Admin from './pages/Admin';

/**
 * Root App Component
 * - Wraps the entire app in context providers
 * - Sets up React Router with protected and public routes
 * - Redirects unauthenticated users to login
 */

// Protected route wrapper — redirects to login if not authenticated
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public: Login page */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/studio" replace /> : <Login />}
      />

      {/* Protected: All main pages wrapped in Layout (sidebar) */}
      <Route element={<Layout />}>
        <Route path="/studio" element={<Studio />} />
        <Route path="/history" element={<History />} />
        <Route path="/vtokens" element={<VTokens />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/studio" : "/login"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <TokenProvider>
            <HistoryProvider>
              <AppRoutes />
            </HistoryProvider>
          </TokenProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
