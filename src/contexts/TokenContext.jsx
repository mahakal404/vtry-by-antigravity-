import { createContext, useContext, useState, useEffect } from 'react';

// TokenContext manages V-Token balance, earning, spending, and daily rewards

const TokenContext = createContext(null);

export function TokenProvider({ children }) {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('vtry_tokens');
    return saved ? parseInt(saved, 10) : Infinity; // Default: unlimited for demo
  });

  const [adsWatched, setAdsWatched] = useState(() => {
    const saved = localStorage.getItem('vtry_ads_watched');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastRewardClaim, setLastRewardClaim] = useState(() => {
    return localStorage.getItem('vtry_last_reward') || null;
  });

  // Persist token state to localStorage
  useEffect(() => {
    if (balance === Infinity) {
      localStorage.setItem('vtry_tokens', 'Infinity');
    } else {
      localStorage.setItem('vtry_tokens', String(balance));
    }
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
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  // Add tokens (from purchase or earning)
  const addTokens = (amount) => {
    setBalance(prev => (prev === Infinity ? Infinity : prev + amount));
  };

  // Set specific balance (for admin management)
  const setTokenBalance = (amount) => {
    setBalance(amount);
  };

  // Watch ad to earn token
  const watchAd = () => {
    if (adsWatched < 5) {
      setAdsWatched(prev => prev + 1);
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
    addTokens(5);
  };

  // Check if daily reward is available (24 hours since last claim)
  const canClaimReward = () => {
    if (!lastRewardClaim) return true;
    const last = new Date(lastRewardClaim);
    const now = new Date();
    return (now - last) >= 24 * 60 * 60 * 1000;
  };

  // Get time remaining until next reward (in seconds)
  const getRewardTimeRemaining = () => {
    if (!lastRewardClaim) return 0;
    const last = new Date(lastRewardClaim);
    const next = new Date(last.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
    const remaining = Math.max(0, Math.floor((next - now) / 1000));
    return remaining;
  };

  // Format balance for display
  const displayBalance = balance === Infinity ? '∞' : balance.toLocaleString();

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
      getRewardTimeRemaining,
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
