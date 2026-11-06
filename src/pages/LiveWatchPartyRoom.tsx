import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchParty } from '../context/WatchPartyContext';

export const LiveWatchPartyRoom: React.FC = () => {
  const navigate = useNavigate();
  const {
    isPlaying,
    currentTime,
    totalDuration,
    isSyncLocked,
    isMicOn,
    isCamOn,
    activeMode,
    participants,
    chatMessages,
    isTyping,
    typingUser,
    floatingReactions,
    togglePlayPause,
    seekTo,
    toggleMic,
    toggleCam,
    setActiveMode,
    sendChatMessage,
    triggerReaction,
    leaveParty
  } = useWatchParty();

  const [inputMessage, setInputMessage] = useState('');
  const [showInviteToast, setShowInviteToast] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(inputMessage);
    setInputMessage('');
  };

  const handleLeave = () => {
    if (window.confirm('Leave this synchronized watch party?')) {
      leaveParty();
      navigate('/');
    }
  };

  const handleInvite = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowInviteToast(true);
    setTimeout(() => setShowInviteToast(false), 2400);
  };

  // Format seconds into HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, (currentTime / totalDuration) * 100);

  return (
    <main className="flex flex-col relative w-full pt-16 pb-12 pb-safe bg-surface min-h-screen">
      <div className="flex flex-col w-full relative max-w-4xl mx-auto">
        {/* Top Ambient Glow Aura */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-32 bg-primary-container/20 blur-3xl pointer-events-none rounded-full" />

        {/* Synchronized Playback Status Header Pill */}
        <div className="px-gutter-mobile pt-space-xs pb-space-sm flex items-center justify-between gap-space-sm relative z-10">
          <div className="flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-md border border-white/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary" />
            </span>
            <span className="font-label-sm text-label-sm text-on-surface tracking-wider uppercase">
              {isSyncLocked ? 'SYNC LOCKED' : 'SYNC UNLOCKED'}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">• Host: Sarah C.</span>
          </div>

          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">hd</span>
              4K ATMOS
            </span>
            <div className="flex items-center text-tertiary-fixed font-label-sm text-label-sm bg-surface-container-low px-2 py-1 rounded-md">
              <span className="material-symbols-outlined text-[16px] mr-1 text-tertiary">group</span>
              {participants.length}
            </div>
          </div>
        </div>

        {/* Main 16:9 Cinematic Video Player Container */}
        <div className="relative w-full aspect-video bg-surface-container-lowest overflow-hidden shadow-2xl group border-y border-white/5" id="player-container">
          {/* Movie Media Frame */}
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXjuTJI25S8XNE78dWg44XxjAOfQks7xtyv-6IZa0OZb-2wIju7HRCeEhsM0AnfXGwmpz7blPltfLzZ7e0-ZYnCGRGsr8wlBAONqeUrdaw5GSlsu0H0MUSKtPSIZVUh4IagbDkqgF9nnMvYAeOSofou3_dw32OFCrQcOqCApRNpC4SazEAOnkG0vKYwq9_vhdljQ_7mKnddBsqNuJzamw8M-eErxwr1Y4Q4V9qI3-U')"
            }}
          >
            {/* Subtle Ambient Edge Shadows */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/50 via-transparent to-surface-container-lowest/50 pointer-events-none" />
          </div>

          {/* Live Reaction Stream (Flying Emoji Layer) */}
          <div className="absolute right-3 bottom-14 w-12 h-44 pointer-events-none overflow-hidden flex flex-col justify-end items-center z-30">
            {floatingReactions.map(r => (
              <div
                key={r.id}
                className="text-2xl transition-all duration-700 mb-2 opacity-90 drop-shadow-[0_0_10px_rgba(255,185,95,0.6)] animate-bounce"
              >
                {r.emoji}
              </div>
            ))}
          </div>

          {/* Synchronized HUD Glass Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-space-sm bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/90 to-transparent flex flex-col gap-1.5 z-20">
            {/* Scrub Progress Bar With Friend Sync Markers */}
            <div
              className="relative flex flex-col group/seek cursor-pointer"
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                seekTo(ratio * totalDuration);
              }}
            >
              {/* Peer Scrub Heads */}
              <div className="relative w-full h-4">
                {/* Timeline Track Background */}
                <div className="absolute top-1.5 left-0 right-0 h-1.5 rounded-full bg-surface-variant/70 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-on-primary rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Sarah's Host Position Marker */}
                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: '60.5%' }}
                  title="Host: Sarah C."
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-primary ring-2 ring-surface-container-lowest shadow-[0_0_8px_rgba(208,188,255,0.8)]" />
                </div>

                {/* Marcus Timeline Pin */}
                <div
                  className="absolute top-0.5 -translate-x-1/2 flex flex-col items-center opacity-80"
                  style={{ left: '59.8%' }}
                  title="Marcus"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary ring-1 ring-surface-container-lowest" />
                </div>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-0.5">
                <span className="text-primary font-semibold tracking-tight">{formatTime(currentTime)}</span>
                <span className="text-outline">Interstellar (2014) • Miller&apos;s Planet</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Playback Controls Bar */}
            <div className="flex items-center justify-between gap-1 pt-0.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Pause/Play"
                  onClick={togglePlayPause}
                  className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_12px_rgba(208,188,255,0.4)] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px] icon-filled">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => seekTo(currentTime - 10)}
                  className="w-8 h-8 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface flex items-center justify-center active:scale-95 transition-all"
                  title="Rewind 10s"
                >
                  <span className="material-symbols-outlined text-[18px]">replay_10</span>
                </button>
                <button
                  type="button"
                  onClick={() => seekTo(currentTime + 10)}
                  className="w-8 h-8 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface flex items-center justify-center active:scale-95 transition-all"
                  title="Forward 10s"
                >
                  <span className="material-symbols-outlined text-[18px]">forward_10</span>
                </button>
                <div className="flex items-center ml-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  <div className="w-12 h-1 bg-surface-variant rounded-full ml-1.5 overflow-hidden">
                    <div className="w-4/5 h-full bg-on-surface rounded-full" />
                  </div>
                </div>
              </div>

              {/* Subtitles & Fullscreen */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container/80 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">subtitles</span>
                  <span>ENG</span>
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface flex items-center justify-center active:scale-95 transition-all"
                  title="Toggle Fullscreen"
                >
                  <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Selector Dock (4 Distinct CineTogether Experiences) */}
        <div className="px-gutter-mobile py-2.5">
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-surface-container-low shadow-inner border border-white/5">
            <button
              type="button"
              onClick={() => setActiveMode('video')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg font-label-sm text-label-sm transition-all ${
                activeMode === 'video'
                  ? 'bg-surface-container-high text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] mb-0.5 ${activeMode === 'video' ? 'icon-filled' : ''}`}>
                videocam
              </span>
              <span className="truncate w-full text-center">Video</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('voice')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg font-label-sm text-label-sm transition-all ${
                activeMode === 'voice'
                  ? 'bg-surface-container-high text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] mb-0.5 ${activeMode === 'voice' ? 'icon-filled' : ''}`}>
                mic
              </span>
              <span className="truncate w-full text-center">Voice</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('chat')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg font-label-sm text-label-sm transition-all ${
                activeMode === 'chat'
                  ? 'bg-surface-container-high text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] mb-0.5 ${activeMode === 'chat' ? 'icon-filled' : ''}`}>
                chat_bubble
              </span>
              <span className="truncate w-full text-center">Chat</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('pure')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg font-label-sm text-label-sm transition-all ${
                activeMode === 'pure'
                  ? 'bg-surface-container-high text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] mb-0.5 ${activeMode === 'pure' ? 'icon-filled' : ''}`}>
                theaters
              </span>
              <span className="truncate w-full text-center">Pure</span>
            </button>
          </div>
        </div>

        {/* Live Video Chat Grid / Floating Social Avatars (visible in Video & Voice modes) */}
        {activeMode !== 'pure' && (
          <div className="px-gutter-mobile pb-space-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">In The Room</span>
                <span className="px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-label-sm text-label-sm font-semibold">
                  4 Live
                </span>
              </div>

              {/* Quick Reaction Bubble Bar */}
              <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full shadow-sm border border-white/5">
                {['🔥', '😱', '❤️', '🍿', '🚀'].map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => triggerReaction(emoji)}
                    className="text-sm hover:scale-125 active:scale-95 transition-transform"
                    title={`Send ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Participant Video Stream Tiles */}
            <div className="grid grid-cols-4 gap-2">
              {/* Participant 1: Sarah C. (Host & Active Speaker) */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-high shadow-lg transition-transform border border-white/5">
                {/* Glowing Speaker Ring */}
                <div className="absolute inset-0 rounded-xl pointer-events-none ring-2 ring-secondary shadow-[0_0_12px_rgba(236,72,153,0.6)] z-10 animate-pulse" />
                <img
                  alt="Sarah C."
                  className="w-full h-full object-cover"
                  src={participants[0]?.avatarUrl}
                />
                {/* Host Badge */}
                <div className="absolute top-1 left-1 bg-tertiary-container/90 text-on-tertiary-container px-1 py-0.5 rounded text-[9px] font-bold tracking-tight uppercase flex items-center gap-0.5 z-20">
                  <span className="material-symbols-outlined text-[10px]">star</span>
                  HOST
                </div>
                {/* Speaker Wave Indicator + Name Tag */}
                <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent flex items-center justify-between z-20">
                  <span className="font-label-sm text-[10px] font-medium text-on-surface truncate max-w-[40px]">Sarah</span>
                  <div className="flex items-center gap-0.5 text-secondary">
                    <span className="inline-block w-0.5 h-2 bg-secondary animate-pulse" />
                    <span className="inline-block w-0.5 h-3 bg-secondary animate-pulse" style={{ animationDelay: '75ms' }} />
                    <span className="inline-block w-0.5 h-1.5 bg-secondary animate-pulse" style={{ animationDelay: '150ms' }} />
                  </div>
                </div>
              </div>

              {/* Participant 2: Marcus (Listening, Popcorn Reaction Active) */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-high shadow-md border border-white/5">
                <img
                  alt="Marcus"
                  className="w-full h-full object-cover"
                  src={participants[1]?.avatarUrl}
                />
                {/* Live Reaction Badge Overlay */}
                <div className="absolute top-1 right-1 bg-surface-container-lowest/90 px-1 py-0.5 rounded-full text-[10px] shadow z-20 animate-bounce">
                  🍿
                </div>
                <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent flex items-center justify-between z-20">
                  <span className="font-label-sm text-[10px] font-medium text-on-surface truncate max-w-[42px]">Marcus</span>
                  <span className="material-symbols-outlined text-[12px] text-outline">mic_off</span>
                </div>
              </div>

              {/* Participant 3: Elena R. */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-high shadow-md border border-white/5">
                <img
                  alt="Elena"
                  className="w-full h-full object-cover"
                  src={participants[2]?.avatarUrl}
                />
                <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent flex items-center justify-between z-20">
                  <span className="font-label-sm text-[10px] font-medium text-on-surface truncate max-w-[40px]">Elena</span>
                  <span className="material-symbols-outlined text-[12px] text-outline">mic_off</span>
                </div>
              </div>

              {/* Participant 4: You (Alex) */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-high shadow-md border border-white/5">
                {isCamOn ? (
                  <img
                    alt="You"
                    className="w-full h-full object-cover scale-x-[-1]"
                    src={participants[3]?.avatarUrl}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-container-highest text-on-surface-variant">
                    <span className="material-symbols-outlined text-[24px]">videocam_off</span>
                  </div>
                )}
                <div className="absolute top-1 left-1 bg-primary/80 text-on-primary px-1 py-0.5 rounded text-[8px] font-bold tracking-tight uppercase z-20">
                  YOU
                </div>
                <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent flex items-center justify-between z-20">
                  <span className="font-label-sm text-[10px] font-medium text-on-surface">Alex</span>
                  <span className={`material-symbols-outlined text-[12px] ${isMicOn ? 'text-tertiary' : 'text-outline'}`}>
                    {isMicOn ? 'mic' : 'mic_off'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Synchronized Chat Bottom Section (visible in Video, Voice, Chat modes) */}
        {activeMode !== 'pure' && (
          <div className="flex-1 flex flex-col px-gutter-mobile pb-2 gap-2">
            {/* Chat Header with Live Typing Indicator */}
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">forum</span>
                <span>Cinema Party Chat</span>
              </div>
              {isTyping && (
                <div className="flex items-center gap-1 text-[11px] text-tertiary-fixed font-medium animate-pulse">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary" />
                  <span>{typingUser} is typing...</span>
                </div>
              )}
            </div>

            {/* Scrollable Chat Stream Box */}
            <div className="flex flex-col gap-2 max-h-44 overflow-y-auto pr-1 no-scrollbar">
              {chatMessages.map(msg => {
                if (msg.isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center my-0.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-tertiary-fixed font-label-sm text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-sm border border-white/5">
                        <span className="material-symbols-outlined text-[12px]">lock_clock</span>
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                if (msg.isSelf) {
                  return (
                    <div key={msg.id} className="flex items-start justify-end gap-2">
                      <div className="flex flex-col items-end min-w-0 max-w-[85%]">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[10px] text-outline">{msg.timestamp}</span>
                          <span className="font-label-md text-label-md text-primary font-semibold">You</span>
                        </div>
                        <div className="mt-0.5 bg-primary-container p-2 rounded-xl rounded-tr-none text-on-primary-container font-body-sm text-body-sm shadow-sm font-medium">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="flex items-start gap-2 group">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5 shadow-sm">
                      <img alt={msg.senderName} className="w-full h-full object-cover" src={msg.senderAvatar} />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-label-md text-label-md text-tertiary-fixed font-semibold">
                          {msg.senderName}
                        </span>
                        <span className="text-[10px] text-outline">{msg.timestamp}</span>
                      </div>
                      <div className="mt-0.5 bg-surface-container p-2 rounded-xl rounded-tl-none text-on-surface font-body-sm text-body-sm inline-block shadow-sm border border-white/5">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Box Dock */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface-container-high/90 shadow-md border border-white/5">
              <button
                type="button"
                onClick={() => triggerReaction('🍿')}
                className="w-8 h-8 rounded-full text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors"
                title="Add Emoji"
              >
                <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Chat with your watch party..."
                className="flex-1 bg-transparent border-0 focus:outline-none text-on-surface placeholder:text-outline font-body-md text-body-md px-1 py-1"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-fixed active:scale-90 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        )}

        {/* Floating Cinema Bottom Action Bar */}
        <div className="sticky bottom-2 mx-gutter-mobile mt-1 p-2 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-between z-40 border border-white/5">
          <div className="flex items-center gap-1.5">
            {/* Mic Toggle */}
            <button
              type="button"
              onClick={toggleMic}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 font-label-sm text-label-sm active:scale-95 transition-all shadow-sm ${
                isMicOn
                  ? 'bg-surface-container text-tertiary'
                  : 'bg-surface-container-high text-error'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{isMicOn ? 'mic' : 'mic_off'}</span>
              <span>{isMicOn ? 'Mic On' : 'Muted'}</span>
            </button>

            {/* Camera Toggle */}
            <button
              type="button"
              onClick={toggleCam}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 font-label-sm text-label-sm active:scale-95 transition-all shadow-sm ${
                isCamOn
                  ? 'bg-surface-container text-on-surface'
                  : 'bg-surface-container-high text-outline'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{isCamOn ? 'videocam' : 'videocam_off'}</span>
              <span>{isCamOn ? 'Cam On' : 'Cam Off'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Invite Friends Pill */}
            <button
              type="button"
              onClick={handleInvite}
              className="px-2.5 py-2 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high flex items-center gap-1 font-label-sm text-label-sm active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Invite</span>
            </button>

            {/* Leave Room Button */}
            <button
              type="button"
              onClick={handleLeave}
              className="w-9 h-9 rounded-xl bg-error-container text-on-error-container hover:brightness-110 flex items-center justify-center active:scale-95 transition-all shadow-sm"
              title="Leave Party"
            >
              <span className="material-symbols-outlined text-[20px]">call_end</span>
            </button>
          </div>
        </div>

        {/* Invite link copied toast */}
        {showInviteToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold shadow-xl flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Party invite link copied!
          </div>
        )}
      </div>
    </main>
  );
};

