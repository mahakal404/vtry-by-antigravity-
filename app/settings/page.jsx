'use client';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles, Moon, Sun, User, Bell, Shield, Globe, Check, Eye, Upload, Box, Droplet, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Appearance');

  const tabs = [
    { id: 'Appearance', icon: Sparkles },
    { id: 'Profile', icon: User },
    { id: 'Notifications', icon: Bell },
    { id: 'Privacy', icon: Shield },
    { id: 'Language', icon: Globe }
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-[#FBFAFC] transition-colors duration-200">
          Settings
        </h1>
        <p className="text-sm mt-1 text-slate-500 dark:text-[#94A3B8] transition-colors duration-200">
          Customize your V-Try experience
        </p>
      </div>

      {/* Top Horizontal Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-brand-purple text-white'
                : 'text-text-muted hover:bg-surface-soft hover:text-text-main dark:text-[#94A3B8] hover:dark:text-[#FBFAFC] hover:dark:bg-[#1E1B2E]'
            }`}
          >
            <tab.icon size={16} />
            {tab.id}
          </button>
        ))}
      </div>

      {activeTab === 'Appearance' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
          {/* Left Column */}
          <div className="xl:col-span-7 flex flex-col gap-6">
            
            {/* Theme Mode Card */}
            <div className="rounded-[20px] p-5 sm:p-6 bg-card-light border border-border-soft shadow-sm dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200">
              <div className="mb-5">
                <h2 className="font-bold text-lg font-serif text-slate-900 dark:text-[#FBFAFC] transition-colors duration-200">
                  Theme Mode
                </h2>
                <p className="text-xs text-text-muted dark:text-[#94A3B8] mt-1">
                  Choose how V-Try looks for you.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={() => isDarkMode && toggleTheme()}
                  className={`flex flex-col items-center justify-center p-6 rounded-[20px] border transition-all relative ${
                    !isDarkMode
                      ? 'border-brand-purple bg-brand-purple/10'
                      : 'border-border-soft bg-surface dark:border-slate-700 dark:bg-slate-800'
                  }`}
                >
                  {!isDarkMode && (
                    <div className="absolute top-3 right-3 text-brand-purple">
                      <Check size={16} />
                    </div>
                  )}
                  <Sun size={28} className={!isDarkMode ? 'text-brand-purple mb-2' : 'text-slate-400 mb-2'} />
                  <span className={`text-sm font-medium ${!isDarkMode ? 'text-brand-purple' : 'text-slate-600 dark:text-slate-300'}`}>
                    Light Mode
                  </span>
                </button>

                <button
                  onClick={() => !isDarkMode && toggleTheme()}
                  className={`flex flex-col items-center justify-center p-6 rounded-[20px] border transition-all relative ${
                    isDarkMode
                      ? 'border-brand-purple bg-brand-purple/10'
                      : 'border-border-soft bg-surface dark:border-slate-700 dark:bg-slate-800'
                  }`}
                >
                  {isDarkMode && (
                    <div className="absolute top-3 right-3 text-brand-purple">
                      <Check size={16} />
                    </div>
                  )}
                  <Moon size={28} className={isDarkMode ? 'text-brand-purple mb-2' : 'text-slate-400 mb-2'} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-brand-purple' : 'text-slate-600 dark:text-slate-300'}`}>
                    Dark Mode
                  </span>
                </button>
              </div>
            </div>

            {/* Color Palette Card */}
            <div className="rounded-[20px] p-5 sm:p-6 bg-surface border border-border-soft shadow-sm dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-bold text-lg font-serif text-slate-900 dark:text-[#FBFAFC] transition-colors duration-200">
                    Color Palette ({isDarkMode ? 'Dark Mode' : 'Light Mode'})
                  </h2>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-soft text-text-muted text-xs font-medium hover:bg-surface-soft dark:border-[#2D2A45] dark:text-[#94A3B8] dark:hover:bg-[#161324] transition-colors">
                  <RotateCcw size={12} /> Reset to Default
                </button>
              </div>

              {!isDarkMode ? (
                <div className="space-y-8">
                  {/* Light Mode Palette */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Primary Colors (Brand)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { hex: '#8B5CF6', name: 'Primary Purple', usage: '(Buttons, Active)' },
                        { hex: '#EC4899', name: 'Primary Pink', usage: '(Highlights, CTA)' },
                        { hex: '#6366F1', name: 'Secondary Purple', usage: '(Hover, Accent)' },
                      ].map((color) => (
                        <div key={color.hex} className="flex flex-col gap-2">
                          <div className="h-20 w-full rounded-xl border border-border-soft shadow-sm transition-colors duration-200" style={{ backgroundColor: color.hex }} />
                          <div>
                            <div className="text-sm font-bold text-text-main dark:text-white">{color.hex}</div>
                            <div className="text-xs text-text-muted dark:text-slate-400">{color.name} {color.usage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Background Colors</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { hex: '#F8FAFF', name: 'Page Background', usage: '(Soft)' },
                        { hex: '#FFFFFF', name: 'Card Background', usage: '(White)' },
                        { hex: '#F1F5FF', name: 'Sidebar Background', usage: '(Light)' },
                      ].map((color) => (
                        <div key={color.hex} className="flex flex-col gap-2">
                          <div className="h-20 w-full rounded-xl border border-border-soft shadow-sm transition-colors duration-200" style={{ backgroundColor: color.hex }} />
                          <div>
                            <div className="text-sm font-bold text-text-main dark:text-white">{color.hex}</div>
                            <div className="text-xs text-text-muted dark:text-slate-400">{color.name} {color.usage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Text Colors</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { hex: '#0F172A', name: 'Primary Text', usage: '(Headings)' },
                        { hex: '#475569', name: 'Secondary Text', usage: '(Subtext)' },
                        { hex: '#94A3B8', name: 'Muted Text', usage: '(Descriptions)' },
                      ].map((color) => (
                        <div key={color.hex} className="flex flex-col gap-2">
                          <div className="h-20 w-full rounded-xl border border-border-soft shadow-sm transition-colors duration-200" style={{ backgroundColor: color.hex }} />
                          <div>
                            <div className="text-sm font-bold text-text-main dark:text-white">{color.hex}</div>
                            <div className="text-xs text-text-muted dark:text-slate-400">{color.name} {color.usage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Dark Mode Palette */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-[#FBFAFC] mb-4">Primary Colors</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { hex: '#8B5CF6', name: 'Primary Purple' },
                        { hex: '#EC4899', name: 'Primary Pink' },
                        { hex: '#6366F1', name: 'Secondary Purple' },
                      ].map((color) => (
                        <div key={color.hex} className="flex flex-col gap-2">
                          <div className="h-20 w-full rounded-xl border border-transparent shadow-sm dark:border-[#2D2A45] transition-colors duration-200" style={{ backgroundColor: color.hex }} />
                          <div>
                            <div className="text-sm font-bold text-text-main dark:text-[#FBFAFC]">{color.hex}</div>
                            <div className="text-xs text-text-muted dark:text-[#94A3B8]">{color.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-[#FBFAFC] mb-4">Background Colors</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { hex: '#0B0F1A', name: 'Page Background' },
                        { hex: '#111827', name: 'Sidebar BG' },
                        { hex: '#1E1B2E', name: 'Card Background' },
                      ].map((color) => (
                        <div key={color.hex} className="flex flex-col gap-2">
                          <div className="h-20 w-full rounded-xl border border-transparent shadow-sm dark:border-[#2D2A45] transition-colors duration-200" style={{ backgroundColor: color.hex }} />
                          <div>
                            <div className="text-sm font-bold text-text-main dark:text-[#FBFAFC]">{color.hex}</div>
                            <div className="text-xs text-text-muted dark:text-[#94A3B8]">{color.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-[#FBFAFC] mb-4">Text & Border Colors</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { hex: '#FBFAFC', name: 'Primary Text' },
                        { hex: '#94A3B8', name: 'Secondary Text' },
                        { hex: '#2D2A45', name: 'Default Border' },
                      ].map((color) => (
                        <div key={color.hex} className="flex flex-col gap-2">
                          <div className="h-20 w-full rounded-xl border border-transparent shadow-sm dark:border-[#2D2A45] transition-colors duration-200" style={{ backgroundColor: color.hex }} />
                          <div>
                            <div className="text-sm font-bold text-text-main dark:text-[#FBFAFC]">{color.hex}</div>
                            <div className="text-xs text-text-muted dark:text-[#94A3B8]">{color.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            
            {/* Live Preview Card */}
            <div className="rounded-[20px] p-5 sm:p-6 bg-surface border border-border-soft shadow-sm dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={18} className="text-brand-purple" />
                <h2 className="font-bold text-lg font-serif text-slate-900 dark:text-[#FBFAFC] transition-colors duration-200">
                  Live Preview
                </h2>
              </div>
              <p className="text-xs text-text-muted dark:text-[#94A3B8] mb-6">
                See how the colors look in real components.
              </p>

              <div className="p-5 rounded-xl border border-border-soft bg-app-bg dark:bg-[#0B0F1A] dark:border-[#2D2A45] transition-colors duration-200 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <button className="flex-1 py-2 bg-brand-purple text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
                    Primary Button
                  </button>
                  <button className="flex-1 py-2 bg-surface border border-border-soft text-text-main rounded-lg text-sm font-medium hover:bg-surface-soft dark:bg-[#1E1B2E] dark:border-[#2D2A45] dark:text-[#FBFAFC] dark:hover:bg-[#161324] transition-colors shadow-sm">
                    Secondary
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-[#D8D2EE] rounded-xl bg-surface-soft dark:border-[#3B3663] dark:bg-[#161324] text-text-muted dark:text-[#94A3B8] transition-colors">
                  <Upload size={20} className="mb-2 opacity-50" />
                  <span className="text-xs font-medium">Upload Area Placeholder</span>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border-soft dark:bg-[#1E1B2E] dark:border-[#2D2A45] shadow-sm flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-main dark:text-[#FBFAFC]">Sample Card</h4>
                      <p className="text-xs text-text-muted dark:text-[#94A3B8]">Card description here</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-[10px] font-bold bg-brand-indigo/10 text-brand-indigo rounded">
                    NEW
                  </span>
                </div>
              </div>
            </div>

            {/* UI Component Colors Card */}
            <div className="rounded-[20px] p-5 sm:p-6 bg-surface border border-border-soft shadow-sm dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200">
              <div className="flex items-center gap-2 mb-2">
                <Box size={18} className="text-brand-purple" />
                <h2 className="font-bold text-lg font-serif text-slate-900 dark:text-[#FBFAFC] transition-colors duration-200">
                  UI Component Colors
                </h2>
              </div>
              <p className="text-xs text-text-muted dark:text-[#94A3B8] mb-6">
                Specific elements and their colors.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Sidebar', color: isDarkMode ? '#111827' : '#FFFFFF' },
                  { label: 'Header', color: isDarkMode ? '#111827' : '#FFFFFF' },
                  { label: 'Card', color: isDarkMode ? '#1E1B2E' : '#FFFFFF' },
                  { label: 'Input BG', color: isDarkMode ? '#161324' : '#FFFFFF' },
                  { label: 'Border Soft', color: isDarkMode ? '#2D2A45' : '#E5E7EB' },
                  { label: 'Border Active', color: isDarkMode ? '#8B5CF6' : '#8B5CF6' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border-soft dark:border-[#2D2A45] transition-colors">
                    <div className="w-6 h-6 rounded-md shadow-sm border border-border-soft dark:border-transparent" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-text-main dark:text-[#FBFAFC]">{item.label}</span>
                      <span className="text-[10px] text-text-muted dark:text-[#94A3B8]">{item.color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Usage Card */}
            <div className="rounded-[20px] p-5 sm:p-6 bg-surface border border-border-soft shadow-sm dark:bg-[#1E1B2E] dark:border-[#2D2A45] transition-colors duration-200">
              <div className="flex items-center gap-2 mb-2">
                <Droplet size={18} className="text-brand-purple" />
                <h2 className="font-bold text-lg font-serif text-slate-900 dark:text-[#FBFAFC] transition-colors duration-200">
                  Gradient Usage
                </h2>
              </div>
              <p className="text-xs text-text-muted dark:text-[#94A3B8] mb-6">
                Main gradients used in buttons and highlights.
              </p>

              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="h-12 w-full rounded-lg bg-gradient-to-r from-brand-indigo to-brand-purple shadow-sm mb-2" />
                  <span className="text-xs font-medium text-text-main dark:text-[#FBFAFC]">Primary Gradient</span>
                  <p className="text-[10px] text-text-muted dark:text-[#94A3B8]">#6366F1 → #8B5CF6</p>
                </div>
                <div className="flex-1">
                  <div className="h-12 w-full rounded-lg bg-gradient-to-r from-brand-purple to-brand-pink shadow-sm mb-2" />
                  <span className="text-xs font-medium text-text-main dark:text-[#FBFAFC]">Accent Gradient</span>
                  <p className="text-[10px] text-text-muted dark:text-[#94A3B8]">#8B5CF6 → #EC4899</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
