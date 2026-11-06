import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ChatMessage, Participant, WatchParty } from '../types';
import { ACTIVE_WATCH_PARTY, CURRENT_USER } from '../data/mockData';
import { WatchPartyService } from '../lib/supabase';

interface FloatingReaction {
  id: string;
  emoji: string;
  left?: number;
}

interface WatchPartyContextType {
  party: WatchParty;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  isSyncLocked: boolean;
  isMicOn: boolean;
  isCamOn: boolean;
  activeMode: 'video' | 'voice' | 'chat' | 'pure';
  participants: Participant[];
  chatMessages: ChatMessage[];
  isTyping: boolean;
  typingUser: string;
  floatingReactions: FloatingReaction[];
  togglePlayPause: () => void;
  seekTo: (timeInSeconds: number) => void;
  toggleSyncLock: () => void;
  toggleMic: () => void;
  toggleCam: () => void;
  setActiveMode: (mode: 'video' | 'voice' | 'chat' | 'pure') => void;
  sendChatMessage: (content: string) => void;
  triggerReaction: (emoji: string) => void;
  joinPartyByCode: (code: string) => Promise<boolean>;
  leaveParty: () => void;
}

const WatchPartyContext = createContext<WatchPartyContextType | undefined>(undefined);

export const WatchPartyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [party, setParty] = useState<WatchParty>(ACTIVE_WATCH_PARTY);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(6135); // 01:42:15
  const [totalDuration] = useState<number>(10140); // 02:49:00
  const [isSyncLocked, setIsSyncLocked] = useState<boolean>(true);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isCamOn, setIsCamOn] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<'video' | 'voice' | 'chat' | 'pure'>('video');
  const [participants, setParticipants] = useState<Participant[]>(ACTIVE_WATCH_PARTY.participants);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'sys-1',
      senderId: 'system',
      senderName: 'System',
      senderAvatar: '',
      timestamp: '01:40:00',
      content: 'Sarah synced room timeline at 01:40:00',
      isSystem: true
    },
    {
      id: 'msg-1',
      senderId: 'user-sarah',
      senderName: 'Sarah C.',
      senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeWl6gLTXc2caCe-oLvvfCiVdEhqjqBhuOQVeD1d5phYeWh67sn18hQ7p4tgBEIGIy8qJA9F_bRJuXgPFSQRcJv91Ztdwf-cVF9aTtRIvX72ZldgQ7goeo36Ahp-IcKC-SOLUOSBVsEfwmeVgJgfs9TZj4BodplPwMPWylWGvEDloCfmwS9a8VoxjGQtHgcQtkDhK4NFQDk5u56ys9Cvx50O2C1Xb0kg6pnUM45CJo',
      timestamp: '01:41:20',
      content: 'Did anyone else see the size of that wave?! Hans Zimmer went all out here 🌊'
    },
    {
      id: 'msg-2',
      senderId: 'friend-elena',
      senderName: 'Elena R.',
      senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1DobP6FW47y5ULhICl1EsVahsw0bhaZxM23kXLnXg7t9ayNwVt6zmi65Kz-1H0H6TXv5TWhGUHCKDuNWoAXHHGe9PDIoqQLJKpZ-su6FZpaBAvySIuYIDGyAFMZO9DgPCAR-Ia24l9ePbwUGLFKTbm3WZPRzmYzeMAmYJTlcM8sWwZZf99ggUKgOf-xtA9yrMnqUkvUxBocmQ-DjPo0vd8L3nckR7OPbj3xmcNilA',
      timestamp: '01:41:48',
      content: 'That organ score is incredible! Goosebumps literally everywhere.'
    },
    {
      id: 'msg-3',
      senderId: 'user-alex',
      senderName: 'You',
      senderAvatar: CURRENT_USER.avatarUrl,
      timestamp: '01:42:05',
      content: 'Wait for the docking sequence later... best scene ever made! 🚀',
      isSelf: true
    }
  ]);

  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [typingUser] = useState<string>('Marcus');
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([
    { id: 'init-1', emoji: '🍿' },
    { id: 'init-2', emoji: '🚀' },
    { id: 'init-3', emoji: '❤️' }
  ]);

  // Playback timer ticker when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= totalDuration) return prev;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  // Periodic random typing simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const seekTo = (timeInSeconds: number) => {
    setCurrentTime(Math.max(0, Math.min(totalDuration, timeInSeconds)));
  };

  const toggleSyncLock = () => {
    setIsSyncLocked(prev => !prev);
  };

  const toggleMic = () => {
    setIsMicOn(prev => !prev);
    setParticipants(prev =>
      prev.map(p => (p.id === CURRENT_USER.id ? { ...p, isMuted: isMicOn } : p))
    );
  };

  const toggleCam = () => {
    setIsCamOn(prev => !prev);
    setParticipants(prev =>
      prev.map(p => (p.id === CURRENT_USER.id ? { ...p, isCamOff: isCamOn } : p))
    );
  };

  const sendChatMessage = (content: string) => {
    if (!content.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER.id,
      senderName: 'You',
      senderAvatar: CURRENT_USER.avatarUrl,
      timestamp: 'Just now',
      content: content.trim(),
      isSelf: true
    };

    setChatMessages(prev => [...prev, newMsg]);
    WatchPartyService.saveMessage(party.id, {
      senderId: CURRENT_USER.id,
      content: content.trim()
    });
  };

  const triggerReaction = (emoji: string) => {
    const newReaction: FloatingReaction = {
      id: `reaction-${Date.now()}-${Math.random()}`,
      emoji
    };
    setFloatingReactions(prev => [...prev, newReaction]);

    setTimeout(() => {
      setFloatingReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 2000);
  };

  const joinPartyByCode = async (code: string): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 800);
    });
  };

  const leaveParty = () => {
    // Navigate back or reset state
  };

  return (
    <WatchPartyContext.Provider
      value={{
        party,
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
        toggleSyncLock,
        toggleMic,
        toggleCam,
        setActiveMode,
        sendChatMessage,
        triggerReaction,
        joinPartyByCode,
        leaveParty
      }}
    >
      {children}
    </WatchPartyContext.Provider>
  );
};

export const useWatchParty = () => {
  const context = useContext(WatchPartyContext);
  if (!context) throw new Error('useWatchParty must be used within a WatchPartyProvider');
  return context;
};

