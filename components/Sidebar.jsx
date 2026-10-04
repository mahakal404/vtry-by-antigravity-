'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useTokens } from '../contexts/TokenContext';
import {
  Wand2, History, Coins, Settings, ShieldCheck,
  LogOut, Sparkles, ChevronLeft, ChevronRight, Crown, X
} from 'lucide-react';

export default function Sidebar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const dropdownRef = useRef(null);
  const logoutModalRef = useRef(null);
  
  const { user, logout } = useAuth();
  const { displayBalance } = useTokens();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/login') return;
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
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/login') return;
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
  }, [isLogoutModalOpen, pathname]);

  if (pathname === '/login') return null;

  const navItems = [
    { to: '/studio', label: 'Studio', icon: Wand2 },
    { to: '/history', label: 'History', icon: History },
    { to: '/vtokens', label: 'V-Tokens', icon: Coins },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOutClick = () => {
    setIsLogoutModalOpen(true);
    setProfileOpen(false);
  };

  const confirmSignOut = () => {
    setIsLogoutModalOpen(false);
    logout();
    router.push('/login');
  };

  const LogoutModal = () => {
    if (!isLogoutModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/50 p-4 fade-in">
        <div ref={logoutModalRef} 
             className="w-full max-w-sm rounded-3xl p-7 shadow-2xl bg-surface border border-border-soft">
          <h2 className="text-xl font-bold mb-2 text-text-main">
            Sign Out
          </h2>
          <p className="text-sm mb-8 text-text-muted">
            Are you sure you want to sign out of your V-Try account?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-surface-soft text-text-main border border-border-soft bg-transparent"
            >
              Cancel
            </button>
            <button
              onClick={confirmSignOut}
              className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md bg-brand-pink"
            >
              Yes, Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DesktopSidebar = () => (
    <aside
      className={`hidden lg:flex flex-col h-full flex-shrink-0 transition-all duration-300 ease-in-out shadow-[0_4px_20px_rgba(31,16,64,0.06)] ${
        isCollapsed ? 'w-20' : 'w-[230px]'
      } bg-surface border-r border-border-soft dark:bg-[#111827] dark:border-[#2D2A45] transition-colors duration-200`}
    >
      <div className={`flex items-center py-5 px-4 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-lg flex-shrink-0 bg-gradient-to-br from-brand-indigo to-brand-purple shadow-sm">
            V
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg tracking-wide overflow-hidden whitespace-nowrap text-text-main dark:text-[#FBFAFC] transition-colors duration-200">
              V-TRY
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-surface-soft transition-colors flex-shrink-0 text-text-muted"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = pathname === to || pathname.startsWith(to + '/');
          return (
            <Link
              key={to}
              href={to}
              title={isCollapsed ? label : undefined}
              className={`flex items-center py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isCollapsed ? 'justify-center px-2' : 'gap-3 px-3'
              } ${isActive ? 'bg-[#F0E9FF] text-brand-purple shadow-sm dark:bg-[#1E1B2E] dark:border-l-2 dark:border-[#8B5CF6] dark:text-[#C4B5FD]' : 'text-text-muted hover:bg-surface-soft hover:text-brand-purple dark:text-[#94A3B8] hover:dark:text-[#FBFAFC]'} transition-colors duration-200`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}

        {user?.email === 'rc6542698@gmail.com' && (() => {
          const isActive = pathname === '/admin' || pathname.startsWith('/admin/');
          return (
            <Link
              href="/admin"
              title={isCollapsed ? 'Admin' : undefined}
              className={`flex items-center py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isCollapsed ? 'justify-center px-2' : 'gap-3 px-3'
              } ${isActive ? 'bg-[#F0E9FF] text-brand-purple shadow-sm dark:bg-[#1E1B2E] dark:border-l-2 dark:border-[#8B5CF6] dark:text-[#C4B5FD]' : 'text-text-muted hover:bg-surface-soft hover:text-brand-purple dark:text-[#94A3B8] hover:dark:text-[#FBFAFC]'} transition-colors duration-200`}
            >
              <ShieldCheck size={18} className="flex-shrink-0" />
              {!isCollapsed && <span className="truncate">Admin</span>}
            </Link>
          );
        })()}
      </nav>

      <div className={`pb-5 flex flex-col gap-3 mt-auto ${isCollapsed ? 'px-2' : 'px-4'}`}>
        {!isCollapsed && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F5EEFF] to-[#FFF0FA] text-center border border-[#F0E5FF] shadow-sm">
            <div className="mx-auto w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center mb-2 shadow-sm text-white">
              <Crown size={16} />
            </div>
            <div className="font-bold text-brand-purple text-sm mb-1">Go Pro</div>
            <div className="text-left text-[10px] text-brand-purple/70 space-y-1 mb-3">
              <div className="flex items-center gap-1"><Sparkles size={10} /> More tokens</div>
              <div className="flex items-center gap-1"><Sparkles size={10} /> High quality</div>
              <div className="flex items-center gap-1"><Sparkles size={10} /> Priority gen</div>
            </div>
            <Link href="/vtokens" className="block w-full">
              <button className="w-full py-2 bg-gradient-to-r from-brand-indigo to-brand-pink text-white rounded-lg text-xs font-bold shadow-md hover:opacity-90 transition-opacity cursor-pointer">
                Upgrade
              </button>
            </Link>
          </div>
        )}

        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-1 mt-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 overflow-hidden bg-brand-indigo shadow-sm">
              {user?.avatar?.startsWith('http') ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                user?.avatar || 'U'
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate text-text-main">
                {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
              </div>
            </div>
            <button onClick={handleSignOutClick} className="text-text-muted hover:text-brand-pink transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white overflow-hidden bg-brand-indigo shadow-sm"
                 title={user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}>
              {user?.avatar?.startsWith('http') ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                user?.avatar || 'U'
              )}
            </div>
            <button onClick={handleSignOutClick} className="text-text-muted hover:text-brand-pink p-2">
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );

  const MobileTopHeader = () => (
    <>
      <header className="lg:hidden fixed top-0 left-0 w-full z-40 px-4 py-3 flex items-center justify-between backdrop-blur-xl bg-surface/90 border-b border-border-soft shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-lg bg-gradient-to-br from-brand-indigo to-brand-purple">
            V
          </div>
          <span className="font-bold text-sm tracking-wide text-text-main">
            V-TRY
          </span>
        </div>
        
        <div className="flex flex-1 justify-center">
          <Link href="/vtokens" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border-soft shadow-sm text-xs font-bold text-text-main">
             <img src="/v-coin.png" alt="V-Coin" className="w-5 h-5 object-contain" />
             {displayBalance}
             <span className="ml-1 w-4 h-4 rounded-full bg-brand-purple text-white flex items-center justify-center text-[10px]">+</span>
          </Link>
        </div>

        <div className="relative z-50">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg transition-transform active:scale-95 overflow-hidden bg-brand-indigo border-2 border-white"
          >
            {user?.avatar?.startsWith('http') ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              user?.avatar || 'U'
            )}
          </button>
        </div>
      </header>

      {profileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 fade-in" onClick={() => setProfileOpen(false)}>
          <div className="relative bg-surface rounded-3xl p-6 w-[90%] max-w-sm shadow-2xl text-center border border-border-soft" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg overflow-hidden bg-brand-indigo">
              {user?.avatar?.startsWith('http') ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                user?.avatar || 'U'
              )}
            </div>
            
            <h2 className="text-xl font-bold mb-2 text-text-main">
              Sign Out
            </h2>
            <p className="text-sm mb-6 text-text-muted">
              Are you sure you want to log out of your account, {user?.firstName || 'User'}?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setProfileOpen(false)}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-surface-soft text-text-main border border-border-soft bg-transparent"
              >
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md bg-brand-pink"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const MobileBottomNav = () => (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 shadow-[0_-4px_20px_rgba(31,16,64,0.06)] rounded-t-3xl backdrop-blur-xl pb-safe bg-surface/90 border-t border-border-soft">
      <div className="px-2 py-3">
        <nav className="flex justify-around items-center">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = pathname === to || pathname.startsWith(to + '/');
            return (
            <Link
              key={to}
              href={to}
              className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'shadow-sm scale-110 bg-[#F0E9FF] text-brand-purple' : 'text-text-muted'}`}>
                <Icon size={20} />
              </div>
              <span className={`hidden md:block text-[10px] font-medium transition-colors ${isActive ? 'text-brand-purple font-bold' : 'text-text-muted'}`}>
                {label}
              </span>
            </Link>
          )})}
          
          {user?.email === 'rc6542698@gmail.com' && (() => {
            const isActive = pathname === '/admin' || pathname.startsWith('/admin/');
            return (
            <Link
              href="/admin"
              className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'shadow-sm scale-110 bg-[#F0E9FF] text-brand-purple' : 'text-text-muted'}`}>
                <ShieldCheck size={20} />
              </div>
              <span className={`hidden md:block text-[10px] font-medium transition-colors ${isActive ? 'text-brand-purple font-bold' : 'text-text-muted'}`}>
                Admin
              </span>
            </Link>
          )})()}
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
