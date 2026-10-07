'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useTokens } from '@/contexts/TokenContext';
import { Zap, Star, Crown, Shield, Clock, Zap as Lightning, RefreshCw, Headset } from 'lucide-react';
import VTokenIcon from "@/components/VTokenIcon";
import { toast } from 'react-hot-toast';

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function VTokens() {
  const { addTokens, balance: vTokens } = useTokens();

  const handlePayment = async (plan) => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: plan.priceRaw }),
      });
      const data = await response.json();

      if (data.error) throw new Error(data.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "V-Try",
        description: `${plan.name} Purchase`,
        order_id: data.id,
        handler: async function (response) {
          console.log("Payment Success:", response);
          toast.success(`Payment Successful! ${plan.tokens} V-Tokens added.`);
          await addTokens(plan.tokens);
        },
        theme: { color: "#8a2be2" }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.");
      console.error(error);
    }
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
      priceRaw: 349,
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
      priceRaw: 1499,
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
      priceRaw: 3999,
      tryons: '160 Try-Ons',
      icon: Crown,
      badge: 'SAVE 50%',
      featured: false,
    },
  ];

  return (
    <div className="space-y-8 fade-in relative pb-32 lg:pb-12">
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

      {/* 2. Token Pack Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mt-8 lg:mt-12 mb-6">
        <div className="order-2 lg:order-1">
          <h2 className="text-xl font-bold text-text-main dark:text-[#FBFAFC] mb-1">Choose a Token Pack</h2>
          <p className="text-sm text-text-muted dark:text-[#94A3B8]">Save more with value bundles and get instant access.</p>
        </div>
        <div className="flex w-full lg:w-auto gap-3 order-1 lg:order-2">
          <div className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 px-3 py-2 lg:py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-bold border border-green-100 dark:border-green-900/30">
            <Shield size={12} /> Secure Payment
          </div>
          <div className="flex-1 lg:flex-none flex justify-center items-center gap-1.5 px-3 py-2 lg:py-1.5 bg-brand-purple/10 text-brand-purple dark:text-brand-purple rounded-full text-xs font-bold border border-brand-purple/20">
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
                <span className="absolute -top-3 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto px-4 py-1 rounded-full text-[10px] lg:text-xs font-extrabold text-white tracking-wider bg-gradient-to-r from-brand-indigo to-brand-pink shadow-md border-2 border-white dark:border-[#1E1B2E] z-10">
                  {plan.badge}
                </span>
                <div className="h-full bg-white dark:bg-[#1E1B2E] rounded-[22px] p-6 flex flex-col transition-colors duration-200">
                  <div className="flex flex-row justify-between items-start lg:flex-col lg:items-start w-full">
                    <div>
                      <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-3 lg:mb-5">
                        <Icon size={22} className="text-brand-purple" />
                      </div>
                      <h3 className="font-extrabold text-xl tracking-tight text-text-main dark:text-[#FBFAFC]">{plan.name}</h3>
                      <p className="text-sm mb-3 lg:mb-5 font-medium text-text-muted dark:text-[#94A3B8]">{plan.subtitle}</p>
                    </div>

                    <div className="text-right lg:text-left flex flex-col items-end lg:items-start">
                      <div className="mb-1 flex items-baseline gap-2">
                        <span className="text-sm font-semibold line-through text-text-muted opacity-60 dark:text-[#94A3B8]">{plan.originalUSD}</span>
                        <span className="text-3xl lg:text-4xl font-black tracking-tight text-text-main dark:text-[#FBFAFC]">{plan.priceUSD}</span>
                      </div>
                      <div className="text-sm font-medium text-text-muted dark:text-[#94A3B8]">
                        <span className="line-through mr-2 opacity-60">{plan.originalINR}</span>
                        <span>{plan.priceINR}</span>
                      </div>
                    </div>
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
                    onClick={() => handlePayment(plan)}
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
                <span className="absolute -top-3 right-4 lg:right-6 px-3 py-1 rounded-full text-[10px] font-extrabold text-white tracking-wider bg-green-500 shadow-sm border-2 border-white dark:border-[#1E1B2E] z-10">
                  {plan.badge}
                </span>
              )}
              <div className="flex flex-row justify-between items-start lg:flex-col lg:items-start w-full">
                <div>
                  <div className="w-12 h-12 rounded-full bg-surface-soft dark:bg-[#161324] flex items-center justify-center mb-3 lg:mb-5 border border-border-soft dark:border-[#2D2A45]">
                    <Icon size={22} className="text-text-muted dark:text-[#94A3B8]" />
                  </div>
                  <h3 className="font-extrabold text-xl tracking-tight text-text-main dark:text-[#FBFAFC]">{plan.name}</h3>
                  <p className="text-sm mb-3 lg:mb-5 font-medium text-text-muted dark:text-[#94A3B8]">{plan.subtitle}</p>
                </div>

                <div className="text-right lg:text-left flex flex-col items-end lg:items-start">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-sm font-semibold line-through text-text-muted opacity-60 dark:text-[#94A3B8]">{plan.originalUSD}</span>
                    <span className="text-3xl lg:text-4xl font-black tracking-tight text-text-main dark:text-[#FBFAFC]">{plan.priceUSD}</span>
                  </div>
                  <div className="text-sm font-medium text-text-muted dark:text-[#94A3B8]">
                    <span className="line-through mr-2 opacity-60">{plan.originalINR}</span>
                    <span>{plan.priceINR}</span>
                  </div>
                </div>
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
                onClick={() => handlePayment(plan)}
                className="w-full py-3.5 rounded-xl text-sm font-bold border border-brand-purple text-brand-purple hover:bg-purple-50 dark:hover:bg-brand-purple/10 transition-colors"
              >
                Buy {plan.tokens} Tokens
              </button>
            </div>
          );
        })}
      </div>

      {/* 5. Bottom Trust Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-8">
        {[
          { icon: Lightning, title: 'Instant Delivery', sub: 'Tokens added immediately' },
          { icon: Shield, title: 'Secure Payment', sub: '256-bit encryption' },
          { icon: RefreshCw, title: 'Satisfaction', sub: 'Guaranteed quality' },
          { icon: Headset, title: '24/7 Support', sub: 'Always here to help' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center text-center p-4 lg:p-5 rounded-2xl bg-[#F8F9FE] dark:bg-[#161324] border border-[#F1F5FF] dark:border-[#2D2A45] transition-colors duration-200">
            <item.icon size={20} className="text-brand-purple mb-2 lg:mb-3 opacity-80 lg:w-6 lg:h-6" />
            <h4 className="text-xs lg:text-sm font-bold text-text-main dark:text-[#FBFAFC] mb-1">{item.title}</h4>
            <p className="text-[10px] lg:text-xs text-text-muted dark:text-[#94A3B8] hidden sm:block">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
