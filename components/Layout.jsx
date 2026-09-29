'use client';
import { redirect } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Sidebar from './Sidebar';

/**
 * Layout Component
 * - Wraps all authenticated pages with sidebar + main content area
 * - Redirects to login if not authenticated
 * - Applies gradient background if enabled in theme settings
 */
export default function Layout() {
  const { isAuthenticated } = useAuth();
  const { useGradient } = useTheme();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return redirect('/login');
  }

  return (
    <div className={`min-h-screen ${useGradient ? 'gradient-bg' : ''}`}
         style={{ backgroundColor: useGradient ? undefined : 'var(--color-bg)' }}>
      <Sidebar />
      {/* Main Content Area — offset by sidebar width on desktop */}
      <main className="lg:ml-[170px] min-h-screen p-4 sm:p-6 lg:p-8 pb-32 lg:pb-8 pt-20 lg:pt-8">
        <div className="max-w-5xl mx-auto fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
