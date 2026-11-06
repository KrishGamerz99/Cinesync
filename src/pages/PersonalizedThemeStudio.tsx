import React, { useState } from 'react';
import { useTheme, THEME_PRESETS } from '../context/ThemeContext';

export const PersonalizedThemeStudio: React.FC = () => {
  const {
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
  } = useTheme();

  const [primarySliderVal, setPrimarySliderVal] = useState<number>(260);
  const [secondarySliderVal, setSecondarySliderVal] = useState<number>(330);

  // Convert HSL hue to Hex
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  const handlePrimarySlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPrimarySliderVal(val);
    const hex = hslToHex(val, 85, 75);
    updatePrimaryColor(hex);
  };

  const handleSecondarySlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSecondarySliderVal(val);
    const hex = hslToHex(val, 90, 70);
    updateSecondaryColor(hex);
  };

  return (
    <main className="flex flex-col relative w-full pt-16 pb-32 pb-safe bg-surface min-h-screen">
      <div className="flex flex-col w-full px-gutter-mobile space-y-space-lg max-w-4xl mx-auto">
        {/* Header Contextual Block */}
        <div className="flex flex-col pt-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">auto_fix_high</span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface">
                Theme Studio
              </span>
            </div>
            <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm border border-white/5">
              v2.4 Live Sync
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-snug">
            Personalize your CineTogether theater experience. Changes save directly to your profile and do not disrupt friends.
          </p>
        </div>

        {/* Live Interactive Mini-Preview Device Stage */}
        <div className="relative w-full rounded-xl bg-surface-container-lowest p-space-sm overflow-hidden shadow-2xl border border-white/5">
          {/* Ambient Reactive Back-Glow Behind Device */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full blur-3xl transition-all duration-500 pointer-events-none"
            style={{ backgroundColor: theme.primaryGlow }}
          />

          <div className="flex items-center justify-between px-space-xs pb-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">smartphone</span>
              <span>Realtime Theater Preview</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                {theme.name}
              </span>
            </div>
          </div>

          {/* Scaled Down Cinema Player + Live Social Mockup */}
          <div className="relative w-full rounded-lg bg-surface-container-low p-space-sm transition-all duration-300 space-y-space-sm shadow-inner border border-white/5">
            {/* Video Mini Viewport */}
            <div className="relative w-full h-32 rounded-lg overflow-hidden bg-surface-container-highest shadow-md">
              <img
                alt="Mini Preview Still"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy_MMMokg9mZkWCJfwsQI6xMVSTlMlhDSRizGkzmUCCNUfrmHNdOlVCnfc9pI-_rFQIg5RlzmgOkvZorllUSKnwGiXpEEqueGBwi9VyBzjOaqBNliU2F_AGbSpH4S8VDLHlSAEF4Jm9foQcKF7sCJ0G30zQs79G_uHICAbcH6E-HeIdGmZHsLW6s595rons1VbducyzO1TpGckkWpKBNLZ0f1A5axWHT0Daveg2dJ2"
              />
              {/* Live Sync Pill & Host Badge on Video */}
              <div className="absolute top-2 left-2 flex items-center gap-space-xs">
                <span className="px-space-xs py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> 01:24:18
                </span>
                <span className="px-space-xs py-0.5 rounded-full bg-tertiary-container/30 text-tertiary-fixed font-label-sm text-label-sm backdrop-blur-md">
                  HOST
                </span>
              </div>
              {/* Scrubbing friend avatar heads */}
              <div className="absolute bottom-2 inset-x-2 flex items-center gap-space-xs">
                <div className="h-1 flex-1 bg-surface-variant/70 rounded-full relative">
                  <div
                    className="h-full w-2/3 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  {/* Friend seeker indicator */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-2/3 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary-container p-0.5 shadow-lg">
                    <img
                      alt="Seeker"
                      className="w-full h-full rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPVYxys4wPIwWbJExS6MJcvxt7u6tX5YgZZ3L-LzCn5wd4-Be43nSw9PIUNy4Ac5ibuu_PL4H5Ms86UlYoJrEhMrPuOu5HJ8lELxr9wL8HngH1H4F9pyqrQn2tQDrjr-rWHhznj8BKt6cPF_nLXcR7jbk1NpOAm16eTzy-pWMuWnBrAgY5Xpq6i7T-Y9RZYZNZ3RzEutV9CGJ0MfK8v5zMPY7-Jp3-UuNHCvzo4uLR"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Components Mosaic (Social Strip + Chat Bubble) */}
            <div className="grid grid-cols-5 gap-space-xs pt-space-xs items-center">
              {/* Speaking Participant Badge */}
              <div className="col-span-2 flex items-center gap-space-xs p-1 rounded-lg bg-surface-container shadow-sm border border-white/5">
                <div
                  className="relative w-7 h-7 rounded-full bg-surface-variant p-0.5 transition-all duration-300"
                  style={{ boxShadow: `0 0 8px ${theme.secondaryColor}` }}
                >
                  <img
                    alt="Maya"
                    className="w-full h-full rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxI4U1GtaMIpUzeLEmXW1ToHTo4SqnwTlNhCMDut8BDQ91ZqUdp7kL8Sk6smdkdPQTY6v6kcNRQP7wLbjqLF18e-b6sD26YhjmYkHCYbHSTA1oA9NdLFmjFTiXZSk40GW591Q9KcFTOSlK-ih56LaTo6V7f5gGgjK9J_KZncXX2HopoYQxl7PX1HkX2s3xbv6_bowwObILO4UsAbZo_4FRX3jgAytbr-mrWOz4foH0"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-secondary rounded-full flex items-center justify-center text-[7px] text-on-secondary font-bold">
                    🎙
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-label-sm text-label-sm text-on-surface truncate">Maya</p>
                  <p className="font-label-sm text-[9px] text-secondary truncate leading-none">Speaking</p>
                </div>
              </div>

              {/* Dynamic Mini Chat Bubble */}
              <div className="col-span-3 rounded-lg bg-surface-container px-space-xs py-1 flex items-center justify-between shadow-sm min-w-0 border border-white/5">
                <div className="min-w-0 pr-1">
                  <p className="font-label-sm text-[9px] text-on-surface-variant truncate">
                    Maya: <span className="text-on-surface">Wait for the twist! 🍿</span>
                  </p>
                </div>
                <span
                  className="px-1.5 py-0.5 rounded-full font-label-sm text-[10px] shrink-0 font-bold transition-colors"
                  style={{ backgroundColor: `${theme.primaryColor}33`, color: theme.primaryColor }}
                >
                  🔥 4
                </span>
              </div>
            </div>

            {/* Mini glowing button preview */}
            <div className="pt-1 flex items-center justify-between gap-space-xs">
              <button
                type="button"
                className="flex-1 py-1.5 px-space-sm rounded-lg text-on-primary font-label-sm text-label-sm font-bold shadow-md transition-all duration-300 text-center flex items-center justify-center gap-1"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span className="material-symbols-outlined text-[14px]">sync</span>
                Sync Friends
              </button>
              <button
                type="button"
                className="py-1.5 px-space-sm rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold transition-all duration-300 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">celebration</span>
                Cheers
              </button>
            </div>
          </div>
        </div>

        {/* Preset Themes Palette Cards */}
        <div className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">palette</span>
              Curated Palettes
            </h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Tap to test</span>
          </div>

          {/* Horizontal Scrollable Cards */}
          <div className="flex gap-space-sm overflow-x-auto pb-space-xs no-scrollbar snap-x">
            {THEME_PRESETS.map(preset => {
              const isActive = activePresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => setPreset(preset)}
                  className={`relative shrink-0 w-36 rounded-xl p-space-sm snap-start cursor-pointer transition-all duration-200 shadow-lg border border-white/5 ${
                    isActive
                      ? 'bg-surface-container-high ring-2 ring-primary'
                      : 'bg-surface-container hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                      {preset.name}
                    </span>
                    <span
                      className={`material-symbols-outlined text-primary text-[18px] transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      check_circle
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-space-xs">
                    <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: preset.primary }} />
                    <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: preset.secondary }} />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    {preset.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Color Engine Section */}
        <div className="space-y-space-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
              Custom Color Engine
            </h2>
            <span className="font-label-sm text-label-sm text-primary font-semibold">Pro Calibration</span>
          </div>

          {/* Mode Selector Pills */}
          <div className="rounded-xl bg-surface-container p-1 grid grid-cols-4 gap-1 shadow-sm border border-white/5">
            {(['dark', 'oled', 'ambient', 'light'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                onClick={() => updateDisplayMode(mode)}
                className={`py-2 px-1 rounded-lg text-center font-label-sm text-label-sm transition-all ${
                  theme.displayMode === mode
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {mode === 'dark' && 'Dark'}
                {mode === 'oled' && 'OLED Pure'}
                {mode === 'ambient' && 'Ambient'}
                {mode === 'light' && 'Studio Day'}
              </button>
            ))}
          </div>

          {/* Fine Tuning Color Cards */}
          <div className="rounded-xl bg-surface-container p-space-md space-y-space-md shadow-md border border-white/5">
            {/* Primary Accent Color Tuning */}
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md text-on-surface font-medium flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  Primary Accent Color
                </label>
                <div className="flex items-center gap-1 bg-surface-container-highest px-space-xs py-1 rounded-lg">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">HEX</span>
                  <input
                    type="text"
                    value={theme.primaryColor}
                    onChange={e => updatePrimaryColor(e.target.value)}
                    className="bg-transparent w-16 text-right font-label-sm text-label-sm text-primary font-bold focus:outline-none uppercase"
                  />
                </div>
              </div>

              {/* Interactive Hue Slider Track */}
              <div className="relative py-2 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={primarySliderVal}
                  onChange={handlePrimarySlider}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 via-cyan-400 via-blue-500 via-fuchsia-500 to-red-500 focus:outline-none"
                />
              </div>
              <p className="font-label-sm text-[11px] text-on-surface-variant">
                Drives playback markers, active navigation icons, and stream host halos.
              </p>
            </div>

            {/* Secondary Glow Accent Tuning */}
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md text-on-surface font-medium flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: theme.secondaryColor }}
                  />
                  Secondary Social Glow
                </label>
                <div className="flex items-center gap-1 bg-surface-container-highest px-space-xs py-1 rounded-lg">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">HEX</span>
                  <input
                    type="text"
                    value={theme.secondaryColor}
                    onChange={e => updateSecondaryColor(e.target.value)}
                    className="bg-transparent w-16 text-right font-label-sm text-label-sm text-secondary font-bold focus:outline-none uppercase"
                  />
                </div>
              </div>
              <div className="relative py-2 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={secondarySliderVal}
                  onChange={handleSecondarySlider}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-emerald-400 via-amber-400 to-pink-500 focus:outline-none"
                />
              </div>
              <p className="font-label-sm text-[11px] text-on-surface-variant">
                Applied to live speaking micro-wave meters, reaction bursts, and cheer badges.
              </p>
            </div>

            {/* Surface Depth Selector Segmented Control */}
            <div className="space-y-space-xs pt-space-xs">
              <label className="font-label-md text-label-md text-on-surface font-medium">Theater Surface Depth</label>
              <div className="grid grid-cols-3 gap-space-xs pt-1">
                {(['space', 'glass', 'pitch'] as const).map(depth => {
                  const isSelected = theme.surfaceDepth === depth;
                  return (
                    <button
                      key={depth}
                      type="button"
                      onClick={() => updateSurfaceDepth(depth)}
                      className={`flex flex-col items-center justify-center p-space-xs rounded-xl transition-all ${
                        isSelected
                          ? 'bg-surface-container-high text-primary ring-1 ring-primary'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <span className="font-label-sm text-label-sm font-bold">
                        {depth === 'space' && 'Deep Space'}
                        {depth === 'glass' && 'Soft Glass'}
                        {depth === 'pitch' && 'Pitch Black'}
                      </span>
                      <span className="font-label-sm text-[9px] text-on-surface-variant mt-0.5">
                        {depth === 'space' && 'Subtle Blur'}
                        {depth === 'glass' && 'Frosted Glow'}
                        {depth === 'pitch' && 'Maximum Film'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Audio & Social Experience Preferences */}
        <div className="space-y-space-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">equalizer</span>
            Audio &amp; Social Preferences
          </h2>
          <div className="rounded-xl bg-surface-container p-space-md space-y-space-md shadow-md border border-white/5">
            {/* Video Grid Placement Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-space-sm min-w-0">
                <p className="font-label-md text-label-md text-on-surface font-semibold truncate">Friend Avatar Grid</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Show friends on top overlay or side docked strip</p>
              </div>
              <div className="flex rounded-lg bg-surface-container-highest p-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => updateAvatarPlacement('top')}
                  className={`px-2.5 py-1 rounded-md font-label-sm text-label-sm transition-all ${
                    theme.avatarPlacement === 'top'
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Top
                </button>
                <button
                  type="button"
                  onClick={() => updateAvatarPlacement('siderail')}
                  className={`px-2.5 py-1 rounded-md font-label-sm text-label-sm transition-all ${
                    theme.avatarPlacement === 'siderail'
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Side Rail
                </button>
              </div>
            </div>

            {/* Spatial Voice Chat Volume Slider */}
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary">spatial_audio</span>
                  <span className="font-label-md text-label-md text-on-surface font-medium">Spatial Voice Balance</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold">{theme.spatialBalance}% Ambient</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={theme.spatialBalance}
                onChange={e => updateSpatialBalance(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-container-highest accent-primary"
              />
              <div className="flex justify-between font-label-sm text-[10px] text-on-surface-variant">
                <span>Cinema Only</span>
                <span>Balanced</span>
                <span>Voices Boosted</span>
              </div>
            </div>

            {/* Reaction Animation Intensity */}
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-secondary">flare</span>
                  <span className="font-label-md text-label-md text-on-surface font-medium">Live Reaction Intensity</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  {theme.reactionIntensity === 'subtle' && 'Subtle'}
                  {theme.reactionIntensity === 'dynamic' && 'Dynamic Bursts'}
                  {theme.reactionIntensity === 'explosive' && 'Explosive 🚀'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-space-xs">
                {(['subtle', 'dynamic', 'explosive'] as const).map(intensity => (
                  <button
                    key={intensity}
                    type="button"
                    onClick={() => updateReactionIntensity(intensity)}
                    className={`py-1.5 rounded-lg font-label-sm text-label-sm font-medium transition-all ${
                      theme.reactionIntensity === intensity
                        ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                        : 'bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {intensity === 'subtle' && 'Subtle'}
                    {intensity === 'dynamic' && 'Dynamic'}
                    {intensity === 'explosive' && 'Explosive 🚀'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Identity Card Sample Preview */}
        <div className="rounded-xl bg-surface-container p-space-md flex items-center justify-between shadow-md border border-white/5">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-lg">
              <img
                alt="Profile Still"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFIEBCererOMkDd3WOn8vbeb7T4mvonXfTrWy0lvEsQMQdNVA6ErYjBLzkigse9PwTwkFNRmKCYKR6iU1PYQ5mnDBZdW1OTlD8pp6tlstcadfez2reu8GM8hCH1ulBX8-L5a07iHqHvT9HJWnDL473t2nZFL88NHk-SadDVPoz8uJIrvn_nFV782H2_pQIGOUmUC7S6coe2_cCrLsJ_OyyKJXuWdNTxrjSYt46RM0L"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-surface" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-label-lg text-label-lg text-on-surface font-bold truncate">Nova Cinema</p>
                <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Theme synced across 12 watch rooms
              </p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 p-2 rounded-xl bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">badge</span>
          </button>
        </div>

        {/* Sticky Bottom CTA Action Bar */}
        <div className="sticky bottom-20 z-40 w-full pt-space-xs">
          <div className="relative w-full rounded-2xl bg-surface-container-high/90 backdrop-blur-xl p-space-xs shadow-2xl flex items-center gap-space-sm border border-white/5">
            {/* Primary Save Button */}
            <button
              type="button"
              onClick={saveTheme}
              className="flex-1 py-3 px-space-md rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-bold shadow-[0_0_20px_rgba(208,188,255,0.35)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[22px]">palette</span>
              <span>Save &amp; Apply Theme</span>
            </button>

            {/* Instant Revert/Reset Button */}
            <button
              type="button"
              onClick={resetTheme}
              className="p-3 rounded-xl bg-surface-container-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
              title="Reset to Defaults"
            >
              <span className="material-symbols-outlined text-[22px]">restart_alt</span>
            </button>
          </div>

          {/* Success Feedback Floating Toast Overlay */}
          <div
            className={`pointer-events-none absolute -top-12 inset-x-4 flex items-center justify-center transition-all duration-300 ${
              showSaveToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className="px-space-md py-1.5 rounded-full bg-secondary-container text-on-secondary-container shadow-2xl flex items-center gap-space-xs font-label-md text-label-md font-bold">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Theme saved to Nova Cinema profile! 🎉</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

