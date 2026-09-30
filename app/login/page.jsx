'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { User } from 'lucide-react';

/**
 * Guest Entry Page
 * - Responsive to global theme
 * - First Name and Last Name fields only
 * - Simple "Enter App" button for frictionless entry
 */
export default function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  
  const { enterApp } = useAuth();
  const { useGradient } = useTheme();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please provide both your First and Last name.');
      return;
    }

    try {
      enterApp(firstName.trim(), lastName.trim());
      router.push('/studio');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${useGradient ? 'gradient-bg' : ''}`}
         style={{
           backgroundColor: useGradient ? undefined : 'var(--color-bg)',
         }}>
      {/* Decorative background elements using theme primary color */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
             style={{ backgroundColor: 'var(--color-primary)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
             style={{ backgroundColor: 'var(--color-primary)' }} />
      </div>

      <div className="w-full max-w-md relative fade-in z-10">
        {/* Top Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-xl"
               style={{ backgroundColor: 'var(--color-primary)' }}>
            V
          </div>
        </div>

        {/* Entry Card */}
        <div className="rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
             style={{
               backgroundColor: 'var(--color-card)',
               border: '1px solid var(--color-border)',
             }}>
          <h1 className="text-2xl font-bold text-center mb-1" style={{ color: 'var(--color-text)' }}>
            Welcome to V-Try
          </h1>
          <p className="text-center text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
            Please enter your name to continue
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm font-medium border" 
                 style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', color: '#dc2626', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4 flex-col sm:flex-row">
              {/* First Name Field */}
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: 'var(--color-muted)' }}>
                  First Name
                </label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--color-primary)]" style={{ color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>
              </div>

              {/* Last Name Field */}
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: 'var(--color-muted)' }}>
                  Last Name
                </label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--color-primary)]" style={{ color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98] mt-2 shadow-md"
              style={{
                backgroundColor: 'var(--color-primary)',
              }}
            >
              Enter App
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
