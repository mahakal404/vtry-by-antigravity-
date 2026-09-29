'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useTokens } from '../contexts/TokenContext';
import {
  Wand2, History, Coins, Settings, ShieldCheck,
  LogOut, Sparkles
} from 'lucide-react';

/**
 * Sidebar Component
 * - Desktop: Persistent sidebar navigation on the left
 * - Mobile: Top header with profile dropdown + Clean Bottom Navigation bar
 * - Includes Sign Out Confirmation Modal
 */
export default function Sidebar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const logoutModalRef = useRef(null);
  
  const { user, logout } = useAuth();
  const { displayBalance } = useTokens();
  const navigate = useRouter();
  const pathname = usePathname();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Close logout modal when clicking outside
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (logoutModalRef.current && !logoutModalRef.current.contains(event.target)) {
        setIsLogoutModalOpen(false);
      }
    };
    
    if (isLogoutModalOpen) {
      document.addEventListener('mousedown', handleClickOutsideModal);
      document.addEventListener('touchstart', handleClickOutsideModal);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
      document.removeEventListener('touchstart', handleClickOutsideModal);
    };
  }, [isLogoutModalOpen]);

  // Navigation items configuration
  const navItems = [
    { to: '/studio', label: 'Studio', icon: Wand2 },
    { to: '/history', label: 'History', icon: History },
    { to: '/vtokens', label: 'V-Tokens', icon: Coins },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  // Intercept Sign Out
  const handleSignOutClick = () => {
    setIsLogoutModalOpen(true);
    setProfileOpen(false); // Close mobile dropdown if open
  };

  // Actual Sign Out execution
  const confirmSignOut = () => {
    logout();
    navigate('/login');
  };

  // -------------------------
  // Sign Out Confirmation Modal
  // -------------------------
  const LogoutModal = () => {
    if (!isLogoutModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/50 p-4 fade-in">
        <div ref={logoutModalRef} 
             className="w-full max-w-sm rounded-3xl p-7 shadow-2xl"
             style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Sign Out
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
            Are you sure you want to sign out of your V-Try account?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-70"
              style={{ color: 'var(--color-text)', border: '1px solid var(--color-border)', backgroundColor: 'transparent' }}
            >
              Cancel
            </button>
            <button
              onClick={confirmSignOut}
              className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md"
              style={{ backgroundColor: '#dc2626' }}
            >
              Yes, Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------
  // Desktop Sidebar
  // -------------------------
  const DesktopSidebar = () => (
    <aside
      className="hidden lg:flex fixed top-0 left-0 h-full w-[170px] z-40 flex-col"
      style={{ backgroundColor: 'var(--color-card)', borderRight: '1px solid var(--color-border)' }}
    >
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
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = pathname === to || pathname.startsWith(to + '/');
          return (
          <Link
            key={to}
            href={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${
              isActive ? 'text-white' : 'hover:bg-white/5'
            }`}
            style={{
              backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
              color: isActive ? '#fff' : 'var(--color-muted)',
            }}
          >
            <Icon size={18} />
            {label}
          </Link>
        )})}

        {/* Admin link */}
        {user?.isAdmin && (() => {
          const isActive = pathname === '/admin' || pathname.startsWith('/admin/');
          return (
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${
              isActive ? 'text-white' : 'hover:bg-white/5'
            }`}
            style={{
              backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
              color: isActive ? '#fff' : 'var(--color-muted)',
            }}
          >
            <ShieldCheck size={18} />
            Admin
          </Link>
        )})}
      </nav>

      {/* Bottom User Section */}
      <div className="px-4 pb-5">
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

        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
               style={{ backgroundColor: 'var(--color-primary)' }}>
            {user?.avatar || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
              {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOutClick}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
          style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  // -------------------------
  // Mobile Top Header & Dropdown
  // -------------------------
  const MobileTopHeader = () => (
    <>
      <header className="lg:hidden fixed top-0 left-0 w-full z-40 px-4 py-3 flex items-center justify-between backdrop-blur-xl"
              style={{ backgroundColor: 'var(--color-card)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-lg"
               style={{ backgroundColor: 'var(--color-primary)' }}>
            V
          </div>
          <span className="font-bold text-sm tracking-wide" style={{ color: 'var(--color-text)' }}>
            V-TRY
          </span>
        </div>

        <div className="relative z-50" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
            style={{ backgroundColor: 'var(--color-primary)', border: '2px solid rgba(255,255,255,0.1)' }}
          >
            {user?.avatar || 'U'}
          </button>

          {/* Profile Dropdown Modal */}
          {profileOpen && (
            <div className="absolute top-12 right-0 w-56 rounded-2xl shadow-2xl p-2 z-50 fade-in"
                 style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="p-3 mb-1">
                <div className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                  <Sparkles size={12} style={{ color: 'var(--color-primary)' }} />
                  Tokens: <span style={{ color: 'var(--color-primary)' }}>{displayBalance}</span>
                </div>
              </div>
              
              <div className="h-px w-full my-1 opacity-20" style={{ backgroundColor: 'var(--color-border)' }} />
              
              <button
                onClick={handleSignOutClick}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 text-red-400 mt-1"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );

  // -------------------------
  // Mobile Bottom Navigation
  // -------------------------
  const MobileBottomNav = () => (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 shadow-2xl rounded-t-3xl backdrop-blur-xl pb-safe"
         style={{ backgroundColor: 'var(--color-card)', borderTop: '1px solid var(--color-border)' }}>
      
      <div className="px-2 py-3">
        {/* Strictly Primary Navigation Links */}
        <nav className="flex justify-around items-center">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to || pathname.startsWith(to + '/');
            return (
            <Link
              key={to}
              href={to}
              className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'shadow-lg scale-110' : ''}`}
                   style={{ 
                     backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                     color: isActive ? '#fff' : 'var(--color-muted)'
                   }}>
                <Icon size={20} />
              </div>
              <span className={`hidden md:block text-[10px] font-medium transition-colors ${isActive ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>
                {label}
              </span>
            </Link>
          )})}
          
          {user?.isAdmin && (() => {
            const isActive = pathname === '/admin' || pathname.startsWith('/admin/');
            return (
            <Link
              href="/admin"
              className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'shadow-lg scale-110' : ''}`}
                   style={{ 
                     backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                     color: isActive ? '#fff' : 'var(--color-muted)'
                   }}>
                <ShieldCheck size={20} />
              </div>
              <span className={`hidden md:block text-[10px] font-medium transition-colors ${isActive ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}`}>
                Admin
              </span>
            </Link>
          )})}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileTopHeader />
      <MobileBottomNav />
      <LogoutModal />
    </>
  );
}
