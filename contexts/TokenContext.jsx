'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// TokenContext manages V-Token balance, earning, spending, and daily rewards

const TokenContext = createContext(null);

export function TokenProvider({ children }) {
  // 1. Fixed Welcome Bonus logic
  const [balance, setBalance] = useState(() => {
    const saved = (typeof window !== 'undefined' ? localStorage.getItem('vtry_tokens') : null);
    if (saved) return parseInt(saved, 10);
    // Explicitly save the welcome bonus for new users immediately
    localStorage.setItem('vtry_tokens', '5');
    console.log('Tokens updated (Welcome Bonus):', 5);
    return 5;
  });

  const [adsWatched, setAdsWatched] = useState(() => {
    const saved = (typeof window !== 'undefined' ? localStorage.getItem('vtry_ads_watched') : null);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastRewardClaim, setLastRewardClaim] = useState(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('vtry_last_reward') : null) || null;
  });

  // We can keep these effect syncs as a fallback, but primary logic will use sync updates
  useEffect(() => {
    localStorage.setItem('vtry_tokens', String(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('vtry_ads_watched', String(adsWatched));
  }, [adsWatched]);

  useEffect(() => {
    if (lastRewardClaim) {
      localStorage.setItem('vtry_last_reward', lastRewardClaim);
    }
  }, [lastRewardClaim]);

  // Spend tokens for a try-on (returns true if successful)
  const spendTokens = (amount = 5) => {
    if (balance === Infinity) return true;
    if (balance >= amount) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      localStorage.setItem('vtry_tokens', String(newBalance));
      console.log('Tokens updated:', newBalance);
      return true;
    }
    return false;
  };

  // Add tokens (from purchase or earning)
  // Uses synchronous state and localStorage updates with debug logs
  const addTokens = (amount) => {
    setBalance(prev => {
      const newBalance = prev + amount;
      localStorage.setItem('vtry_tokens', String(newBalance));
      console.log('Tokens updated:', newBalance);
      return newBalance;
    });
  };

  // Set specific balance (for admin management)
  const setTokenBalance = (amount) => {
    setBalance(amount);
    localStorage.setItem('vtry_tokens', String(amount));
    console.log('Tokens updated:', amount);
  };

  // Watch ad to earn token
  const watchAd = () => {
    if (adsWatched < 5) {
      setAdsWatched(prev => {
        const newTotal = prev + 1;
        localStorage.setItem('vtry_ads_watched', String(newTotal));
        return newTotal;
      });
      addTokens(1);
      return true;
    }
    return false;
  };

  // Reset daily ads counter
  const resetDailyAds = () => {
    setAdsWatched(0);
    localStorage.setItem('vtry_ads_watched', '0');
  };

  // Claim daily reward
  const claimDailyReward = () => {
    const now = new Date().toISOString();
    setLastRewardClaim(now);
    localStorage.setItem('vtry_last_reward', now);
    addTokens(5);
  };

  // Check if daily reward is available (once per calendar day)
  const canClaimReward = () => {
    if (!lastRewardClaim) return true;
    const last = new Date(lastRewardClaim).toDateString();
    const now = new Date().toDateString();
    return last !== now;
  };

  // Format balance for display
  const displayBalance = balance.toLocaleString();

  return (
    <TokenContext.Provider value={{
      balance,
      displayBalance,
      spendTokens,
      addTokens,
      setTokenBalance,
      adsWatched,
      watchAd,
      resetDailyAds,
      lastRewardClaim,
      claimDailyReward,
      canClaimReward,
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
