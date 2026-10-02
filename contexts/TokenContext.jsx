'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

const TokenContext = createContext(null);

export function TokenProvider({ children }) {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState(null);
  const [loginStreak, setLoginStreak] = useState(0);
  const [adsWatched, setAdsWatched] = useState(0);
  
  useEffect(() => {
    if (!user) {
      setBalance(0);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBalance(data.vTokens || 0);
        setLastLoginDate(data.lastLoginDate);
        setLoginStreak(data.loginStreak || 0);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const canClaimReward = () => {
    if (!lastLoginDate) return true;
    const last = new Date(lastLoginDate).toDateString();
    const now = new Date().toDateString();
    return last !== now;
  };

  const claimDailyReward = async () => {
    if (!user) {
      toast.error("Please login to claim rewards");
      return;
    }
    if (!canClaimReward()) {
      toast.error("You've already claimed your daily reward!");
      return;
    }
    
    let newStreak = 1;
    if (lastLoginDate) {
      const last = new Date(lastLoginDate);
      const now = new Date();
      const diffTime = Math.abs(now - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 2 && diffDays > 0 && last.toDateString() !== now.toDateString()) {
         newStreak = loginStreak + 1;
      }
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        vTokens: increment(2),
        loginStreak: newStreak,
        lastLoginDate: new Date().toISOString()
      });
      toast.success(`Claimed 2 V-Tokens! Daily streak: ${newStreak} 🔥`);
    } catch (e) {
      toast.error("Failed to claim daily reward");
    }
  };

  const spendTokens = async (amount = 5) => {
    if (balance === Infinity) return true;
    if (balance >= amount && user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          vTokens: increment(-amount)
        });
        return true;
      } catch (e) {
        toast.error("Failed to spend tokens");
        return false;
      }
    }
    return false;
  };

  const addTokens = async (amount) => {
    if (!user) {
      toast.error("Please login to purchase tokens");
      return;
    }
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        vTokens: increment(amount)
      });
      toast.success(`Successfully purchased ${amount} V-Tokens! 🚀`);
    } catch (e) {
      toast.error("Purchase failed");
    }
  };

  const watchAd = async () => {
    if (!user) {
      toast.error("Please login to earn rewards");
      return false;
    }
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        vTokens: increment(1)
      });
      toast.success('+1 V-Token earned! 📺');
      return true;
    } catch (e) {
      toast.error('Failed to claim reward');
      return false;
    }
  };

  const setTokenBalance = async (amount) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        vTokens: amount
      });
      toast.success(`Balance updated to ${amount}`);
    } catch (e) {
      toast.error('Failed to update balance');
    }
  };

  const displayBalance = balance.toLocaleString();

  return (
    <TokenContext.Provider value={{
      balance,
      displayBalance,
      spendTokens,
      addTokens,
      setTokenBalance,
      watchAd,
      claimDailyReward,
      canClaimReward,
      adsWatched,
      loginStreak
    }}>
      {children}
    </TokenContext.Provider>
  );
}

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error('useTokens must be used within TokenProvider');
  return context;
};
