import { createContext, useContext, useState, useEffect } from 'react';

// AuthContext manages user authentication state with localStorage persistence
const AuthContext = createContext(null);

// Default user profile for non-admin users
const DEFAULT_USER = {
  name: 'Mr R',
  email: 'vtry.owner01@gmail.com',
  avatar: 'M',
  isAdmin: false,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Restore user session from localStorage on mount
    const saved = localStorage.getItem('vtry_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist user state to localStorage whenever it changes  
  useEffect(() => {
    if (user) {
      localStorage.setItem('vtry_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vtry_user');
    }
  }, [user]);

  // Simulated login — checks email to determine admin status
  const login = (email, password) => {
    const isAdmin = email.toLowerCase() === 'admin@vtry.com';
    const userData = {
      ...DEFAULT_USER,
      email,
      isAdmin,
      name: isAdmin ? 'Admin' : 'Mr R',
      avatar: isAdmin ? 'A' : email.charAt(0).toUpperCase(),
    };
    setUser(userData);
    return userData;
  };

  // Clear user session
  const logout = () => {
    setUser(null);
    localStorage.removeItem('vtry_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
