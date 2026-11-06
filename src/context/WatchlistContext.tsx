import React, { createContext, useContext, useState, useEffect } from 'react';

interface WatchlistContextType {
  watchlist: Set<string>;
  toggleWatchlist: (movieId: string) => boolean;
  isWatchlisted: (movieId: string) => boolean;
  invitedStatus: Record<string, boolean>;
  inviteAll: (movieId: string) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('cinesync_watchlist');
      return saved ? new Set(JSON.parse(saved)) : new Set(['blade-runner-2049', 'dune-part-two']);
    } catch {
      return new Set(['blade-runner-2049', 'dune-part-two']);
    }
  });

  const [invitedStatus, setInvitedStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem('cinesync_watchlist', JSON.stringify(Array.from(watchlist)));
    } catch {}
  }, [watchlist]);

  const toggleWatchlist = (movieId: string) => {
    let nowActive = false;
    setWatchlist(prev => {
      const next = new Set(prev);
      if (next.has(movieId)) {
        next.delete(movieId);
        nowActive = false;
      } else {
        next.add(movieId);
        nowActive = true;
      }
      return next;
    });
    return nowActive;
  };

  const isWatchlisted = (movieId: string) => watchlist.has(movieId);

  const inviteAll = (movieId: string) => {
    setInvitedStatus(prev => ({ ...prev, [movieId]: true }));
    setTimeout(() => {
      setInvitedStatus(prev => ({ ...prev, [movieId]: false }));
    }, 2800);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        toggleWatchlist,
        isWatchlisted,
        invitedStatus,
        inviteAll
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error('useWatchlist must be used within a WatchlistProvider');
  return context;
};

