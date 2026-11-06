import React, { createContext, useContext, useState } from 'react';
import { PresenceState } from '../types';
import { CURRENT_USER } from '../data/mockData';
import { WatchPartyService } from '../lib/supabase';

interface PresenceContextType {
  presence: PresenceState;
  cyclePresence: () => void;
  setPresence: (state: PresenceState) => void;
}

const PresenceContext = createContext<PresenceContextType | undefined>(undefined);

export const PresenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [presence, setPresenceState] = useState<PresenceState>(CURRENT_USER.presence);

  const statuses: PresenceState[] = ['Ready', 'Watching', 'Away'];

  const cyclePresence = () => {
    setPresenceState(prev => {
      const idx = statuses.indexOf(prev);
      const next = statuses[(idx + 1) % statuses.length];
      WatchPartyService.updatePresence(CURRENT_USER.id, next);
      return next;
    });
  };

  const setPresence = (state: PresenceState) => {
    setPresenceState(state);
    WatchPartyService.updatePresence(CURRENT_USER.id, state);
  };

  return (
    <PresenceContext.Provider value={{ presence, cyclePresence, setPresence }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresence = () => {
  const context = useContext(PresenceContext);
  if (!context) throw new Error('usePresence must be used within a PresenceProvider');
  return context;
};

