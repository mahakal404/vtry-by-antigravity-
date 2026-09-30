'use client';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles, Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm mt-1 text-slate-500 dark:text-slate-400">
          Customize your V-Try experience
        </p>
      </div>

      {/* Appearance Section */}
      <div className="rounded-2xl p-5 sm:p-6 bg-card-light dark:bg-slate-800 border border-border-soft dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles size={18} className="text-brand-purple" />
          <h2 className="font-bold text-lg font-serif text-slate-900 dark:text-white">
            Appearance
          </h2>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
             {isDarkMode ? <Moon size={20} className="text-brand-purple" /> : <Sun size={20} className="text-brand-purple" />}
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Switch between light and dark themes</p>
            </div>
          </div>
          <div
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${isDarkMode ? 'bg-brand-purple' : 'bg-border-soft dark:bg-slate-600'}`}
          >
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : ''}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
