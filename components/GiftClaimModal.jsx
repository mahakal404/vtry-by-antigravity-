'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTokens } from '@/contexts/TokenContext';
import { collection, query, where, onSnapshot, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Gift, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function GiftClaimModal() {
  const { user } = useAuth();
  const { addTokens } = useTokens();
  const [pendingGifts, setPendingGifts] = useState([]);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const giftsRef = collection(db, `users/${user.uid}/pendingGifts`);
    const q = query(giftsRef, where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const gifts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingGifts(gifts);
    });

    return () => unsubscribe();
  }, [user]);

  if (pendingGifts.length === 0) return null;

  const currentGift = pendingGifts[0]; // Handle one by one

  const handleClaim = async () => {
    if (isClaiming || !user?.uid) return;
    setIsClaiming(true);

    try {
      // 1. Add tokens locally and in context (it updates firestore too)
      await addTokens(currentGift.amount);

      // 2. Mark gift as claimed in firestore
      const batch = writeBatch(db);
      const giftRef = doc(db, `users/${user.uid}/pendingGifts`, currentGift.id);
      batch.update(giftRef, { status: 'claimed' });
      await batch.commit();

      toast.success(`Claimed ${currentGift.amount} V-Tokens!`);
    } catch (error) {
      console.error("Error claiming gift:", error);
      toast.error("Failed to claim gift. Please try again.");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-md bg-black/60 p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] bg-surface border border-border-soft overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-pink/20 to-transparent pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white mb-6 shadow-xl animate-bounce shadow-brand-pink/30 border-4 border-white dark:border-[#1E1B2E]">
            <Gift size={40} />
          </div>
          
          <h2 className="text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-pink">
            You've Got a Gift!
          </h2>
          
          <p className="text-base mb-2 text-text-main font-semibold">
            {currentGift.message || "A special gift for you!"}
          </p>
          
          <div className="py-4 px-6 rounded-2xl bg-surface-soft border border-border-soft my-6 w-full flex items-center justify-center gap-3">
            <Sparkles className="text-brand-pink" size={24} />
            <span className="text-4xl font-black text-brand-purple">+{currentGift.amount}</span>
            <span className="text-lg font-bold text-text-muted">V-Tokens</span>
          </div>

          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className="w-full py-4 rounded-2xl text-lg font-black text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-purple/25 disabled:opacity-50"
          >
            {isClaiming ? 'Claiming...' : 'Claim Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
