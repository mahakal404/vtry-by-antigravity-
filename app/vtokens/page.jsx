'use client';
import { useState, useEffect } from 'react';
import { useTokens } from '@/contexts/TokenContext';
import { Gift, Zap, Star, Crown, Play, Shield, Clock, Circle, Loader, CheckCircle } from 'lucide-react';

/**
 * V-Tokens Store Page
 * - Daily login reward (calendar based)
 * - Three pricing cards (Starter, Value, Pro)
 * - Earn free tokens by "watching ads" with cooldown and modal
 * - Secure payment processing footer
 */
export default function VTokens() {
  const { addTokens, adsWatched, watchAd, claimDailyReward, canClaimReward } = useTokens();
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [adCooldown, setAdCooldown] = useState(0);

  // Handle ad cooldown timer
  useEffect(() => {
    if (adCooldown > 0) {
      const timer = setInterval(() => {
        setAdCooldown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [adCooldown]);

  // Simulate watching an ad with modal and 4-second delay
  const handleWatchAd = () => {
    if (adsWatched >= 5 || adCooldown > 0 || isAdModalOpen) return;
    setIsAdModalOpen(true);
    
    setTimeout(() => {
      watchAd();
      setIsAdModalOpen(false);
      setAdCooldown(30); // 30 second cooldown
      alert('Success! You earned 1 V-Token.');
    }, 4000);
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
      badgeGradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
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
    <div className="space-y-8 fade-in relative">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
          V-Store
        </h1>
        <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: 'var(--color-muted)' }}>
          Purchase V-Tokens to generate high-fidelity virtual try-ons. Each token grants one generation.
        </p>
      </div>

      {/* Daily Login Reward Banner */}
      <div className="rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
           style={{
             background: 'linear-gradient(135deg, rgba(136,82,224,0.1), rgba(180,122,255,0.05))',
             border: '1px solid var(--color-primary)',
           }}>
        <div className="flex items-center gap-5 w-full sm:w-auto">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner"
               style={{ backgroundColor: 'rgba(136,82,224,0.15)' }}>
            <Gift size={28} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
              Daily Login Reward
            </h3>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
              Claim free tokens every calendar day!
            </p>
          </div>
        </div>
        <div className="text-center sm:text-right w-full sm:w-auto bg-black/5 sm:bg-transparent rounded-2xl p-4 sm:p-0">
          <div className="text-2xl sm:text-3xl font-bold font-mono" style={{ color: 'var(--color-text)' }}>
            {canClaimReward() ? (
              <button
                onClick={claimDailyReward}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Claim +5
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all opacity-50 cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              >
                Come back tomorrow
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className="rounded-3xl p-6 relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col"
              style={{
                backgroundColor: 'var(--color-card)',
                border: plan.featured ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                boxShadow: plan.featured ? '0 10px 40px -10px rgba(136,82,224,0.2)' : undefined
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-extrabold text-white tracking-wider shadow-md"
                      style={{ 
                        background: plan.badgeGradient || plan.badgeColor,
                        border: '2px solid var(--color-bg)'
                      }}>
                  {plan.badge}
                </span>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                   style={{ backgroundColor: plan.featured ? 'var(--color-primary)' : 'rgba(136,82,224,0.1)' }}>
                <Icon size={22} style={{ color: plan.featured ? '#fff' : 'var(--color-primary)' }} />
              </div>

              <h3 className="font-extrabold text-xl tracking-tight" style={{ color: 'var(--color-text)' }}>{plan.name}</h3>
              <p className="text-sm mb-5 font-medium" style={{ color: 'var(--color-muted)' }}>{plan.subtitle}</p>

              {/* Pricing */}
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-sm font-semibold line-through opacity-60" style={{ color: 'var(--color-muted)' }}>{plan.originalUSD}</span>
                <span className="text-4xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>{plan.priceUSD}</span>
              </div>
              <div className="text-sm mb-5 font-medium" style={{ color: 'var(--color-muted)' }}>
                <span className="line-through mr-2 opacity-60">{plan.originalINR}</span>
                <span style={{ color: 'var(--color-text)' }}>{plan.priceINR}</span>
              </div>

              <div className="h-px w-full my-4 opacity-30" style={{ backgroundColor: 'var(--color-border)' }} />

              {/* Token count */}
              <div className="flex flex-col gap-3 flex-1 mb-6">
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  <Circle size={16} fill="var(--color-primary)" style={{ color: 'var(--color-primary)' }} />
                  {plan.tokens} V-Tokens
                </div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
                  <Zap size={16} style={{ color: 'var(--color-muted)' }} />
                  {plan.tryons}
                </div>
                {plan.extra && (
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                    <Star size={16} style={{ color: 'var(--color-primary)' }} />
                    {plan.extra}
                  </div>
                )}
              </div>

              {/* Buy Button */}
              <button
                onClick={() => handleBuy(plan.tokens)}
                className="w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: plan.featured ? 'var(--color-primary)' : 'transparent',
                  border: plan.featured ? 'none' : '1px solid var(--color-border)',
                  color: plan.featured ? '#fff' : 'var(--color-text)',
                }}
              >
                Buy {plan.tokens} Tokens
              </button>
            </div>
          );
        })}
      </div>

      {/* Earn Free Tokens Section */}
      <div className="rounded-3xl p-6 sm:p-8 hover:shadow-md transition-shadow mt-6"
           style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
               style={{ backgroundColor: 'rgba(136,82,224,0.1)' }}>
            <Gift size={24} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>Earn Free Tokens</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Watch short ads to earn V-Tokens instantly</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-black/5 rounded-2xl p-4 border" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-between text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
            <span>Daily Progress</span>
            <span style={{ color: 'var(--color-text)' }}>{adsWatched} / 5 ads watched</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
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
          disabled={adsWatched >= 5 || adCooldown > 0}
          className="w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-[0.98]"
          style={{
            backgroundColor: 'var(--color-primary)',
          }}
        >
          {adsWatched >= 5 ? (
            <>
              <CheckCircle size={18} /> Daily Limit Reached
            </>
          ) : adCooldown > 0 ? (
            <>
              <Clock size={18} /> Wait {adCooldown}s...
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" /> Watch Ad (+1 Token)
            </>
          )}
        </button>
      </div>

      {/* Secure Payment Footer */}
      <div className="text-center pt-4 pb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield size={18} style={{ color: '#22c55e' }} />
          <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
            Secure Payment Processing
          </span>
        </div>
        <p className="text-xs max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          Transactions are processed securely. V-Tokens are non-refundable. If you encounter issues with generation quality, please contact support for a credit refund.
        </p>
      </div>

      {/* Mock Ad Modal Overlay */}
      {isAdModalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-md bg-black/80 fade-in">
          <Loader size={48} className="animate-spin text-white mb-6" style={{ color: 'var(--color-primary)' }} />
          <h2 className="text-2xl font-bold text-white tracking-wide mb-2">Watching Ad...</h2>
          <p className="text-sm font-medium opacity-80 text-white">Please wait to earn your reward.</p>
        </div>
      )}
    </div>
  );
}
