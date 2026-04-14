import { useState, useEffect } from 'react';
import { useTokens } from '../contexts/TokenContext';
import { Gift, Zap, Star, Crown, Play, Shield, Clock } from 'lucide-react';

/**
 * V-Tokens Store Page
 * - Daily login reward with 24hr countdown timer
 * - Three pricing cards (Starter, Value, Pro)
 * - Earn free tokens by "watching ads" with progress tracking
 * - Secure payment processing footer
 */
export default function VTokens() {
  const { addTokens, adsWatched, watchAd, claimDailyReward, canClaimReward, getRewardTimeRemaining } = useTokens();
  const [timeRemaining, setTimeRemaining] = useState(getRewardTimeRemaining());
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  // Update countdown timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getRewardTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [getRewardTimeRemaining]);

  // Format seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Simulate watching an ad (3-second delay)
  const handleWatchAd = async () => {
    if (adsWatched >= 5 || isWatchingAd) return;
    setIsWatchingAd(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    watchAd();
    setIsWatchingAd(false);
  };

  // Simulate buying tokens
  const handleBuy = (amount) => {
    addTokens(amount);
    alert(`Successfully purchased ${amount} V-Tokens!`);
  };

  // Pricing card data
  const pricingPlans = [
    {
      name: 'Starter Pack',
      subtitle: 'For Beginners',
      tokens: 50,
      priceUSD: '$0.99',
      originalUSD: '$1.99',
      priceINR: 'Rs. 49',
      originalINR: 'Rs. 99',
      tryons: '~10 Try-Ons',
      icon: Zap,
      badge: 'SAVE 50%',
      badgeColor: '#22c55e',
      featured: false,
    },
    {
      name: 'Value Pack',
      subtitle: 'Best Seller',
      tokens: 250,
      priceUSD: '$2.99',
      originalUSD: '$5.99',
      priceINR: 'Rs. 199',
      originalINR: 'Rs. 399',
      tryons: '~50 Try-Ons',
      extra: 'Most popular choice',
      icon: Star,
      badge: 'BESTSELLER',
      badgeColor: '#f59e0b',
      featured: true,
    },
    {
      name: 'Pro Bundle',
      subtitle: 'Heavy Users',
      tokens: 800,
      priceUSD: '$6.99',
      originalUSD: '$13.99',
      priceINR: 'Rs. 449',
      originalINR: 'Rs. 999',
      tryons: '~160 Try-Ons',
      icon: Crown,
      badge: 'SAVE 50%',
      badgeColor: '#22c55e',
      featured: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
          V-Store
        </h1>
        <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: 'var(--color-muted)' }}>
          Purchase V-Tokens to generate high-fidelity virtual try-ons. Each token grants one generation.
        </p>
      </div>

      {/* Daily Login Reward Banner */}
      <div className="rounded-2xl p-5 sm:p-6 flex items-center justify-between"
           style={{
             background: 'linear-gradient(135deg, rgba(136,82,224,0.15), rgba(180,122,255,0.1))',
             border: '1px solid var(--color-primary)',
           }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
               style={{ backgroundColor: 'rgba(136,82,224,0.2)' }}>
            <Gift size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>
              Daily Login Reward ✨
            </h3>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              Come back tomorrow for more free tokens!
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs mb-1" style={{ color: 'var(--color-muted)' }}>
            <Clock size={12} /> Next gift in
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono" style={{ color: 'var(--color-text)' }}>
            {canClaimReward() ? (
              <button
                onClick={claimDailyReward}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Claim +5
              </button>
            ) : (
              formatTime(timeRemaining)
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className="rounded-2xl p-5 relative card-hover"
              style={{
                backgroundColor: 'var(--color-card)',
                border: plan.featured ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold text-white"
                      style={{ backgroundColor: plan.badgeColor }}>
                  {plan.badge}
                </span>
              )}

              {/* Icon */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                   style={{ backgroundColor: 'rgba(136,82,224,0.15)' }}>
                <Icon size={18} style={{ color: 'var(--color-primary)' }} />
              </div>

              <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>{plan.name}</h3>
              <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>{plan.subtitle}</p>

              {/* Pricing */}
              <div className="mb-1">
                <span className="text-xs line-through mr-1" style={{ color: 'var(--color-muted)' }}>{plan.originalUSD}</span>
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{plan.priceUSD}</span>
                <span className="text-xs ml-1" style={{ color: 'var(--color-muted)' }}>USD</span>
              </div>
              <div className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
                <span className="line-through mr-1">{plan.originalINR}</span>
                <span className="font-medium" style={{ color: 'var(--color-text)' }}>{plan.priceINR}</span>
              </div>

              {/* Token count */}
              <div className="flex items-center gap-1.5 text-sm font-medium mb-1" style={{ color: '#22c55e' }}>
                <span>🪙</span> {plan.tokens} V-Tokens
              </div>
              <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>{plan.tryons}</p>
              {plan.extra && (
                <p className="text-xs mb-3" style={{ color: 'var(--color-primary)' }}>{plan.extra}</p>
              )}

              {/* Buy Button */}
              <button
                onClick={() => handleBuy(plan.tokens)}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: plan.featured ? 'var(--color-card)' : 'var(--color-primary)',
                  border: plan.featured ? '1px solid var(--color-border)' : 'none',
                  color: plan.featured ? 'var(--color-text)' : '#fff',
                }}
              >
                Buy {plan.tokens} Tokens
              </button>
            </div>
          );
        })}
      </div>

      {/* Earn Free Tokens Section */}
      <div className="rounded-2xl p-5 sm:p-6"
           style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
               style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}>
            <Gift size={20} style={{ color: '#ef4444' }} />
          </div>
          <div>
            <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>Earn Free Tokens</h3>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Watch short ads to earn V-Tokens</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--color-muted)' }}>
            <span>Daily Progress</span>
            <span>{adsWatched} / 5 ads watched</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(adsWatched / 5) * 100}%`,
                background: 'linear-gradient(90deg, var(--color-primary), #b47aff)',
              }}
            />
          </div>
        </div>

        {/* Watch Ad Button */}
        <button
          onClick={handleWatchAd}
          disabled={adsWatched >= 5 || isWatchingAd}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #8852e0, #b47aff)',
          }}
        >
          {isWatchingAd ? (
            <>⏳ Watching Ad...</>
          ) : adsWatched >= 5 ? (
            <>✅ Daily Limit Reached</>
          ) : (
            <>
              <Play size={16} /> Watch Ad (+1 Token)
            </>
          )}
        </button>
      </div>

      {/* Secure Payment Footer */}
      <div className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield size={16} style={{ color: '#22c55e' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
            Secure Payment Processing
          </span>
        </div>
        <p className="text-xs max-w-lg mx-auto" style={{ color: 'var(--color-muted)' }}>
          Transactions are processed securely. V-Tokens are non-refundable. If you encounter issues with generation quality, please contact support for a credit refund.
        </p>
      </div>
    </div>
  );
}
