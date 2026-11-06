import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

let client: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
  } catch (err) {
    console.warn('[CineSync] Failed to initialize Supabase client:', err);
  }
}

export const supabase = client;

/**
 * Service Layer for Supabase / Demo fallback
 */
export const WatchPartyService = {
  async getParty(partyCode: string) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('watch_parties')
        .select('*, movie:movies(*), host:users(*)')
        .eq('code', partyCode)
        .single();
      if (!error && data) return data;
    }
    // Demo mode: Return null to let the app use mock party or created local party
    return null;
  },

  async saveMessage(partyId: string, message: { senderId: string; content: string }) {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('messages').insert({
        party_id: partyId,
        sender_id: message.senderId,
        content: message.content,
        created_at: new Date().toISOString()
      });
    }
  },

  async updatePresence(userId: string, presence: string) {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('users').update({ presence }).eq('id', userId);
    }
  }
};

