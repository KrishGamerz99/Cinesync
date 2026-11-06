import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePresence } from '../context/PresenceContext';
import { useWatchlist } from '../context/WatchlistContext';
import { MOCK_FRIENDS } from '../data/mockData';
import { JoinCodeModal } from '../components/common/JoinCodeModal';

export const HomeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { presence, cyclePresence } = usePresence();
  const { isWatchlisted, toggleWatchlist } = useWatchlist();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Status configuration based on presence state
  const presenceConfig = {
    Ready: { ping: 'bg-secondary', dot: 'bg-secondary', text: 'Ready' },
    Watching: { ping: 'bg-primary', dot: 'bg-primary', text: 'Watching' },
    Away: { ping: 'bg-tertiary', dot: 'bg-tertiary', text: 'Away' }
  }[presence];

  return (
    <main className="flex flex-col relative w-full pt-16 pb-28 pb-safe bg-surface min-h-screen">
      <div className="flex flex-col w-full pb-8 space-y-space-lg max-w-7xl mx-auto">
        {/* Top Greeting & Status Switch */}
        <div className="px-margin-mobile pt-space-sm flex items-center justify-between gap-space-sm">
          <div className="min-w-0">
            <div className="flex items-center gap-space-xs">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-bold truncate">
                Hey Alex <span className="inline-block animate-bounce origin-bottom">👋</span>
              </h1>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Ready for cinema night with the crew?
            </p>
          </div>

          {/* Status Switch Pill */}
          <button
            type="button"
            aria-label="Toggle presence state"
            onClick={cyclePresence}
            className="flex-shrink-0 flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-high/90 shadow-md backdrop-blur-md active:scale-95 transition-transform"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${presenceConfig.ping}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${presenceConfig.dot} shadow-[0_0_8px_rgba(255,176,205,0.8)]`} />
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wide">
              {presenceConfig.text}
            </span>
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">expand_more</span>
          </button>
        </div>

        {/* Hero Quick Actions: Glowing Bento Glass Banner */}
        <div className="px-margin-mobile">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest p-space-md shadow-xl border border-white/5">
            {/* Ambient cinema neon glow effect */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-secondary-container/25 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-space-md">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                    <span className="material-symbols-outlined text-[14px] icon-filled">bolt</span>
                    Instant Sync 4K
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Start a Watch Party</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Stream in millimeter lockstep with spatial audio chat
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest/80 flex items-center justify-center text-primary shadow-inner">
                  <span className="material-symbols-outlined text-[24px]">theater_comedy</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                {/* Primary Glow Action */}
                <button
                  type="button"
                  onClick={() => navigate('/room')}
                  className="relative group overflow-hidden w-full flex items-center justify-center gap-2 py-3 px-space-md rounded-lg bg-gradient-to-r from-primary-container via-inverse-primary to-secondary-container text-on-primary font-label-lg text-label-lg font-bold shadow-[0_0_20px_rgba(160,120,255,0.45)] hover:shadow-[0_0_28px_rgba(236,72,153,0.6)] active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px] icon-filled">play_circle</span>
                  <span>Start Instant Party</span>
                  <span className="material-symbols-outlined text-[16px] text-on-primary/70 transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>

                {/* Secondary Glass Action: Enter Party Code */}
                <button
                  type="button"
                  onClick={() => setIsJoinModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-space-md rounded-lg bg-surface-variant/40 hover:bg-surface-variant/70 text-on-surface font-label-lg text-label-lg backdrop-blur-md active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">pin</span>
                  <span>Enter Party Code</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Friends Online Row */}
        <div className="flex flex-col gap-space-sm">
          <div className="px-margin-mobile flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_rgba(255,176,205,0.8)]" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Crew Online</h3>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                5
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/parties')}
              className="font-label-md text-label-md text-primary hover:underline flex items-center gap-0.5"
            >
              View all <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          {/* Horizontal scroll friend strip */}
          <div className="flex gap-space-sm overflow-x-auto px-margin-mobile py-1 no-scrollbar scroll-smooth">
            {/* Friend 1: Elena */}
            <div className="flex-shrink-0 w-44 p-2.5 rounded-xl bg-surface-container/70 backdrop-blur-md flex flex-col gap-2 relative shadow-md border border-white/5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    alt="Elena V."
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={MOCK_FRIENDS[0].avatarUrl}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary ring-2 ring-surface shadow-[0_0_6px_rgba(255,176,205,0.9)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">Elena V.</p>
                  <span className="inline-flex items-center gap-0.5 font-label-sm text-label-sm text-secondary truncate">
                    <span className="material-symbols-outlined text-[11px] animate-pulse">sensors</span> Live
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 p-1.5 rounded-lg flex flex-col gap-0.5">
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Cyberpunk: EDG</p>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span className="text-tertiary flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[10px]">timer</span> 01:14:20
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('/room')}
                    aria-label="Peek party"
                    className="text-primary hover:text-primary-fixed"
                  >
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Friend 2: Marcus */}
            <div className="flex-shrink-0 w-36 p-2.5 rounded-xl bg-surface-container/70 backdrop-blur-md flex flex-col gap-2 relative shadow-md border border-white/5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    alt="Marcus T."
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={MOCK_FRIENDS[1].avatarUrl}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary ring-2 ring-surface shadow-[0_0_6px_rgba(255,176,205,0.9)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">Marcus T.</p>
                  <span className="font-label-sm text-label-sm text-tertiary">In Lobby</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 p-1.5 rounded-lg flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Pre-show lounge</span>
                <button
                  type="button"
                  onClick={() => navigate('/room')}
                  className="font-label-sm text-label-sm text-primary px-1.5 py-0.5 rounded bg-primary-container/20 hover:bg-primary-container/40 transition-colors"
                >
                  Join
                </button>
              </div>
            </div>

            {/* Friend 3: Sarah K */}
            <div className="flex-shrink-0 w-36 p-2.5 rounded-xl bg-surface-container/70 backdrop-blur-md flex flex-col gap-2 relative shadow-md border border-white/5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    alt="Sarah K."
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={MOCK_FRIENDS[2].avatarUrl}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-surface-bright ring-2 ring-surface" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">Sarah K.</p>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Browsing</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 p-1.5 rounded-lg flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Sci-Fi catalog</span>
                <span className="material-symbols-outlined text-[14px] text-outline">search</span>
              </div>
            </div>

            {/* Friend 4: Jin Woo */}
            <div className="flex-shrink-0 w-40 p-2.5 rounded-xl bg-surface-container/70 backdrop-blur-md flex flex-col gap-2 relative shadow-md border border-white/5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    alt="Jin Woo"
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                    src={MOCK_FRIENDS[3].avatarUrl}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary ring-2 ring-surface shadow-[0_0_6px_rgba(255,176,205,0.9)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">Jin Woo</p>
                  <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[10px]">graphic_eq</span> Mic on
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 p-1.5 rounded-lg flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Anime Club Room</span>
                <button
                  type="button"
                  onClick={() => navigate('/room')}
                  className="font-label-sm text-label-sm text-primary px-1.5 py-0.5 rounded bg-primary-container/20 hover:bg-primary-container/40 transition-colors"
                >
                  Listen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Watching Together section */}
        <div className="px-margin-mobile">
          <div className="flex items-center justify-between mb-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-tertiary">history_toggle_off</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Resume Shared Session</h3>
            </div>
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">
              Synced state
            </span>
          </div>

          {/* Compact Resume Banner Card */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-high/90 shadow-lg border border-white/5">
            <div className="flex flex-col sm:flex-row">
              {/* Thumbnail */}
              <div className="relative w-full sm:w-44 h-32 flex-shrink-0 overflow-hidden">
                <img
                  alt="Dune Part Two Still"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBJ6G8-JYf82zjnauINMGlwywnk9XWGLy6sIaQxk-TnIssX5AdUvhqH4hodmNRBoLYBXveJMIcXpQCqAsEROl560JQYQQ1R7KlYe1mplFGgVKwfPwMRM6PYWD79vXcfm_mL3S98ZEqH8qlHjABZDfybX2PsQu_k9YFMwcCvrZ92_fygvpNuz4Kd-fvghBwZuRscmdZ186LJi-a2vrzUcsJfLBcXILa2vDi0n9lkuQL"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-surface-container-high" />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-sm text-tertiary font-label-sm text-label-sm flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[12px]">lock</span> PAUSED
                </div>
                <div className="absolute bottom-2 left-2 flex -space-x-2">
                  <img
                    alt="Sarah"
                    className="w-6 h-6 rounded-full border-2 border-surface object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0JX8Dya3n1gaSxOJXmY1yR5zM_9stUeopb1tOgT9kuILv5RUPoOnE0ne4pLIm7uSakt_FRahdJSQ0vdYKW2c8p7AGgmxdWHYcSpSPlkA9xocHyXYX4Ie7WqAldGGSQcxBL6FaiDbxSLNVf8bzg4OW33jc_hdWu-Fz8OF0p59lItaResDOa7cT-C5nBbpBLwG1j_p0N54U07y6apa4yy2valIMTxQ-PDvA6bL6A31"
                  />
                  <img
                    alt="Marcus"
                    className="w-6 h-6 rounded-full border-2 border-surface object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_7BGCmKTpZ6GhXzq3S6ZEdeyh-glBkQ6yrUJ-JDl0khr6KHWkBDaCkJIEtNL5hLvSlWPA_1rAfD2oWvnhFny3T_MLyX4G3a6CmB7saTa_6qz40GKr_xHuCnGKaL4BUYLx_mycGMkYQ791xMXgLpFz6u6LEW8sbGyz14-7iCPfrlxTGh7xb8S0SjY9fZK2KyM98HyfxqrxK-tUFdBcLuxDo7dFz2u5C2YSyDiwbUd0"
                  />
                  <img
                    alt="Elena"
                    className="w-6 h-6 rounded-full border-2 border-surface object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQHNmwLR44-bngupLYZDORVNj1JDlMeMTP1AAzxgHcIBTHA6H2nrryvbo7PEwOmO3V8xes2puIuejI4AiIAhm1OMouM2JKi1SFlPZ-uTwu0ozprNFIoSoZ_LKyanKKfB7bArCjYc45MeWDWF4egGXN1kaVMaB5tZNV06z7AIlU707Fg8mb4Idr-WZR0gDjJ14UMaKmzA2AfyvZzIf3Yb5ScXx1xITBP-VMGSzHOVC4"
                  />
                </div>
              </div>

              {/* Info & Controls */}
              <div className="p-space-sm flex-1 flex flex-col justify-between gap-space-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Dune: Part Two</h4>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">01:48:32 / 02:46:00</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Paused by <span className="text-on-surface font-semibold">Marcus</span> • 3 crew members waiting
                  </p>
                </div>

                {/* Progress scrubber track */}
                <div className="w-full space-y-1">
                  <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-container to-secondary rounded-full" style={{ width: '64%' }} />
                  </div>
                  <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                    <span>64% completed</span>
                    <span className="text-secondary font-semibold">Spatial Audio Ready</span>
                  </div>
                </div>

                {/* Resume Actions */}
                <div className="flex items-center gap-space-sm pt-1">
                  <button
                    type="button"
                    onClick={() => navigate('/room')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] icon-filled">play_arrow</span>
                    Resume with Party
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/movie/dune-part-two')}
                    aria-label="Party settings"
                    className="p-1.5 rounded-lg bg-surface-container-highest/60 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Watch Parties (Live Now Carousel) */}
        <div className="flex flex-col gap-space-sm">
          <div className="px-margin-mobile flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Parties Live Now</h3>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Swipe to explore</span>
          </div>

          {/* Carousel Cards */}
          <div className="flex gap-space-md overflow-x-auto px-margin-mobile pb-2 no-scrollbar snap-x snap-mandatory">
            {/* Party Card 1: Spider-Man */}
            <div className="snap-start flex-shrink-0 w-80 rounded-xl bg-surface-container-high/90 overflow-hidden shadow-xl flex flex-col relative group border border-white/5">
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  alt="Spider-Man Still"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXzXdlvd_Y8eZKQPs3RBfMy3AKurbKSCDtcDBYw6eM8idWW0wGIkwbCxZbejy3Jy_Sl-TI86ToeMcuNYRtCqaih4g4R_yW2oetzR-ZkGd61llfYD1PgrDTZ3HlBjBzvqPykEz5If_WBxjPaaPwWLaSiczfqkBmJab6azuvI29wVaEANbWjeLSMQaLCW-v39tYPdRruI1FQzZsAlBuS1QcaRwGb9pMXyighnMY-ss_H"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-surface-container-high/40 to-transparent" />
                
                {/* Top status pills */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/90 text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> LIVE SYNC
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[13px]">mic</span> Voice Active
                  </span>
                </div>

                {/* Host info badge */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-surface-container-lowest/85 backdrop-blur-md px-2 py-0.5 rounded-full">
                  <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold">HOST: Maya</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-space-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                      Spider-Man: Across the Spider-Verse
                    </h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Animation • Sci-Fi • Action</span>
                  </div>
                  <div className="flex items-center text-tertiary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px] mr-0.5 icon-filled">group</span> 6
                  </div>
                </div>

                <div className="flex items-center gap-space-sm pt-1">
                  <button
                    type="button"
                    onClick={() => navigate('/room')}
                    className="flex-1 py-2 px-3 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] icon-filled">door_open</span>
                    Join Watch Room
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/movie/spider-man-spider-verse')}
                    className="p-2 rounded-lg bg-surface-container-highest/60 hover:bg-surface-container-highest text-on-surface"
                    title="Movie details"
                  >
                    <span className="material-symbols-outlined text-[18px]">info</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Party Card 2: Interstellar */}
            <div className="snap-start flex-shrink-0 w-80 rounded-xl bg-surface-container-high/90 overflow-hidden shadow-xl flex flex-col relative group border border-white/5">
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  alt="Interstellar Still"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXjuTJI25S8XNE78dWg44XxjAOfQks7xtyv-6IZa0OZb-2wIju7HRCeEhsM0AnfXGwmpz7blPltfLzZ7e0-ZYnCGRGsr8wlBAONqeUrdaw5GSlsu0H0MUSKtPSIZVUh4IagbDkqgF9nnMvYAeOSofou3_dw32OFCrQcOqCApRNpC4SazEAOnkG0vKYwq9_vhdljQ_7mKnddBsqNuJzamw8M-eErxwr1Y4Q4V9qI3-U"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-surface-container-high/40 to-transparent" />
                
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/90 text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> SYNC LOCKED
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[13px]">hd</span> 4K Atmos
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-surface-container-lowest/85 backdrop-blur-md px-2 py-0.5 rounded-full">
                  <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold">HOST: Sarah C.</span>
                </div>
              </div>

              <div className="p-space-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                      Interstellar (2014)
                    </h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Sci-Fi • Adventure</span>
                  </div>
                  <div className="flex items-center text-tertiary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[14px] mr-0.5 icon-filled">group</span> 4
                  </div>
                </div>

                <div className="flex items-center gap-space-sm pt-1">
                  <button
                    type="button"
                    onClick={() => navigate('/room')}
                    className="flex-1 py-2 px-3 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] icon-filled">door_open</span>
                    Join Watch Room
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/movie/interstellar')}
                    className="p-2 rounded-lg bg-surface-container-highest/60 hover:bg-surface-container-highest text-on-surface"
                    title="Movie details"
                  >
                    <span className="material-symbols-outlined text-[18px]">info</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trending For Parties (Catalog Recommendations Grid) */}
        <div className="px-margin-mobile flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Trending For Parties</h3>
            <button
              type="button"
              onClick={() => navigate('/catalog')}
              className="font-label-md text-label-md text-primary hover:underline flex items-center gap-0.5"
            >
              Explore all <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            {/* Card 1: Blade Runner 2049 */}
            <div
              onClick={() => navigate('/movie/blade-runner-2049')}
              className="rounded-xl bg-surface-container overflow-hidden shadow-md cursor-pointer group border border-white/5 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  alt="Blade Runner 2049 Poster"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD63AaJ1tcrwkTqN9_4HYix3MhPRSqurheBTN8Y_G5xgmdzVfxmDb6PWbYbqNw4uZ30FCUWhDu3S2-aNw4gJEPg2RgJj0H6TUpnzsY0kTXlA1I-Z_bsp6__aEZ0I6ilCj6L8BjgXj9oliIguvGciSD0vX2xifkL9VQTvEpXbBkOpOcdmYGFMkecinfetRfg_AxZqmL5uay7A5Dd_K_04-kEYPZANcsK52tlF7LsVRSy"
                />
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist('blade-runner-2049');
                    }}
                    className={`w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center transition-colors ${
                      isWatchlisted('blade-runner-2049') ? 'text-secondary' : 'text-on-surface'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isWatchlisted('blade-runner-2049') ? 'icon-filled' : ''}`}>
                      {isWatchlisted('blade-runner-2049') ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-2.5 flex flex-col gap-1">
                <h5 className="font-label-lg text-label-lg text-on-surface font-bold truncate">Blade Runner 2049</h5>
                <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="flex items-center text-tertiary">
                    <span className="material-symbols-outlined text-[12px] mr-0.5 icon-filled">star</span> 8.0
                  </span>
                  <span>•</span>
                  <span className="truncate">Sci-Fi • Mystery</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-surface-variant/40 text-on-surface-variant font-label-sm text-label-sm">
                    4K HDR
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-variant/40 text-on-surface-variant font-label-sm text-label-sm">
                    Dolby
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Past Lives */}
            <div
              onClick={() => navigate('/movie/past-lives')}
              className="rounded-xl bg-surface-container overflow-hidden shadow-md cursor-pointer group border border-white/5 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  alt="Past Lives Poster"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy_MMMokg9mZkWCJfwsQI6xMVSTlMlhDSRizGkzmUCCNUfrmHNdOlVCnfc9pI-_rFQIg5RlzmgOkvZorllUSKnwGiXpEEqueGBwi9VyBzjOaqBNliU2F_AGbSpH4S8VDLHlSAEF4Jm9foQcKF7sCJ0G30zQs79G_uHICAbcH6E-HeIdGmZHsLW6s595rons1VbducyzO1TpGckkWpKBNLZ0f1A5axWHT0Daveg2dJ2"
                />
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist('past-lives');
                    }}
                    className={`w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center transition-colors ${
                      isWatchlisted('past-lives') ? 'text-secondary' : 'text-on-surface'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isWatchlisted('past-lives') ? 'icon-filled' : ''}`}>
                      {isWatchlisted('past-lives') ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-2.5 flex flex-col gap-1">
                <h5 className="font-label-lg text-label-lg text-on-surface font-bold truncate">Past Lives</h5>
                <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="flex items-center text-tertiary">
                    <span className="material-symbols-outlined text-[12px] mr-0.5 icon-filled">star</span> 98% RT
                  </span>
                  <span>•</span>
                  <span className="truncate">Drama • Romance</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-surface-variant/40 text-on-surface-variant font-label-sm text-label-sm">
                    Crowd Fav
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-variant/40 text-on-surface-variant font-label-sm text-label-sm">
                    Crying Alert 😭
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Code Modal */}
      <JoinCodeModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </main>
  );
};

