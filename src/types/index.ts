export type PresenceState = 'Ready' | 'Watching' | 'Away';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  presence: PresenceState;
  currentActivity?: string;
  roomRole?: 'HOST' | 'MEMBER';
}

export interface Participant extends UserProfile {
  isSpeaking?: boolean;
  isMuted?: boolean;
  isCamOff?: boolean;
  reactionEmoji?: string;
  timelinePin?: number; // percentage or seconds
  audioLevel?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  content: string;
  isSystem?: boolean;
  isSelf?: boolean;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  duration: string;
  ratingImdb: string;
  ratingRottenTomatoes: string;
  ageRating: string;
  synopsis: string;
  backdropUrl: string;
  posterUrl: string;
  genres: string[];
  director: {
    name: string;
    avatarUrl: string;
  };
  cast: {
    name: string;
    character: string;
    avatarUrl: string;
  }[];
  qualityTags: string[];
  trailerDuration: string;
  trailerThumbnail: string;
  isWatchlisted?: boolean;
  mutualFriendsCount?: number;
}

export interface WatchParty {
  id: string;
  title: string;
  movie: Movie;
  host: UserProfile;
  participants: Participant[];
  currentPlaybackTime: number; // in seconds
  totalDuration: number; // in seconds
  isPlaying: boolean;
  isSyncLocked: boolean;
  spatialVoiceEnabled: boolean;
  privacy: 'friends' | 'link' | 'public';
  mode: 'video' | 'voice' | 'chat' | 'pure';
  viewersCount: number;
}

export interface ThemeConfig {
  name: string;
  primaryColor: string;
  primaryGlow: string;
  secondaryColor: string;
  surfaceDepth: 'space' | 'glass' | 'pitch';
  displayMode: 'dark' | 'oled' | 'ambient' | 'light';
  avatarPlacement: 'top' | 'siderail';
  spatialBalance: number; // 0 to 100
  reactionIntensity: 'subtle' | 'dynamic' | 'explosive';
}

