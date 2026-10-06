'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Image as ImageIcon, Layers, CheckCircle, Sun, Moon, ChevronDown } from 'lucide-react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { loginWithGoogle, signUpWithEmail, loginWithEmail } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full flex bg-app-bg dark:bg-[#0B0F1A] transition-colors duration-200 fade-in">
      {/* Left Column (Hero/Branding) */}
      <div className="hidden lg:flex lg:w-[60%] flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-[#F8F7FF] via-[#F3EFFF] to-[#FDF2F8] dark:from-[#0B0F1A] dark:via-[#130B24] dark:to-[#1A0B1E] border-r border-border-soft dark:border-[#2D2A45] transition-colors duration-200">
        
        {/* Absolute Top-Left Logo */}
        <div className="absolute top-8 left-12 z-20 flex items-center gap-2 cursor-default">
          <div className="w-12 h-12 rounded-xl bg-brand-purple flex items-center justify-center text-white font-bold text-3xl">V</div>
          <span className="text-3xl font-extrabold tracking-wider text-[#0F172A] dark:text-white">V-TRY</span>
        </div>

        {/* Text Container restricted to the left */}
        <div className="max-w-md xl:max-w-lg relative z-20 mt-12 pointer-events-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-purple/10 rounded-full mb-6">
            <Sparkles size={14} className="text-brand-purple" />
            <span className="text-xs font-bold text-brand-purple tracking-wide">AI Powered</span>
          </div>

          <h1 className="text-5xl xl:text-6xl font-bold leading-tight text-text-main dark:text-[#FBFAFC] mb-6">
            See it. <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">Try it.</span><br />Love it.
          </h1>
          <p className="text-lg text-text-muted dark:text-[#94A3B8] mb-12">
            Try on outfits virtually with AI and find your perfect style before you buy.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E1B2E] p-3 shadow-sm flex items-center justify-center flex-shrink-0">
                <ImageIcon size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-text-main dark:text-[#FBFAFC] text-lg">Upload & Try On</h3>
                <p className="text-sm text-text-muted dark:text-[#94A3B8] mt-1">Upload your photo and a clothing item to see an instant, photorealistic preview.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E1B2E] p-3 shadow-sm flex items-center justify-center flex-shrink-0">
                <Layers size={24} className="text-brand-purple" />
              </div>
              <div>
                <h3 className="font-bold text-text-main dark:text-[#FBFAFC] text-lg">Multiple Outfits</h3>
                <p className="text-sm text-text-muted dark:text-[#94A3B8] mt-1">Easily switch between different styles, colors, and garments in seconds.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E1B2E] p-3 shadow-sm flex items-center justify-center flex-shrink-0">
                <CheckCircle size={24} className="text-brand-pink" />
              </div>
              <div>
                <h3 className="font-bold text-text-main dark:text-[#FBFAFC] text-lg">Realistic Results</h3>
                <p className="text-sm text-text-muted dark:text-[#94A3B8] mt-1">Our advanced AI ensures accurate fitting, draping, and lighting.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="relative z-20 flex items-center gap-8 pt-12 mt-12 border-t border-border-soft dark:border-[#2D2A45]">
          <div>
            <div className="text-2xl font-black text-brand-purple">100K+</div>
            <div className="text-xs font-bold text-text-muted dark:text-[#94A3B8] uppercase tracking-wider mt-1">Happy Users</div>
          </div>
          <div>
            <div className="text-2xl font-black text-brand-pink">500K+</div>
            <div className="text-xs font-bold text-text-muted dark:text-[#94A3B8] uppercase tracking-wider mt-1">Outfits Tried</div>
          </div>
          <div>
            <div className="text-2xl font-black text-brand-indigo">99%</div>
            <div className="text-xs font-bold text-text-muted dark:text-[#94A3B8] uppercase tracking-wider mt-1">Satisfaction</div>
          </div>
        </div>
        
        {/* 3D Transparent Image */}
        <img 
          src="/vtry.png" 
          alt="V-Try 3D Model" 
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          className="absolute right-[-10%] lg:-right-4 xl:-right-12 top-1/2 -translate-y-1/2 w-[80%] max-w-[700px] h-auto object-contain pointer-events-none z-0 opacity-95" 
        />
      </div>

      {/* Right Column (Auth Form) */}
      <div className="w-full lg:w-[40%] xl:w-[45%] flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Top Nav (Theme) */}
        <div className="absolute top-8 right-8 flex justify-end z-20">
          <button 
            onClick={toggleTheme}
            className="p-2 bg-surface dark:bg-[#1E1B2E] border border-border-soft dark:border-[#2D2A45] rounded-full text-text-muted hover:text-brand-purple transition-colors shadow-sm"
          >
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* Mobile decorative blobs */}
        <div className="lg:hidden absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="lg:hidden absolute bottom-0 left-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="w-full max-w-md bg-surface dark:bg-[#1E1B2E] rounded-[24px] p-8 shadow-2xl border border-border-soft dark:border-[#2D2A45] relative z-10 transition-colors duration-200">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl font-bold text-white bg-brand-purple shadow-lg mb-6">
              V
            </div>
            <h1 className="text-2xl font-bold text-text-main dark:text-[#FBFAFC]">
              Welcome to V-Try
            </h1>
            <p className="text-sm text-text-muted dark:text-[#94A3B8] mt-2 text-center">
              {isSignUp ? 'Create a new account to get started.' : 'Sign in to access your premium virtual try-on studio.'}
            </p>
          </div>

          {error && (
            <div className="w-full mb-6 p-4 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="w-full space-y-5">
            {isSignUp && (
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-text-main dark:text-[#FBFAFC] uppercase tracking-wide">First Name</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-[#94A3B8] group-focus-within:text-brand-purple transition-colors" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm bg-gray-50 dark:bg-[#161324] border border-transparent text-text-main dark:text-[#FBFAFC] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-bold text-text-main dark:text-[#FBFAFC] uppercase tracking-wide">Last Name</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-[#94A3B8] group-focus-within:text-brand-purple transition-colors" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm bg-gray-50 dark:bg-[#161324] border border-transparent text-text-main dark:text-[#FBFAFC] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main dark:text-[#FBFAFC] uppercase tracking-wide">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-[#94A3B8] group-focus-within:text-brand-purple transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm bg-gray-50 dark:bg-[#161324] border border-transparent text-text-main dark:text-[#FBFAFC] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-main dark:text-[#FBFAFC] uppercase tracking-wide">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-[#94A3B8] group-focus-within:text-brand-purple transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm bg-gray-50 dark:bg-[#161324] border border-transparent text-text-main dark:text-[#FBFAFC] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-[#94A3B8] hover:text-brand-purple dark:hover:text-brand-purple transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-brand-purple hover:text-brand-pink transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#EC4899] hover:opacity-90 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')} {!isLoading && <span>&rarr;</span>}
            </button>
          </form>

          <div className="w-full flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border-soft dark:bg-[#2D2A45]" />
            <span className="text-xs font-semibold text-text-muted dark:text-[#94A3B8] uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-border-soft dark:bg-[#2D2A45]" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl text-sm font-bold text-text-main dark:text-[#FBFAFC] bg-white dark:bg-[#161324] border border-border-soft dark:border-[#2D2A45] hover:bg-gray-50 dark:hover:bg-[#1E1B2E] transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-sm font-medium text-text-muted dark:text-[#94A3B8] hover:text-brand-purple dark:hover:text-brand-purple transition-colors"
            >
              {isSignUp ? (
                <>Already have an account? <span className="font-bold text-brand-purple">Sign In</span></>
              ) : (
                <>Don't have an account? <span className="font-bold text-brand-purple">Sign Up</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
