import { createContext, useContext, useState, useEffect } from 'react';

// ThemeContext manages global theming with CSS variables and localStorage persistence

const ThemeContext = createContext(null);

// Predefined theme presets matching the Settings page design
export const THEME_PRESETS = {
  'dark-purple': {
    name: 'Dark Purple',
    primary: '#8852e0',
    bg: '#1b0f2e',
    card: '#291943',
    text: '#fafafa',
    muted: '#a294b8',
    border: '#3b2d53',
    isDark: true,
  },
  'light-purple': {
    name: 'Light Purple',
    primary: '#7c3aed',
    bg: '#f3e8ff',
    card: '#e9d5ff',
    text: '#1e1b2e',
    muted: '#6b5b7b',
    border: '#c4b5d6',
    isDark: false,
  },
  'red-white': {
    name: 'Red on White',
    primary: '#dc2626',
    bg: '#ffffff',
    card: '#fef2f2',
    text: '#1a1a1a',
    muted: '#6b7280',
    border: '#e5e7eb',
    isDark: false,
  },
  'dark-red': {
    name: 'Dark Red on Black',
    primary: '#dc2626',
    bg: '#0a0a0a',
    card: '#1a1a1a',
    text: '#fafafa',
    muted: '#a1a1aa',
    border: '#2a2a2a',
    isDark: true,
  },
  'blue-white': {
    name: 'Blue on White',
    primary: '#2563eb',
    bg: '#ffffff',
    card: '#eff6ff',
    text: '#1a1a1a',
    muted: '#6b7280',
    border: '#e5e7eb',
    isDark: false,
  },
  'black-white': {
    name: 'Black on White',
    primary: '#1a1a1a',
    bg: '#ffffff',
    card: '#f5f5f5',
    text: '#1a1a1a',
    muted: '#6b7280',
    border: '#e5e7eb',
    isDark: false,
  },
};

const DEFAULT_THEME_KEY = 'light-purple';

export function ThemeProvider({ children }) {
  const [currentPreset, setCurrentPreset] = useState(() => {
    return localStorage.getItem('vtry_theme_preset') || DEFAULT_THEME_KEY;
  });

  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem('vtry_custom_colors');
    return saved ? JSON.parse(saved) : null;
  });

  const [useGradient, setUseGradient] = useState(() => {
    return localStorage.getItem('vtry_gradient') === 'true';
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('vtry_dark_mode');
    return saved !== null ? saved === 'true' : false;
  });

  // Apply CSS variables whenever theme changes
  useEffect(() => {
    const colors = customColors || THEME_PRESETS[currentPreset] || THEME_PRESETS[DEFAULT_THEME_KEY];
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-bg', colors.bg);
    root.style.setProperty('--color-card', colors.card);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-muted', colors.muted);
    root.style.setProperty('--color-border', colors.border);
    document.body.style.backgroundColor = colors.bg;
    document.body.style.color = colors.text;
  }, [currentPreset, customColors]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('vtry_theme_preset', currentPreset);
    localStorage.setItem('vtry_gradient', String(useGradient));
    localStorage.setItem('vtry_dark_mode', String(darkMode));
    if (customColors) {
      localStorage.setItem('vtry_custom_colors', JSON.stringify(customColors));
    } else {
      localStorage.removeItem('vtry_custom_colors');
    }
  }, [currentPreset, useGradient, darkMode, customColors]);

  // Select a preset theme
  const selectPreset = (key) => {
    setCurrentPreset(key);
    setCustomColors(null); // Clear custom colors when selecting a preset
  };

  // Save custom color overrides
  const saveCustomColors = (colors) => {
    setCustomColors(colors);
  };

  const resetToDefault = () => {
    setCurrentPreset(DEFAULT_THEME_KEY);
    setCustomColors(null);
    setUseGradient(false);
    setDarkMode(false);
  };

  // Get current active colors (custom or preset)
  const getActiveColors = () => {
    return customColors || THEME_PRESETS[currentPreset] || THEME_PRESETS[DEFAULT_THEME_KEY];
  };

  return (
    <ThemeContext.Provider value={{
      currentPreset,
      selectPreset,
      customColors,
      saveCustomColors,
      useGradient,
      setUseGradient,
      darkMode,
      setDarkMode,
      resetToDefault,
      getActiveColors,
      THEME_PRESETS,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
