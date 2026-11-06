-- ==============================================================================
-- CineSync — Supabase Database Schema & Row Level Security (RLS) Policies
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Users / Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  presence TEXT DEFAULT 'Ready' CHECK (presence IN ('Ready', 'Watching', 'Away')),
  current_activity TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 3. Movies Catalog Table
CREATE TABLE IF NOT EXISTS public.movies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  year INT NOT NULL,
  duration TEXT NOT NULL,
  rating_imdb TEXT,
  rating_rotten_tomatoes TEXT,
  age_rating TEXT,
  synopsis TEXT,
  backdrop_url TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  genres TEXT[] DEFAULT '{}',
  director JSONB,
  cast_members JSONB DEFAULT '[]',
  quality_tags TEXT[] DEFAULT '{}',
  trailer_duration TEXT,
  trailer_thumbnail TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Movies are viewable by everyone."
  ON public.movies FOR SELECT
  USING (true);

-- 4. Watch Parties Table
CREATE TABLE IF NOT EXISTS public.watch_parties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  movie_id TEXT REFERENCES public.movies(id) ON DELETE CASCADE,
  host_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_playback_time NUMERIC DEFAULT 0,
  is_playing BOOLEAN DEFAULT true,
  is_sync_locked BOOLEAN DEFAULT true,
  spatial_voice_enabled BOOLEAN DEFAULT true,
  privacy TEXT DEFAULT 'friends' CHECK (privacy IN ('friends', 'link', 'public')),
  mode TEXT DEFAULT 'video' CHECK (mode IN ('video', 'voice', 'chat', 'pure')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.watch_parties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Watch parties viewable by authorized users."
  ON public.watch_parties FOR SELECT
  USING (
    privacy = 'public' 
    OR host_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.party_members 
      WHERE party_members.party_id = watch_parties.id 
      AND party_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create parties."
  ON public.watch_parties FOR INSERT
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their watch party."
  ON public.watch_parties FOR UPDATE
  USING (auth.uid() = host_id);

-- 5. Party Members (Junction Table)
CREATE TABLE IF NOT EXISTS public.party_members (
  party_id UUID REFERENCES public.watch_parties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'MEMBER' CHECK (role IN ('HOST', 'MEMBER')),
  is_speaking BOOLEAN DEFAULT false,
  is_muted BOOLEAN DEFAULT false,
  is_cam_off BOOLEAN DEFAULT false,
  timeline_pin NUMERIC DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (party_id, user_id)
);

ALTER TABLE public.party_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members viewable by party participants."
  ON public.party_members FOR SELECT
  USING (true);

CREATE POLICY "Users can join a party."
  ON public.party_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their member state."
  ON public.party_members FOR UPDATE
  USING (auth.uid() = user_id);

-- 6. Synchronized Chat Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  party_id UUID REFERENCES public.watch_parties(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Messages viewable by party participants."
  ON public.messages FOR SELECT
  USING (true);

CREATE POLICY "Users can post messages to their parties."
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- 7. User Watchlists Table
CREATE TABLE IF NOT EXISTS public.user_watchlists (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  movie_id TEXT REFERENCES public.movies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, movie_id)
);

ALTER TABLE public.user_watchlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own watchlist."
  ON public.user_watchlists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their watchlist."
  ON public.user_watchlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their watchlist."
  ON public.user_watchlists FOR DELETE
  USING (auth.uid() = user_id);

-- 8. User Theme & Studio Preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  theme_name TEXT DEFAULT 'Purple Galaxy',
  primary_color TEXT DEFAULT '#D0BCFF',
  primary_glow TEXT DEFAULT 'rgba(208, 188, 255, 0.45)',
  secondary_color TEXT DEFAULT '#FFB0CD',
  surface_depth TEXT DEFAULT 'space',
  display_mode TEXT DEFAULT 'dark',
  avatar_placement TEXT DEFAULT 'top',
  spatial_balance INT DEFAULT 75,
  reaction_intensity TEXT DEFAULT 'dynamic',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences."
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert their preferences."
  ON public.user_preferences FOR ALL
  USING (auth.uid() = user_id);

-- 9. Realtime Publication Setup
-- Add tables to supabase_realtime publication for instant socket push
ALTER PUBLICATION supabase_realtime ADD TABLE public.watch_parties;
ALTER PUBLICATION supabase_realtime ADD TABLE public.party_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- 10. Sample Seed Movies
INSERT INTO public.movies (id, title, year, duration, rating_imdb, rating_rotten_tomatoes, age_rating, synopsis, backdrop_url, poster_url, genres, quality_tags)
VALUES 
  ('blade-runner-2049', 'Blade Runner 2049', 2017, '2h 44m', '8.0', '88%', 'R • 163 min', 'Thirty years after the events of the first film, a new Blade Runner, LAPD Officer K (Ryan Gosling), unearths a long-buried secret...', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63AaJ1tcrwkTqN9_4HYix3MhPRSqurheBTN8Y_G5xgmdzVfxmDb6PWbYbqNw4uZ30FCUWhDu3S2-aNw4gJEPg2RgJj0H6TUpnzsY0kTXlA1I-Z_bsp6__aEZ0I6ilCj6L8BjgXj9oliIguvGciSD0vX2xifkL9VQTvEpXbBkOpOcdmYGFMkecinfetRfg_AxZqmL5uay7A5Dd_K_04-kEYPZANcsK52tlF7LsVRSy', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63AaJ1tcrwkTqN9_4HYix3MhPRSqurheBTN8Y_G5xgmdzVfxmDb6PWbYbqNw4uZ30FCUWhDu3S2-aNw4gJEPg2RgJj0H6TUpnzsY0kTXlA1I-Z_bsp6__aEZ0I6ilCj6L8BjgXj9oliIguvGciSD0vX2xifkL9VQTvEpXbBkOpOcdmYGFMkecinfetRfg_AxZqmL5uay7A5Dd_K_04-kEYPZANcsK52tlF7LsVRSy', ARRAY['Sci-Fi', 'Mystery', 'Action'], ARRAY['4K ULTRA HD', 'DOLBY ATMOS', '2h 44m', '2017']),
  ('interstellar', 'Interstellar (2014)', 2014, '2h 49m', '8.7', '73%', 'PG-13 • 169 min', 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft...', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXjuTJI25S8XNE78dWg44XxjAOfQks7xtyv-6IZa0OZb-2wIju7HRCeEhsM0AnfXGwmpz7blPltfLzZ7e0-ZYnCGRGsr8wlBAONqeUrdaw5GSlsu0H0MUSKtPSIZVUh4IagbDkqgF9nnMvYAeOSofou3_dw32OFCrQcOqCApRNpC4SazEAOnkG0vKYwq9_vhdljQ_7mKnddBsqNuJzamw8M-eErxwr1Y4Q4V9qI3-U', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXjuTJI25S8XNE78dWg44XxjAOfQks7xtyv-6IZa0OZb-2wIju7HRCeEhsM0AnfXGwmpz7blPltfLzZ7e0-ZYnCGRGsr8wlBAONqeUrdaw5GSlsu0H0MUSKtPSIZVUh4IagbDkqgF9nnMvYAeOSofou3_dw32OFCrQcOqCApRNpC4SazEAOnkG0vKYwq9_vhdljQ_7mKnddBsqNuJzamw8M-eErxwr1Y4Q4V9qI3-U', ARRAY['Sci-Fi', 'Adventure', 'Drama'], ARRAY['4K ATMOS', 'IMAX RATIO']),
  ('dune-part-two', 'Dune: Part Two', 2024, '2h 46m', '8.6', '92%', 'PG-13 • 166 min', 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBJ6G8-JYf82zjnauINMGlwywnk9XWGLy6sIaQxk-TnIssX5AdUvhqH4hodmNRBoLYBXveJMIcXpQCqAsEROl560JQYQQ1R7KlYe1mplFGgVKwfPwMRM6PYWD79vXcfm_mL3S98ZEqH8qlHjABZDfybX2PsQu_k9YFMwcCvrZ92_fygvpNuz4Kd-fvghBwZuRscmdZ186LJi-a2vrzUcsJfLBcXILa2vDi0n9lkuQL', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBJ6G8-JYf82zjnauINMGlwywnk9XWGLy6sIaQxk-TnIssX5AdUvhqH4hodmNRBoLYBXveJMIcXpQCqAsEROl560JQYQQ1R7KlYe1mplFGgVKwfPwMRM6PYWD79vXcfm_mL3S98ZEqH8qlHjABZDfybX2PsQu_k9YFMwcCvrZ92_fygvpNuz4Kd-fvghBwZuRscmdZ186LJi-a2vrzUcsJfLBcXILa2vDi0n9lkuQL', ARRAY['Sci-Fi', 'Adventure'], ARRAY['4K ULTRA HD', 'DOLBY ATMOS']),
  ('spider-man-spider-verse', 'Spider-Man: Across the Spider-Verse', 2023, '2h 20m', '8.7', '95%', 'PG • 140 min', 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXzXdlvd_Y8eZKQPs3RBfMy3AKurbKSCDtcDBYw6eM8idWW0wGIkwbCxZbejy3Jy_Sl-TI86ToeMcuNYRtCqaih4g4R_yW2oetzR-ZkGd61llfYD1PgrDTZ3HlBjBzvqPykEz5If_WBxjPaaPwWLaSiczfqkBmJab6azuvI29wVaEANbWjeLSMQaLCW-v39tYPdRruI1FQzZsAlBuS1QcaRwGb9pMXyighnMY-ss_H', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXzXdlvd_Y8eZKQPs3RBfMy3AKurbKSCDtcDBYw6eM8idWW0wGIkwbCxZbejy3Jy_Sl-TI86ToeMcuNYRtCqaih4g4R_yW2oetzR-ZkGd61llfYD1PgrDTZ3HlBjBzvqPykEz5If_WBxjPaaPwWLaSiczfqkBmJab6azuvI29wVaEANbWjeLSMQaLCW-v39tYPdRruI1FQzZsAlBuS1QcaRwGb9pMXyighnMY-ss_H', ARRAY['Animation', 'Action', 'Sci-Fi'], ARRAY['4K ATMOS', 'LIVE SYNC']),
  ('past-lives', 'Past Lives', 2023, '1h 45m', '7.9', '98%', 'PG-13 • 105 min', 'Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora’s family emigrates from South Korea.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy_MMMokg9mZkWCJfwsQI6xMVSTlMlhDSRizGkzmUCCNUfrmHNdOlVCnfc9pI-_rFQIg5RlzmgOkvZorllUSKnwGiXpEEqueGBwi9VyBzjOaqBNliU2F_AGbSpH4S8VDLHlSAEF4Jm9foQcKF7sCJ0G30zQs79G_uHICAbcH6E-HeIdGmZHsLW6s595rons1VbducyzO1TpGckkWpKBNLZ0f1A5axWHT0Daveg2dJ2', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy_MMMokg9mZkWCJfwsQI6xMVSTlMlhDSRizGkzmUCCNUfrmHNdOlVCnfc9pI-_rFQIg5RlzmgOkvZorllUSKnwGiXpEEqueGBwi9VyBzjOaqBNliU2F_AGbSpH4S8VDLHlSAEF4Jm9foQcKF7sCJ0G30zQs79G_uHICAbcH6E-HeIdGmZHsLW6s595rons1VbducyzO1TpGckkWpKBNLZ0f1A5axWHT0Daveg2dJ2', ARRAY['Drama', 'Romance'], ARRAY['Crowd Fav', 'Crying Alert 😭'])
ON CONFLICT (id) DO NOTHING;

