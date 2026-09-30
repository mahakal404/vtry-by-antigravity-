'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Mail, Lock } from 'lucide-react';

/**
 * Authentication Page
 * - Responsive to global theme
 * - Features Email/Password Auth & Google Login
 */
export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { loginWithGoogle, signUpWithEmail, loginWithEmail } = useAuth();
  const { useGradient } = useTheme();
  const router = useRouter();

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => setMounted(true), []);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!firstName.trim() || !lastName.trim()) {
          throw new Error('Please provide both your First and Last name.');
        }
        await signUpWithEmail(email, password, firstName.trim(), lastName.trim());
      } else {
        await loginWithEmail(email, password);
      }
      router.push('/studio');
    } catch (err) {
      // Clean up Firebase error messages for the user
      let message = err.message || 'An error occurred.';
      if (message.includes('auth/invalid-credential')) message = 'Invalid email or password.';
      if (message.includes('auth/email-already-in-use')) message = 'Email is already in use.';
      if (message.includes('auth/weak-password')) message = 'Password should be at least 6 characters.';
      if (message.includes('auth/invalid-api-key')) message = 'Configuration Error: Invalid Firebase API Key. Please restart your dev server if you just added the .env file.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      router.push('/studio');
    } catch (err) {
      let message = err.message || 'An error occurred during Google Login.';
      if (message.includes('auth/invalid-api-key')) message = 'Configuration Error: Invalid Firebase API Key. Please restart your dev server if you just added the .env file.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${mounted && useGradient ? 'gradient-bg' : ''}`}
         style={{
           backgroundColor: mounted && useGradient ? undefined : 'var(--color-bg)',
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
        <div className="rounded-3xl p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center"
             style={{
               backgroundColor: 'var(--color-card)',
               border: '1px solid var(--color-border)',
             }}>
          <h1 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--color-text)' }}>
            Welcome to V-Try
          </h1>
          <p className="text-center text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
            {isSignUp ? 'Create an account to continue.' : 'Sign in to access your premium virtual try-on studio.'}
          </p>

          {error && (
            <div className="w-full mb-6 p-4 rounded-xl text-sm font-medium border" 
                 style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', color: '#dc2626', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="w-full space-y-4">
            {isSignUp && (
              <div className="flex gap-4 flex-col sm:flex-row">
                {/* First Name */}
                <div className="flex-1">
                  <div className="relative group">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--color-primary)]" style={{ color: 'var(--color-muted)' }} />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }}
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div className="flex-1">
                  <div className="relative group">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--color-primary)]" style={{ color: 'var(--color-muted)' }} />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      required
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
            )}

            {/* Email Field */}
            <div className="relative group">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--color-primary)]" style={{ color: 'var(--color-muted)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)'
                }}
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--color-primary)]" style={{ color: 'var(--color-muted)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98] mt-2 shadow-md disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-primary)',
              }}
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {/* Toggle Form Type */}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="mt-6 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: 'var(--color-text)' }}
          >
            {isSignUp ? (
              <>Already have an account? <span style={{ color: 'var(--color-primary)' }}>Log In</span></>
            ) : (
              <>Don't have an account? <span style={{ color: 'var(--color-primary)' }}>Sign Up</span></>
            )}
          </button>

          {/* Divider */}
          <div className="w-full flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>OR</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98] shadow-md disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), #9333ea)',
            }}
          >
            {/* Simple Google G icon SVG */}
            <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
