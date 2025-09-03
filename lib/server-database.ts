import { createClient } from "./supabase/server";
import {
  Profile,
  Event,
  Transcription,
  ConnectedService,
  EventCredential,
} from "./simple-database";

// Server-side database operations
export const serverAuthService = {
  // Get current user (server-side)
  async getCurrentUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },
};

export const serverProfileService = {
  // Get user profile (server-side)
  async getProfile(
    userId: string
  ): Promise<{ data: Profile | null; error: any }> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return { data, error };
  },

  // Update profile (server-side)
  async updateProfile(userId: string, updates: Partial<Profile>) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
    return { data, error };
  },
};

export const serverEventsService = {
  // Get user's events (server-side)
  async getEvents(
    userId: string,
    status?: string
  ): Promise<{ data: Event[] | null; error: any }> {
    const supabase = await createClient();
    let query = supabase
      .from("events")
      .select(
        `
        *,
        connected_services(name, title)
      `
      )
      .eq("user_id", userId)
      .order("event_begin", { ascending: true });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Create event (server-side)
  async createEvent(event: Omit<Event, "id" | "created_at" | "updated_at">) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select()
      .single();
    return { data, error };
  },
};

export const serverTranscriptionService = {
  // Get transcriptions (server-side)
  async getTranscriptions(userId: string, chatId?: string) {
    const supabase = await createClient();
    let query = supabase
      .from("transcriptions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (chatId) {
      query = query.eq("chat_id", chatId);
    }

    const { data, error } = await query;
    return { data, error };
  },
};

// Utility function to check authentication server-side
export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

// Utility function to get user profile server-side
export async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }

  return data;
}
