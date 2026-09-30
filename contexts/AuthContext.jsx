'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// AuthContext manages a simple guest-mode authentication state
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Always start as null — same on server & client (prevents hydration mismatch)
  const [user, setUser] = useState(null);

  // Hydrate from localStorage only on client after first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vtry_current_user');
      if (saved) setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem('vtry_current_user');
    }
  }, []);

  // Persist user state to localStorage whenever it changes  
  useEffect(() => {
    if (user) {
      localStorage.setItem('vtry_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vtry_current_user');
    }
  }, [user]);

  // Frictionless entry: just takes first and last name
  const enterApp = (firstName, lastName) => {
    const newUser = {
      firstName,
      lastName,
      // Create an avatar from the first letter of the first name
      avatar: firstName.charAt(0).toUpperCase(),
      isAdmin: false, // Simple apps might not need admin, but keep it for structure
    };
    
    setUser(newUser);
    return newUser;
  };

  // Clear user session
  const logout = () => {
    setUser(null);
    localStorage.removeItem('vtry_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, enterApp, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
