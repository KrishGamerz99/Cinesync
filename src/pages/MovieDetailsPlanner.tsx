import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { ALL_MOVIES, BLADE_RUNNER_MOVIE } from '../data/mockData';

export const MovieDetailsPlanner: React.FC = () => {
  const { movieId } = useParams<{ movieId?: string }>();
  const navigate = useNavigate();
  const { isWatchlisted, toggleWatchlist, invitedStatus, inviteAll } = useWatchlist();

  // Find movie or fallback to Blade Runner 2049
  const movie = ALL_MOVIES.find(m => m.id === movieId) || BLADE_RUNNER_MOVIE;

  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const [privacy, setPrivacy] = useState<'friends' | 'link' | 'public'>('friends');
  const [syncLocked, setSyncLocked] = useState(true);
  const [voiceDucking, setVoiceDucking] = useState(true);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  const watchlisted = isWatchlisted(movie.id);
  const isInvited = invitedStatus[movie.id] || false;

  return (
    <main className="flex flex-col relative w-full pt-16 pb-28 pb-safe bg-surface min-h-screen">
      <div className="flex flex-col w-full text-on-surface max-w-4xl mx-auto">
        {/* Cinematic Hero Backdrop Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url('${movie.backdropUrl}')` }}
          />
          {/* Seamless Gradient Scrim to Dark Canvas */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-surface/40" />

          {/* Floating Quick Trailer Trigger overlay on Hero */}
          <button
            type="button"
            onClick={() => setIsPlayingTrailer(prev => !prev)}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary shadow-[0_0_24px_rgba(208,188,255,0.45)] hover:scale-110 active:scale-95 transition-all"
            title="Play Trailer Preview"
          >
            <span className="material-symbols-outlined text-[32px] ml-0.5 icon-filled">
              {isPlayingTrailer ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Top floating live counter badge */}
          <div className="absolute top-space-sm right-gutter-mobile flex items-center gap-space-xs px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-md border border-white/5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(255,176,205,0.8)]" />
            <span className="font-label-sm text-label-sm text-secondary-fixed">1.4K WATCHING NOW</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col px-gutter-mobile -mt-10 relative z-10 space-y-space-lg pb-space-xl">
          {/* Movie Metadata Bento Card */}
          <div className="bg-surface-container-low/90 backdrop-blur-xl rounded-xl p-space-md shadow-xl flex flex-col space-y-space-md border border-white/5">
            {/* Badges & Ratings Row */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-1.5 flex-wrap">
                {movie.qualityTags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-primary-container/30 text-primary font-label-sm text-label-sm tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Rating Chips */}
              <div className="flex items-center gap-space-sm">
                <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full border border-white/5">
                  <span className="material-symbols-outlined text-tertiary text-[14px] icon-filled">star</span>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold">{movie.ratingImdb}</span>
                </div>
                <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full border border-white/5">
                  <span className="material-symbols-outlined text-error text-[14px] icon-filled">favorite</span>
                  <span className="font-label-sm text-label-sm text-error font-bold">{movie.ratingRottenTomatoes}</span>
                </div>
              </div>
            </div>

            {/* Main Title Block */}
            <div className="space-y-space-xs">
              <h2 className="font-headline-xl-mobile text-headline-xl-mobile font-bold tracking-tight text-on-surface drop-shadow-sm">
                {movie.title}
              </h2>
              <div className="flex items-center gap-1.5 flex-wrap">
                {movie.genres.map((genre, i) => (
                  <span
                    key={genre}
                    className={`font-label-sm text-label-sm px-2.5 py-0.5 rounded-full ${
                      i === 0
                        ? 'bg-surface-container-highest text-primary'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                  >
                    {genre}
                  </span>
                ))}
                <span className="font-label-sm text-label-sm px-2 py-0.5 text-outline">{movie.ageRating}</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col space-y-space-xs pt-space-xs">
              {/* Prominent Host Party CTA */}
              <button
                type="button"
                onClick={() => navigate('/room')}
                className="w-full relative overflow-hidden group py-3 px-space-md rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(160,120,255,0.4)] active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[20px] icon-filled">groups</span>
                <span>Host Watch Party Now</span>
                <span className="material-symbols-outlined text-[18px] opacity-80 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              {/* Secondary CTA Grid */}
              <div className="grid grid-cols-2 gap-space-xs">
                <button
                  type="button"
                  onClick={() => alert(`Party for "${movie.title}" scheduled for this Friday at 8:00 PM!`)}
                  className="py-2.5 px-space-sm rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">calendar_clock</span>
                  <span>Schedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWatchlist(movie.id)}
                  className={`py-2.5 px-space-sm rounded-lg hover:bg-surface-bright font-label-md text-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-all ${
                    watchlisted
                      ? 'bg-primary-container/20 text-primary'
                      : 'bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] text-primary ${watchlisted ? 'icon-filled' : ''}`}>
                    {watchlisted ? 'bookmark_added' : 'bookmark_add'}
                  </span>
                  <span>{watchlisted ? 'In Watchlist' : 'Watchlist'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Friends Who Want To Watch (Social Sync Hook) */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col space-y-space-sm shadow-md border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">favorite</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">Mutual Watchlist</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary-fixed bg-secondary-container/40 px-2 py-0.5 rounded-full">
                4 Friends
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              These friends have this title saved. Start a sync room and enjoy the premiere together!
            </p>
            <div className="flex items-center justify-between pt-space-xs">
              {/* Avatar Stack */}
              <div className="flex items-center -space-x-2.5">
                <div className="relative group">
                  <img
                    alt="Friend 1"
                    className="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-surface"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwFQ8X6QD7H6dzR1eAQMe12NAggosieYVFDacPYGIsZ4waKrsbUA3mTObDQ0mIULdEJuFkf9NolL3sIukqHbhmVP6q8IG0A7-mt6bX5rA70phPEwoYE21B1NOpP_IrmGcQTL-uuckXvpz2pyTnTq108qqDATNyf28SJW3WGD70okYpYdetEQH70VS9Ke17OqpM4cBF50h5GdGrG6VetW58h6-22YTOxSIdPpBm_yjd"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(255,176,205,0.8)]" />
                </div>
                <div className="relative group">
                  <img
                    alt="Friend 2"
                    className="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-surface"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9k10XYPISAID2APIlYS3iSAMJFnoErONsjHiCuFq1lZ-SJX-HUQynbR8ryNT-eIdnTMmnEexF2krwMabLoB2HxqRJNeY1-1jUvLRbqXd4sozsD-qAp2iwabpFDJQbFhZZ2OIofv4vxr8AdJhz1AbfrMOjJPO8u5TmBZVQZ5SQDWWukGLNYoyHdtoTuexljhDe2h09YTXhKSJG7j_VlnE6mKZRUkIrChvaaamgSxxG"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(255,176,205,0.8)]" />
                </div>
                <div className="relative group">
                  <img
                    alt="Friend 3"
                    className="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-surface"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0dNIwQlwWyMI1yAU9QiRllOZ1RzU0rES0bkxSMH7aEXIUFm3_2-nhJS6DwdcjVUOioeej_nHUr_G9teql9HQQbi-lJ0gdmbPbDw5RIr_sDOQAIk0Vx5ZdeJpxjK_qkeiL2zyXD78uO_6fRcea55nX7EEfc1Mr9NkKBESormqVDjMiR0yAd_3g1-sQdrOdOp1EYxy-5-jRWIZZqfzhJXDm2QsPBB97H-p7bn8yR7LI"
                  />
                </div>
                <div className="relative group">
                  <img
                    alt="Friend 4"
                    className="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-surface"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_-Nq9Gd0QiDu1zZ1DJw8xIEHKDxKSLDzhmVxWiHc3pAzXT9O3aINtDbLw65-AK-3LM9nAK6fQ5W7g5iO4RFNf7x0kCLQ3TYAB4DvP36fiN1I3vGHaE5v98Re2ujZyc9LiS0JlueEvH_DptOmwinkvuUEJL2rRv7IK6GCFm1eDPvGVzhu4LPk2XUKdecgV1O96Zl43XLISU0X_0lcAu9jEa2rzlS7LJRabP9yVOgWB"
                  />
                </div>
              </div>

              {/* Invite Shortcut */}
              <button
                type="button"
                onClick={() => inviteAll(movie.id)}
                className={`py-2 px-3 rounded-full font-label-sm text-label-sm flex items-center gap-1 active:scale-95 transition-all shadow-[0_0_12px_rgba(170,2,102,0.3)] ${
                  isInvited
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-secondary-container text-on-secondary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>{isInvited ? 'Invites Sent! ✨' : 'Invite All (4)'}</span>
              </button>
            </div>
          </div>

          {/* Synopsis Block */}
          <div className="flex flex-col space-y-space-xs">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Synopsis</h3>
            <p
              className={`font-body-md text-body-md text-on-surface-variant leading-relaxed transition-all ${
                isSynopsisExpanded ? '' : 'line-clamp-3'
              }`}
            >
              {movie.synopsis}
            </p>
            <button
              type="button"
              onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
              className="self-start font-label-md text-label-md text-primary hover:underline"
            >
              {isSynopsisExpanded ? 'Show less' : 'Read more'}
            </button>
          </div>

          {/* Director & Cast Strip */}
          {movie.cast.length > 0 && (
            <div className="flex flex-col space-y-space-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Director &amp; Cast</h3>
                <span className="font-label-sm text-label-sm text-outline">Full Cast</span>
              </div>
              <div className="flex gap-space-sm overflow-x-auto no-scrollbar pb-1">
                {/* Director */}
                <div className="flex flex-col items-center min-w-[76px] space-y-1.5 flex-shrink-0">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-surface-container-high shadow-md border border-white/5">
                    <img alt={movie.director.name} className="w-full h-full object-cover" src={movie.director.avatarUrl} />
                  </div>
                  <div className="text-center">
                    <span className="font-label-md text-label-md text-on-surface block truncate max-w-[76px]">
                      {movie.director.name}
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary block">Director</span>
                  </div>
                </div>

                {/* Cast Members */}
                {movie.cast.map(c => (
                  <div key={c.name} className="flex flex-col items-center min-w-[76px] space-y-1.5 flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-surface-container-high shadow-md border border-white/5">
                      <img alt={c.name} className="w-full h-full object-cover" src={c.avatarUrl} />
                    </div>
                    <div className="text-center">
                      <span className="font-label-md text-label-md text-on-surface block truncate max-w-[76px]">
                        {c.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant block">{c.character}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Trailer Card */}
          {movie.trailerThumbnail && (
            <div className="flex flex-col space-y-space-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Official Trailer</h3>
                <span className="font-label-sm text-label-sm text-primary">{movie.trailerDuration}</span>
              </div>
              <div
                onClick={() => setIsPlayingTrailer(prev => !prev)}
                className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container-low shadow-lg group cursor-pointer border border-white/5"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${movie.trailerThumbnail}')` }}
                />
                <div className="absolute inset-0 bg-surface-container-lowest/40 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_16px_rgba(208,188,255,0.6)] group-hover:scale-110 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[28px] ml-0.5 icon-filled">
                      {isPlayingTrailer ? 'pause' : 'play_arrow'}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md">
                  <span className="font-label-sm text-label-sm text-on-surface">Teaser 2 • Warner Bros.</span>
                </div>
              </div>
            </div>
          )}

          {/* Watch Party Configuration & Settings Drawer Preview */}
          <div className="bg-surface-container rounded-xl p-space-md flex flex-col space-y-space-md shadow-xl border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Party Preset Settings</h3>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-container/30 px-2 py-0.5 rounded-full font-bold">
                HOST MODE
              </span>
            </div>

            {/* Setting 1: Privacy Toggle */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                <span>Room Access</span>
              </label>
              <div className="grid grid-cols-3 gap-1 bg-surface-container-lowest p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPrivacy('friends')}
                  className={`py-1.5 text-center rounded font-label-sm text-label-sm transition-all ${
                    privacy === 'friends'
                      ? 'bg-primary-container text-on-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Friends Only
                </button>
                <button
                  type="button"
                  onClick={() => setPrivacy('link')}
                  className={`py-1.5 text-center rounded font-label-sm text-label-sm transition-all ${
                    privacy === 'link'
                      ? 'bg-primary-container text-on-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Invite Link
                </button>
                <button
                  type="button"
                  onClick={() => setPrivacy('public')}
                  className={`py-1.5 text-center rounded font-label-sm text-label-sm transition-all ${
                    privacy === 'public'
                      ? 'bg-primary-container text-on-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Public
                </button>
              </div>
            </div>

            {/* Setting 2: Playback Sync Authority */}
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col pr-2">
                <span className="font-label-md text-label-md text-on-surface">Sync Control Lock</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Only host can pause, seek, and fast-forward
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSyncLocked(!syncLocked)}
                className={`w-12 h-6 rounded-full relative flex items-center px-0.5 transition-colors ${
                  syncLocked ? 'bg-primary-container' : 'bg-surface-container-high'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform ${
                    syncLocked ? 'bg-on-primary translate-x-6' : 'bg-outline translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Setting 3: Live Channels Defaults */}
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col pr-2">
                <span className="font-label-md text-label-md text-on-surface">Spatial Voice Chat</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Auto-ducking movie audio during speech
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVoiceDucking(!voiceDucking)}
                className={`w-12 h-6 rounded-full relative flex items-center px-0.5 transition-colors ${
                  voiceDucking ? 'bg-primary-container' : 'bg-surface-container-high'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform ${
                    voiceDucking ? 'bg-on-primary translate-x-6' : 'bg-outline translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Settings summary badge */}
            <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex items-center gap-2 border border-white/5">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant flex-1">
                Preset saved for your next session. Room link will be copied upon launch.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

