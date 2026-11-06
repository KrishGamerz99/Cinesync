import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig } from '../types';

export interface ThemePreset {
  name: string;
  id: string;
  primary: string;
  primaryGlow: string;
  secondary: string;
  description: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'galaxy',
    name: 'Purple Galaxy',
    primary: '#D0BCFF',
    primaryGlow: 'rgba(208, 188, 255, 0.45)',
    secondary: '#FFB0CD',
    description: 'Cosmic Nocturne'
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    primary: '#9ECAFF',
    primaryGlow: 'rgba(158, 202, 255, 0.45)',
    secondary: '#80D5FF',
    description: 'Sapphire & Cyan'
  },
  {
    id: 'cyber',
    name: 'Neon Cyber',
    primary: '#69DB7C',
    primaryGlow: 'rgba(105, 219, 124, 0.45)',
    secondary: '#38D9A9',
    description: 'Emerald & Matrix'
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    primary: '#FFB95F',
    primaryGlow: 'rgba(255, 185, 95, 0.45)',
    secondary: '#FF8787',
    description: 'Amber & Coral'
  },
  {
    id: 'rose',
    name: 'Rose Velvet',
    primary: '#F06595',
    primaryGlow: 'rgba(240, 101, 149, 0.45)',
    secondary: '#FFA8A8',
    description: 'Ruby Glow'
  }
];

const DEFAULT_THEME: ThemeConfig = {
  name: 'Purple Galaxy',
  primaryColor: '#D0BCFF',
  primaryGlow: 'rgba(208, 188, 255, 0.45)',
  secondaryColor: '#FFB0CD',
  surfaceDepth: 'space',
  displayMode: 'dark',
  avatarPlacement: 'top',
  spatialBalance: 75,
  reactionIntensity: 'dynamic'
};

interface ThemeContextType {
  theme: ThemeConfig;
  activePresetId: string;
  setPreset: (preset: ThemePreset) => void;
  updatePrimaryColor: (hex: string) => void;
  updateSecondaryColor: (hex: string) => void;
  updateSurfaceDepth: (depth: 'space' | 'glass' | 'pitch') => void;
  updateDisplayMode: (mode: 'dark' | 'oled' | 'ambient' | 'light') => void;
  updateAvatarPlacement: (placement: 'top' | 'siderail') => void;
  updateSpatialBalance: (balance: number) => void;
  updateReactionIntensity: (intensity: 'subtle' | 'dynamic' | 'explosive') => void;
  saveTheme: () => void;
  resetTheme: () => void;
  showSaveToast: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('cinesync_theme');
      return saved ? JSON.parse(saved) : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  const [activePresetId, setActivePresetId] = useState<string>('galaxy');
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Apply dynamic CSS variables to root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-primary-glow', theme.primaryGlow);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
  }, [theme]);

  const setPreset = (preset: ThemePreset) => {
    setActivePresetId(preset.id);
    setTheme(prev => ({
      ...prev,
      name: preset.name,
      primaryColor: preset.primary,
      primaryGlow: preset.primaryGlow,
      secondaryColor: preset.secondary
    }));
  };

  const updatePrimaryColor = (hex: string) => {
    setActivePresetId('custom');
    setTheme(prev => ({
      ...prev,
      name: 'Custom Spectrum',
      primaryColor: hex,
      primaryGlow: `${hex}55`
    }));
  };

  const updateSecondaryColor = (hex: string) => {
    setTheme(prev => ({
      ...prev,
      secondaryColor: hex
    }));
  };

  const updateSurfaceDepth = (surfaceDepth: 'space' | 'glass' | 'pitch') => {
    setTheme(prev => ({ ...prev, surfaceDepth }));
  };

  const updateDisplayMode = (displayMode: 'dark' | 'oled' | 'ambient' | 'light') => {
    setTheme(prev => ({ ...prev, displayMode }));
  };

  const updateAvatarPlacement = (avatarPlacement: 'top' | 'siderail') => {
    setTheme(prev => ({ ...prev, avatarPlacement }));
  };

  const updateSpatialBalance = (spatialBalance: number) => {
    setTheme(prev => ({ ...prev, spatialBalance }));
  };

  const updateReactionIntensity = (reactionIntensity: 'subtle' | 'dynamic' | 'explosive') => {
    setTheme(prev => ({ ...prev, reactionIntensity }));
  };

  const saveTheme = () => {
    try {
      localStorage.setItem('cinesync_theme', JSON.stringify(theme));
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2600);
    } catch (err) {
      console.warn('Failed to save theme', err);
    }
  };

  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
    setActivePresetId('galaxy');
    try {
      localStorage.removeItem('cinesync_theme');
    } catch {}
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        activePresetId,
        setPreset,
        updatePrimaryColor,
        updateSecondaryColor,
        updateSurfaceDepth,
        updateDisplayMode,
        updateAvatarPlacement,
        updateSpatialBalance,
        updateReactionIntensity,
        saveTheme,
        resetTheme,
        showSaveToast
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

