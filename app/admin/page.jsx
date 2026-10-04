'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ShieldCheck, Gift, Coins, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [giftAmount, setGiftAmount] = useState(10);

  useEffect(() => {
    // Wait until auth state is known
    if (user === null) return; 

    if (user.email !== 'rc6542698@gmail.com') {
      router.push('/studio');
      return;
    }

    const fetchUsers = async () => {
      try {
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched Users:", userList);
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, router]);

  const handleOpenGiftModal = (u) => {
    setSelectedUser(u);
    setGiftAmount(10);
    setIsModalOpen(true);
  };

  const handleSendGift = async () => {
    if (!selectedUser || giftAmount <= 0) return;
    
    try {
      const giftRef = doc(collection(db, `users/${selectedUser.id}/pendingGifts`));
      await setDoc(giftRef, {
        amount: Number(giftAmount),
        status: 'pending',
        message: 'V-Try owner gifted you tokens to use V-Try!',
        timestamp: new Date().toISOString()
      });
      
      toast.success(`Gift of ${giftAmount} tokens sent to ${selectedUser.displayName || selectedUser.firstName || selectedUser.email}`);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending gift:", error);
      toast.error("Failed to send gift");
    }
  };

  if (loading || user?.email !== 'rc6542698@gmail.com') {
    return <div className="flex items-center justify-center h-[50vh] text-text-muted">Loading Secure Dashboard...</div>;
  }

  return (
    <div className="space-y-6 fade-in pb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20 shadow-sm">
          <ShieldCheck className="text-brand-purple" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-text-main dark:text-[#FBFAFC]">Admin Panel</h1>
          <p className="text-sm text-text-muted dark:text-[#94A3B8]">Manage users and send custom gifts.</p>
        </div>
      </div>

      <div className="bg-surface dark:bg-[#1E1B2E] border border-border-soft dark:border-[#2D2A45] rounded-2xl overflow-hidden shadow-sm transition-colors duration-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-main dark:text-[#FBFAFC]">
            <thead className="bg-surface-soft dark:bg-[#161324] text-text-muted dark:text-[#94A3B8] font-bold border-b border-border-soft dark:border-[#2D2A45] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft dark:divide-[#2D2A45]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface-soft/50 dark:hover:bg-[#161324]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-indigo flex items-center justify-center text-white overflow-hidden shadow-sm">
                        {u.avatar ? <img src={u.avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <User size={16} />}
                      </div>
                      <span className="font-semibold">{u.displayName || u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'No Name'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-muted dark:text-[#94A3B8]">{u.email || u.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-black text-brand-purple">
                      <Coins size={14} />
                      {u.balance ?? u.tokens ?? u.vTokens ?? 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleOpenGiftModal(u)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-xs hover:opacity-90 transition-opacity shadow-md"
                    >
                      <Gift size={14} /> Gift
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/60 p-4 fade-in">
          <div className="w-full max-w-sm rounded-3xl p-7 shadow-2xl bg-surface dark:bg-[#1E1B2E] border border-border-soft dark:border-[#2D2A45]">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink shadow-inner border border-brand-pink/20">
                <Gift size={28} />
              </div>
            </div>
            <h2 className="text-xl font-black mb-1 text-center tracking-tight text-text-main dark:text-[#FBFAFC]">
              Send V-Tokens
            </h2>
            <p className="text-xs mb-6 text-center font-semibold text-text-muted dark:text-[#94A3B8]">
              To: {selectedUser.displayName || selectedUser.name || selectedUser.firstName || selectedUser.email}
            </p>
            
            <div className="mb-6">
              <label className="block text-[10px] font-bold text-brand-purple mb-2 uppercase tracking-wider">Gift Amount</label>
              <input
                type="number"
                value={giftAmount}
                onChange={(e) => setGiftAmount(e.target.value)}
                className="w-full bg-surface-soft dark:bg-[#161324] border border-border-soft dark:border-[#2D2A45] rounded-xl px-4 py-3 font-black text-text-main dark:text-[#FBFAFC] focus:outline-none focus:border-brand-purple transition-colors"
                min="1"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-surface-soft dark:hover:bg-[#161324] text-text-main dark:text-[#94A3B8] border border-border-soft dark:border-[#2D2A45]"
              >
                Cancel
              </button>
              <button
                onClick={handleSendGift}
                className="flex-1 py-3.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 shadow-lg shadow-brand-pink/20 bg-gradient-to-r from-brand-purple to-brand-pink"
              >
                Send Gift
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
