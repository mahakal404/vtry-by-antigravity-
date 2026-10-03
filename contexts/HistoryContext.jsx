'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import { toast } from 'react-hot-toast';

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await localforage.getItem('vtry_history');
        if (storedHistory) {
          setHistory(storedHistory);
        }
      } catch (error) {
        console.error("Failed to load history from IndexedDB", error);
      } finally {
        setIsLoaded(true);
        setIsHistoryLoading(false);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const saveHistory = async () => {
      if (isLoaded) {
        try {
          await localforage.setItem('vtry_history', history);
        } catch (error) {
          console.error("Failed to save history to IndexedDB", error);
          toast.error("Local storage is full. Please delete some history items.");
        }
      }
    };
    saveHistory();
  }, [history, isLoaded]);

  const addToHistory = (entry) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, isHistoryLoading, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within HistoryProvider');
  return context;
};
