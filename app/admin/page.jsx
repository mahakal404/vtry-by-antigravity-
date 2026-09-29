'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  RefreshCw, Megaphone, Users, Plus, Minus, Trash2,
  Save, ArrowLeft, ShieldCheck
} from 'lucide-react';

/**
 * Admin Dashboard Page (Protected Route)
 * - Only accessible to admin@vtry.com
 * - Marketing & Sales: Sale name, discount %, activate toggle
 * - Registered Users: Table with token management & delete actions
 */

// Mock registered users data
const INITIAL_USERS = [
  { id: 1, name: 'rob 2', email: 'tk00076547698@gmail.com', avatar: 'R', tokens: 32, joined: 'Mar 24, 2026', isOwner: false },
  { id: 2, name: 'Mr R', email: 'vtry.owner01@gmail.com', avatar: 'M', tokens: Infinity, joined: 'Feb 4, 2026', isOwner: true, isAdmin: true },
  { id: 3, name: 'boss #', email: 'admin@vtry.com', avatar: 'B', tokens: 227, joined: 'Feb 1, 2026', isOwner: false },
  { id: 4, name: 'Roshan Chauhan', email: 'rc6542698@gmail.com', avatar: 'R', tokens: 11855, joined: 'Feb 1, 2026', isOwner: false },
];

export default function Admin() {
  const { user } = useAuth();
  const navigate = useRouter();

  // Marketing state
  const [saleName, setSaleName] = useState('Mega Launch Party');
  const [discount, setDiscount] = useState('50');
  const [saleActive, setSaleActive] = useState(false);

  // Users state
  const [users, setUsers] = useState(INITIAL_USERS);
  const [tokenAmounts, setTokenAmounts] = useState(
    INITIAL_USERS.reduce((acc, u) => ({ ...acc, [u.id]: 10 }), {})
  );

  // Protect route: Only admin can access
  if (!user?.isAdmin) {
    return redirect('/studio');
  }

  // Update token input for a specific user
  const handleTokenAmountChange = (userId, value) => {
    setTokenAmounts(prev => ({ ...prev, [userId]: parseInt(value) || 0 }));
  };

  // Add tokens to a user
  const addTokens = (userId) => {
    const amount = tokenAmounts[userId] || 0;
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, tokens: (u.tokens === Infinity ? Infinity : u.tokens + amount) } : u
    ));
  };

  // Remove tokens from a user
  const removeTokens = (userId) => {
    const amount = tokenAmounts[userId] || 0;
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, tokens: (u.tokens === Infinity ? Infinity : Math.max(0, u.tokens - amount)) } : u
    ));
  };

  // Delete a user
  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  // Save marketing settings
  const saveMarketing = () => {
    alert(`Marketing settings saved!\nSale: ${saleName}\nDiscount: ${discount}%\nActive: ${saleActive}`);
  };

  // Refresh data
  const handleRefresh = () => {
    setUsers([...INITIAL_USERS]);
    setTokenAmounts(INITIAL_USERS.reduce((acc, u) => ({ ...acc, [u.id]: 10 }), {}));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/studio')} className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--color-muted)' }}>
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #8852e0, #b47aff)' }}>
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Manage users and tokens</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
          style={{ color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Marketing & Sales Section */}
      <div className="rounded-2xl p-5 sm:p-6"
           style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2 mb-5">
          <Megaphone size={18} style={{ color: 'var(--color-primary)' }} />
          <h2 className="font-bold text-base" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
            Marketing & Sales
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* Sale Name Input */}
          <div>
            <label className="flex items-center gap-1 text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
              🏷️ Sale Name
            </label>
            <input
              type="text"
              value={saleName}
              onChange={(e) => setSaleName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
          </div>

          {/* Discount Input */}
          <div>
            <label className="flex items-center gap-1 text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
              % Discount Percentage
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
          </div>

          {/* Activate Sale Toggle */}
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-muted)' }}>
              Activate Sale Mode
            </label>
            <div className="flex items-center gap-3 mt-2">
              <div
                onClick={() => setSaleActive(!saleActive)}
                className={`toggle-switch ${saleActive ? 'active' : ''}`}
              />
              <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                Sale is {saleActive ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={saveMarketing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#22c55e' }}
        >
          <Save size={14} /> Save Marketing Settings
        </button>
      </div>

      {/* Registered Users Section */}
      <div className="rounded-2xl p-5 sm:p-6"
           style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2 mb-5">
          <Users size={18} style={{ color: 'var(--color-primary)' }} />
          <h2 className="font-bold text-base" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
            Registered Users
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: 'rgba(136,82,224,0.2)', color: 'var(--color-primary)' }}>
            {users.length}
          </span>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                <th className="text-left pb-3 pr-4">User</th>
                <th className="text-left pb-3 pr-4">Email</th>
                <th className="text-left pb-3 pr-4">V-Tokens</th>
                <th className="text-left pb-3 pr-4">Joined</th>
                <th className="text-left pb-3 pr-4">Manage Tokens</th>
                <th className="text-left pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}
                    className="border-t"
                    style={{ borderColor: 'var(--color-border)' }}>
                  {/* User Avatar + Name */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                           style={{ backgroundColor: 'var(--color-primary)' }}>
                        {u.avatar}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--color-text)' }}>
                          {u.name}
                        </span>
                        {u.isAdmin && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                                style={{ backgroundColor: 'var(--color-primary)' }}>
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 pr-4 text-sm" style={{ color: 'var(--color-muted)' }}>
                    {u.email}
                  </td>

                  {/* Token Balance */}
                  <td className="py-4 pr-4">
                    <span className="flex items-center gap-1 text-sm font-medium" style={{ color: '#f59e0b' }}>
                      🪙 {u.tokens === Infinity ? '∞' : u.tokens.toLocaleString()}
                    </span>
                  </td>

                  {/* Join Date */}
                  <td className="py-4 pr-4 text-sm whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>
                    {u.joined}
                  </td>

                  {/* Manage Tokens */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={tokenAmounts[u.id] || 10}
                        onChange={(e) => handleTokenAmountChange(u.id, e.target.value)}
                        className="w-14 px-2 py-1.5 rounded-lg text-xs text-center"
                        style={{
                          backgroundColor: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                        }}
                      />
                      <button
                        onClick={() => addTokens(u.id)}
                        className="p-1.5 rounded-lg hover:bg-green-500/10 transition-colors"
                        style={{ color: '#22c55e' }}
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeTokens(u.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                        style={{ color: '#ef4444' }}
                      >
                        <Minus size={14} />
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4">
                    {u.isOwner ? (
                      <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                        Protected
                      </span>
                    ) : (
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/10 transition-colors"
                        style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
