import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTokens } from '../contexts/TokenContext';
import {
  Wand2, History, Coins, Settings, ShieldCheck,
  LogOut, Menu, X, Sparkles
} from 'lucide-react';

/**
 * Sidebar Component
 * - Persistent sidebar navigation on desktop
 * - Collapsible hamburger menu on mobile
 * - Shows user profile, balance, and navigation links
 * - Admin link only visible if user is admin
 */
export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { displayBalance } = useTokens();
  const navigate = useNavigate();

  // Navigation items configuration
  const navItems = [
    { to: '/studio', label: 'Studio', icon: Wand2 },
    { to: '/history', label: 'History', icon: History },
    { to: '/vtokens', label: 'V-Tokens', icon: Coins },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  // Handle Sign Out
  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-lg"
             style={{ backgroundColor: 'var(--color-primary)' }}>
          V
        </div>
        <span className="font-bold text-lg tracking-wide" style={{ color: 'var(--color-text)' }}>
          V-TRY
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 mt-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-white'
                  : 'hover:bg-white/5'
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
              color: isActive ? '#fff' : 'var(--color-muted)',
            })}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        {/* Admin link — only for admin users */}
        {user?.isAdmin && (
          <NavLink
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-white'
                  : 'hover:bg-white/5'
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
              color: isActive ? '#fff' : 'var(--color-muted)',
            })}
          >
            <ShieldCheck size={18} />
            Admin
          </NavLink>
        )}
      </nav>

      {/* Bottom User Section */}
      <div className="px-4 pb-5">
        {/* Balance Display */}
        <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-4"
             style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
            <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
            BALANCE
          </div>
          <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
            {displayBalance}
          </span>
        </div>

        {/* User Avatar & Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
               style={{ backgroundColor: 'var(--color-primary)' }}>
            {user?.avatar || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
              {user?.name || 'User'}
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--color-muted)' }}>
              {user?.email || ''}
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
          style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl"
        style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
      >
        {mobileOpen ? <X size={22} style={{ color: 'var(--color-text)' }} /> : <Menu size={22} style={{ color: 'var(--color-text)' }} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[170px] z-40 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-card)', borderRight: '1px solid var(--color-border)' }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
