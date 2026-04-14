import { useState } from 'react';
import { useTheme, THEME_PRESETS } from '../contexts/ThemeContext';
import { Palette, ChevronUp, ChevronDown, Save, RotateCcw, Sparkles } from 'lucide-react';

/**
 * Settings Page
 * - Theme preset selection (6 presets)
 * - Advanced customization with color pickers
 * - Dark mode and gradient toggles
 * - Save custom theme / Reset to default
 */
export default function Settings() {
  const {
    currentPreset, selectPreset, customColors, saveCustomColors,
    useGradient, setUseGradient, darkMode, setDarkMode,
    resetToDefault, getActiveColors,
  } = useTheme();

  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [localColors, setLocalColors] = useState(getActiveColors());

  // Update a specific color in the local state and preview in real-time
  const handleColorChange = (key, value) => {
    const updated = { ...localColors, [key]: value };
    setLocalColors(updated);
    // Apply immediately for real-time preview
    saveCustomColors(updated);
  };

  // Save current colors as custom theme
  const handleSaveCustom = () => {
    saveCustomColors(localColors);
    alert('Custom theme saved!');
  };

  // Reset everything to default
  const handleReset = () => {
    resetToDefault();
    setLocalColors(THEME_PRESETS['dark-purple']);
  };

  // When selecting a preset, update local colors to match
  const handlePresetSelect = (key) => {
    selectPreset(key);
    setLocalColors(THEME_PRESETS[key]);
  };

  // Gradient presets for the Advanced section
  const gradientPresets = [
    { name: 'Purple to Blue', colors: ['#8852e0', '#2563eb'], bg: 'linear-gradient(135deg, #8852e0, #2563eb)' },
    { name: 'Pink to Purple', colors: ['#ec4899', '#8b5cf6'], bg: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
    { name: 'Teal to Cyan', colors: ['#14b8a6', '#06b6d4'], bg: 'linear-gradient(135deg, #14b8a6, #06b6d4)' },
  ];

  // Map of preset keys to their display colors for the visual selector
  const presetVisuals = {
    'dark-purple': { bg: '#1b0f2e', dot: '#8852e0' },
    'light-purple': { bg: '#e9d5ff', dot: '#7c3aed' },
    'red-white': { bg: '#ffffff', dot: '#dc2626' },
    'dark-red': { bg: '#0a0a0a', dot: '#dc2626' },
    'blue-white': { bg: '#ffffff', dot: '#2563eb' },
    'black-white': { bg: '#ffffff', dot: '#1a1a1a' },
  };

  const colorInputs = [
    { key: 'primary', label: 'Primary Color' },
    { key: 'bg', label: 'Background' },
    { key: 'card', label: 'Card Background' },
    { key: 'text', label: 'Text Color' },
    { key: 'muted', label: 'Muted Text' },
    { key: 'border', label: 'Border Color' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          Customize your V-Try experience
        </p>
      </div>

      {/* Theme Presets Section */}
      <div className="rounded-2xl p-5 sm:p-6"
           style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2 mb-5">
          <Palette size={18} style={{ color: 'var(--color-primary)' }} />
          <h2 className="font-bold text-lg" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
            Theme Presets
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Object.entries(THEME_PRESETS).map(([key, preset]) => {
            const vis = presetVisuals[key];
            const isActive = currentPreset === key && !customColors;
            return (
              <button
                key={key}
                onClick={() => handlePresetSelect(key)}
                className="rounded-xl p-3 text-center transition-all relative"
                style={{
                  border: isActive ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                }}
              >
                {isActive && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: 'var(--color-primary)' }}>✓</span>
                )}
                <div className="w-full h-14 rounded-lg mb-2 flex items-center justify-center"
                     style={{ backgroundColor: vis.bg }}>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: vis.dot }} />
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Customization Section */}
      <div className="rounded-2xl overflow-hidden"
           style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
        {/* Accordion Header */}
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="w-full flex items-center justify-between p-5 text-left"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
            <h2 className="font-bold text-lg" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
              Advanced Customization
            </h2>
          </div>
          {advancedOpen ? <ChevronUp size={20} style={{ color: 'var(--color-muted)' }} /> : <ChevronDown size={20} style={{ color: 'var(--color-muted)' }} />}
        </button>

        {advancedOpen && (
          <div className="px-5 pb-5 space-y-5">
            {/* Info Note */}
            <div className="text-xs p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)' }}>
              Changes are previewed in real-time. Click "Apply" to save, or "Cancel" to revert.
            </div>

            {/* Gradient Presets */}
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>Gradient Presets</h3>
              <div className="grid grid-cols-3 gap-3">
                {gradientPresets.map((gp) => (
                  <button
                    key={gp.name}
                    onClick={() => handleColorChange('primary', gp.colors[0])}
                    className="rounded-xl h-14 text-xs font-medium text-white"
                    style={{ background: gp.bg }}
                  >
                    {gp.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Pickers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {colorInputs.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text)' }}>
                    {label}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={localColors[key] || '#000000'}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-none"
                    />
                    <input
                      type="text"
                      value={localColors[key] || ''}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg text-xs font-mono"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Dark Mode</span>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Enable dark mode for better visibility</p>
                </div>
                <div
                  onClick={() => setDarkMode(!darkMode)}
                  className={`toggle-switch ${darkMode ? 'active' : ''}`}
                />
              </div>

              {/* Gradient Toggle */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Use Gradient Background</span>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Apply a gradient effect to background</p>
                </div>
                <div
                  onClick={() => setUseGradient(!useGradient)}
                  className={`toggle-switch ${useGradient ? 'active' : ''}`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleSaveCustom}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #8852e0, #b47aff)' }}
              >
                <Save size={16} /> Save as Custom Theme
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              >
                Reset to Default
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
