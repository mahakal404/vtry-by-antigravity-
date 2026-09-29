'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// HistoryContext manages try-on results with localStorage persistence

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    const saved = (typeof window !== 'undefined' ? localStorage.getItem('vtry_history') : null);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist history to localStorage
  useEffect(() => {
    localStorage.setItem('vtry_history', JSON.stringify(history));
  }, [history]);

  // Add a new try-on result to history
  const addToHistory = (entry) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  // Remove a specific entry
  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within HistoryProvider');
  return context;
};
