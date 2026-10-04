'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Sidebar from '@/components/Sidebar';

const protectedRoutes = ['/studio', '/history', '/settings', '/vtokens', '/admin'];

export default function AppLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setIsAuthenticated(!!firebaseUser);
      const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
      
      if (isProtected && !firebaseUser) {
        router.replace('/login');
      } else if ((pathname === '/login' || pathname === '/') && firebaseUser) {
        router.replace('/studio');
      }
      
      setIsChecking(false);
    });
    return () => unsubscribe();
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8F5FF] dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const showSidebar = protectedRoutes.some(route => pathname.startsWith(route)) && isAuthenticated;

  if (showSidebar) {
    return (
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto pt-16 pb-24 px-4 lg:pt-8 lg:pb-8 lg:px-10 bg-app-bg text-text-main dark:bg-slate-900 dark:text-white">
          {children}
        </main>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#F8F5FF] text-text-main dark:bg-slate-900 dark:text-white">
      {children}
    </main>
  );
}
