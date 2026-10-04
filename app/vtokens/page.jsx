'use client';
import { useState, useEffect } from 'react';
import { useTokens } from '@/contexts/TokenContext';
import { Gift, Zap, Star, Crown, Play, Shield, Clock, CheckCircle, Calendar, Check, Lock, Zap as Lightning, RefreshCw, Headset, Circle } from 'lucide-react';
import VTokenIcon from "@/components/VTokenIcon";
import { toast } from 'react-hot-toast';

export default function VTokens() {
  const { addTokens, claimDailyReward, canClaimReward, watchAd, balance: vTokens, dailyAdsWatched } = useTokens();
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [adCountdown, setAdCountdown] = useState(3);

  const handleWatchAd = async () => {
    if (dailyAdsWatched >= 5) {
      toast.error("You have reached your daily limit!");
      return;
    }
    setIsAdPlaying(true);
    setAdCountdown(3);
    
    let currentCount = 3;
    const interval = setInterval(() => {
      currentCount -= 1;
      setAdCountdown(currentCount);
      
      if (currentCount <= 0) {
        clearInterval(interval);
        setIsAdPlaying(false);
        watchAd();
      }
    }, 1000);
  };

  // Simulate buying tokens
  const handleBuy = async (amount) => {
    await addTokens(amount);
  };

  const pricingPlans = [
    {
      name: 'Starter Pack',
      subtitle: 'For Beginners',
      tokens: 50,
      priceUSD: '$3.99',
      originalUSD: '$7.99',
      priceINR: 'Rs. 349',
      originalINR: 'Rs. 699',
      tryons: '10 Try-Ons',
      icon: Zap,
      badge: 'SAVE 50%',
      featured: false,
    },
    {
      name: 'Value Pack',
      subtitle: 'Best Seller',
      tokens: 250,
      priceUSD: '$17.99',
      originalUSD: '$35.99',
      priceINR: 'Rs. 1499',
      originalINR: 'Rs. 2999',
      tryons: '50 Try-Ons',
      extra: 'Most popular choice',
      icon: Star,
      badge: 'BESTSELLER',
      featured: true,
    },
    {
      name: 'Pro Bundle',
      subtitle: 'Heavy Users',
      tokens: 800,
      priceUSD: '$49.99',
      originalUSD: '$99.99',
      priceINR: 'Rs. 3999',
      originalINR: 'Rs. 7999',
      tryons: '160 Try-Ons',
      icon: Crown,
      badge: 'SAVE 50%',
      featured: false,
    },
  ];

  const days = [
    { day: 1, status: 'completed' }, // active/completed
    { day: 2, status: 'locked' },
    { day: 3, status: 'locked' },
    { day: 4, status: 'locked' },
    { day: 5, status: 'locked' },
    { day: 6, status: 'locked' },
    { day: 7, status: 'locked' },
  ];

  return (
    <div className="space-y-8 fade-in relative pb-10">
      {/* Page Header */}
      <div className="text-center mb-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-main dark:text-[#FBFAFC] font-serif transition-colors duration-200">
          V-Store
        </h1>
        <p className="text-sm mt-3 max-w-md mx-auto text-text-muted dark:text-[#94A3B8] transition-colors duration-200">
          Purchase V-Tokens to generate high-fidelity virtual try-ons. Each try-on costs 5 V-Tokens.
        </p>
        
        <div className="mt-6 inline-flex items-center gap-3 bg-white/80 dark:bg-[#1E1B2E]/80 backdrop-blur-sm border border-purple-100 dark:border-brand-purple/20 shadow-sm px-6 py-3 rounded-2xl">
          <span className="text-gray-600 dark:text-[#94A3B8] font-medium">Your Current Balance:</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-brand-purple dark:to-brand-pink">
              {vTokens}
            </span>
            <VTokenIcon size={28}/>
          </div>
        </div>
      </div>

      {/* 1. Daily Login Reward Section */}
      <div className="rounded-[24px] p-6 sm:p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-[#1E1B2E] dark:to-[#2D2A45] border border-brand-purple/20 shadow-sm transition-colors duration-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#161324] flex items-center justify-center shadow-sm">
              <Gift size={24} className="text-brand-purple" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-text-main dark:text-[#FBFAFC]">Daily Login Reward</h3>
              <p className="text-sm text-text-muted dark:text-[#94A3B8]">Claim 2 Free V-Tokens every calendar day! Come back daily to save up for free try-ons.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#161324] rounded-full border border-border-soft dark:border-[#2D2A45] shadow-sm">
            <Calendar size={14} className="text-brand-pink" />
            <span className="text-xs font-bold text-brand-pink">12h 41m left</span>
          </div>
        </div>
        
        {/* 7-Day Tracker */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-between">
          {days.map((d) => (
            <div key={d.day} className={`flex-1 flex flex-col items-center justify-center py-4 rounded-2xl transition-colors duration-200 ${
              d.status === 'completed' 
                ? 'bg-white border-2 border-brand-purple shadow-sm dark:bg-[#161324] dark:border-brand-purple' 
                : 'bg-white/60 border border-gray-200 dark:bg-[#161324]/60 dark:border-[#2D2A45] opacity-70'
            }`}>
              <div className="text-xs font-bold mb-2 text-text-muted dark:text-[#94A3B8]">Day {d.day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                d.status === 'completed' 
                  ? 'bg-brand-purple text-white' 
                  : 'bg-gray-100 text-gray-400 dark:bg-[#1E1B2E] dark:text-gray-500'
              }`}>
                {d.status === 'completed' ? <Check size={16} /> : <Lock size={16} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Token Pack Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-12 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main dark:text-[#FBFAFC] mb-1">Choose a Token Pack</h2>
          <p className="text-sm text-text-muted dark:text-[#94A3B8]">Save more with value bundles and get instant access.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-bold border border-green-100 dark:border-green-900/30">
            <Shield size={12} /> 100% Secure Payment
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-purple/10 text-brand-purple dark:text-brand-purple rounded-full text-xs font-bold border border-brand-purple/20">
            <Zap size={12} /> Instant Delivery
          </div>
        </div>
      </div>

      {/* 3. Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          
          if (plan.featured) {
            return (
              <div key={plan.name} className="relative rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-pink p-[2px] shadow-lg hover:-translate-y-1 transition-transform">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold text-white tracking-wider bg-gradient-to-r from-brand-indigo to-brand-pink shadow-md border-2 border-white dark:border-[#1E1B2E]">
                  {plan.badge}
                </span>
                <div className="h-full bg-white dark:bg-[#1E1B2E] rounded-[22px] p-6 flex flex-col transition-colors duration-200">
                  <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-brand-purple" />
                  </div>
                  <h3 className="font-extrabold text-xl tracking-tight text-text-main dark:text-[#FBFAFC]">{plan.name}</h3>
                  <p className="text-sm mb-5 font-medium text-text-muted dark:text-[#94A3B8]">{plan.subtitle}</p>

                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-sm font-semibold line-through text-text-muted opacity-60 dark:text-[#94A3B8]">{plan.originalUSD}</span>
                    <span className="text-4xl font-black tracking-tight text-text-main dark:text-[#FBFAFC]">{plan.priceUSD}</span>
                  </div>
                  <div className="text-sm mb-5 font-medium text-text-muted dark:text-[#94A3B8]">
                    <span className="line-through mr-2 opacity-60">{plan.originalINR}</span>
                    <span>{plan.priceINR}</span>
                  </div>

                  <div className="h-px w-full my-4 bg-border-soft dark:bg-[#2D2A45]" />

                  <div className="flex flex-col gap-3 flex-1 mb-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-text-main dark:text-[#FBFAFC]">
                      <VTokenIcon size={28} />
                      {plan.tokens} V-Tokens
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-text-muted dark:text-[#94A3B8]">
                      <Zap size={16} className="text-text-muted dark:text-[#94A3B8]" />
                      {plan.tryons}
                    </div>
                    {plan.extra && (
                      <div className="flex items-center gap-2 text-sm font-medium text-brand-purple">
                        <Star size={16} className="text-brand-purple" />
                        {plan.extra}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleBuy(plan.tokens)}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-md transition-opacity"
                  >
                    Buy {plan.tokens} Tokens
                  </button>
                </div>
              </div>
            );
          }
          
          return (
            <div key={plan.name} className="relative rounded-2xl bg-white dark:bg-[#1E1B2E] border border-border-soft dark:border-[#2D2A45] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
              {plan.badge && (
                <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-extrabold text-white tracking-wider bg-green-500 shadow-sm border-2 border-white dark:border-[#1E1B2E]">
                  {plan.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-full bg-surface-soft dark:bg-[#161324] flex items-center justify-center mb-5 border border-border-soft dark:border-[#2D2A45]">
                <Icon size={22} className="text-text-muted dark:text-[#94A3B8]" />
              </div>
              <h3 className="font-extrabold text-xl tracking-tight text-text-main dark:text-[#FBFAFC]">{plan.name}</h3>
              <p className="text-sm mb-5 font-medium text-text-muted dark:text-[#94A3B8]">{plan.subtitle}</p>

              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-sm font-semibold line-through text-text-muted opacity-60 dark:text-[#94A3B8]">{plan.originalUSD}</span>
                <span className="text-4xl font-black tracking-tight text-text-main dark:text-[#FBFAFC]">{plan.priceUSD}</span>
              </div>
              <div className="text-sm mb-5 font-medium text-text-muted dark:text-[#94A3B8]">
                <span className="line-through mr-2 opacity-60">{plan.originalINR}</span>
                <span>{plan.priceINR}</span>
              </div>

              <div className="h-px w-full my-4 bg-border-soft dark:bg-[#2D2A45]" />

              <div className="flex flex-col gap-3 flex-1 mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-text-main dark:text-[#FBFAFC]">
                  <VTokenIcon size={28} />
                  {plan.tokens} V-Tokens
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-text-muted dark:text-[#94A3B8]">
                  <Zap size={16} className="text-text-muted dark:text-[#94A3B8]" />
                  {plan.tryons}
                </div>
              </div>

              <button
                onClick={() => handleBuy(plan.tokens)}
                className="w-full py-3.5 rounded-xl text-sm font-bold border border-brand-purple text-brand-purple hover:bg-purple-50 dark:hover:bg-brand-purple/10 transition-colors"
              >
                Buy {plan.tokens} Tokens
              </button>
            </div>
          );
        })}
      </div>

      {/* 4. Earn Free Tokens (Ads) Banner */}
      <div className="mt-8 rounded-[20px] bg-white dark:bg-[#1E1B2E] border border-border-soft dark:border-[#2D2A45] shadow-sm p-6 sm:p-8 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <Play size={20} className="text-red-500" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-text-main dark:text-[#FBFAFC]">Earn Free Tokens</h3>
              <p className="text-sm text-text-muted dark:text-[#94A3B8]">Watch short ads to earn V-Tokens instantly.</p>
            </div>
          </div>
          <div className="px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg text-xs font-bold text-yellow-700 dark:text-yellow-500 shadow-sm">
            +1 Token per Ad
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-surface-soft dark:bg-[#161324] p-5 rounded-xl border border-border-soft dark:border-[#2D2A45]">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold mb-3 uppercase tracking-wider text-text-muted dark:text-[#94A3B8]">
              <span>5 Ads = 1 Free Try-On (5 Tokens)</span>
              <span className="text-text-main dark:text-[#FBFAFC]">{dailyAdsWatched} / 5 ADS WATCHED</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-[#2D2A45]">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-brand-purple"
                style={{ width: `${(dailyAdsWatched / 5) * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={handleWatchAd}
            disabled={isAdPlaying || dailyAdsWatched >= 5}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {isAdPlaying ? (
              <span className="flex items-center gap-2"><Play size={18} fill="currentColor" /> Playing Ad...</span>
            ) : dailyAdsWatched >= 5 ? (
              <span className="flex items-center gap-2"><CheckCircle size={18} /> Daily Limit Reached</span>
            ) : (
              <span className="flex items-center gap-2"><Play size={18} fill="currentColor" /> Watch Ad</span>
            )}
          </button>
        </div>
      </div>

      {/* 5. Bottom Trust Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          { icon: Lightning, title: 'Instant Delivery', sub: 'Tokens added immediately' },
          { icon: Shield, title: 'Secure Payment', sub: '256-bit encryption' },
          { icon: RefreshCw, title: 'Satisfaction', sub: 'Guaranteed quality' },
          { icon: Headset, title: '24/7 Support', sub: 'Always here to help' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#F8F9FE] dark:bg-[#161324] border border-[#F1F5FF] dark:border-[#2D2A45] transition-colors duration-200">
            <item.icon size={24} className="text-brand-purple mb-3 opacity-80" />
            <h4 className="text-sm font-bold text-text-main dark:text-[#FBFAFC] mb-1">{item.title}</h4>
            <p className="text-xs text-text-muted dark:text-[#94A3B8]">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Test Ad Video Modal */}
      {isAdPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-[90%] max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-surface dark:bg-[#1E1B2E] border border-border-soft dark:border-[#2D2A45]">
            <div className="p-4 flex items-center justify-between border-b border-border-soft dark:border-[#2D2A45]">
              <span className="text-sm font-semibold text-text-main dark:text-white">Sponsored Advertisement</span>
              <span className="text-sm font-bold text-brand-purple">Reward in {adCountdown}s</span>
            </div>
            <div className="aspect-video bg-black relative flex items-center justify-center">
              <video src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay loop muted className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="text-xs text-text-muted dark:text-[#94A3B8] text-center">Please wait for the ad to finish to receive your reward.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
