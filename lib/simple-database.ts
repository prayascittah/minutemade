import { supabase } from "./supabaseClient";

export interface Profile {
  id: string;
  username?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ConnectedService {
  id: number;
  name: "Gmail" | "Discord";
  title: string;
  description: string;
}

export interface EventCredential {
  id: string;
  user_id: string;
  service_id: number;
  access_token: string;
  refresh_token?: string;
  expires_token?: string;
  created_at: string;
  updated_at: string;
}

export interface Transcription {
  id: string;
  user_id: string;
  chat_id: string;
  transcribed_text: string;
  created_at: string;
}

export interface Event {
  id: string;
  user_id: string;
  service_event_id?: string;
  service_id?: number;
  title: string;
  description?: string;
  priority?: "high" | "medium" | "low";
  status?: "todo" | "in_progress" | "done";
  event_begin?: string;
  event_end?: string;
  created_at: string;
  updated_at: string;
}

export const authService = {
  // Get current user
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  // Listen for auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Sign up with email and password
  async signUp(email: string, password: string, username: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    return { data, error };
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign in with OAuth (Google)
  async signInWithOAuth(provider: "google") {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
    return { data, error };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
};

export const profileService = {
  // Get user profile
  async getProfile(
    userId: string
  ): Promise<{ data: Profile | null; error: any }> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return { data, error };
  },

  // Update profile
  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
    return { data, error };
  },
};

export const servicesService = {
  // Get all available services (Gmail, Discord)
  async getAvailableServices(): Promise<{
    data: ConnectedService[] | null;
    error: any;
  }> {
    const { data, error } = await supabase
      .from("connected_services")
      .select("*")
      .order("name");
    return { data, error };
  },

  // Get user's connected services
  async getUserConnectedServices(userId: string) {
    const { data, error } = await supabase
      .from("event_credentials")
      .select(
        `
        *,
        connected_services(name, title, description)
      `
      )
      .eq("user_id", userId);
    return { data, error };
  },

  // Save service credentials
  async saveCredentials(
    userId: string,
    serviceId: number,
    accessToken: string,
    refreshToken?: string,
    expiresToken?: string
  ) {
    const { data, error } = await supabase
      .from("event_credentials")
      .upsert({
        user_id: userId,
        service_id: serviceId,
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_token: expiresToken,
      })
      .select()
      .single();
    return { data, error };
  },

  // Remove service credentials
  async removeCredentials(userId: string, serviceId: number) {
    const { error } = await supabase
      .from("event_credentials")
      .delete()
      .eq("user_id", userId)
      .eq("service_id", serviceId);
    return { error };
  },
};

export const transcriptionService = {
  // Save voice transcription
  async saveTranscription(
    userId: string,
    chatId: string,
    transcribedText: string
  ) {
    const { data, error } = await supabase
      .from("transcriptions")
      .insert({
        user_id: userId,
        chat_id: chatId,
        transcribed_text: transcribedText,
      })
      .select()
      .single();
    return { data, error };
  },

  // Get transcription history
  async getTranscriptions(userId: string, chatId?: string) {
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

export const eventsService = {
  // Create new event
  async createEvent(event: Omit<Event, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select()
      .single();
    return { data, error };
  },

  // Get user's events
  async getEvents(
    userId: string,
    status?: string
  ): Promise<{ data: Event[] | null; error: any }> {
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

  // Get events by date range
  async getEventsByDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("user_id", userId)
      .gte("event_begin", startDate)
      .lte("event_begin", endDate)
      .order("event_begin", { ascending: true });
    return { data, error };
  },

  // Update event
  async updateEvent(eventId: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", eventId)
      .select()
      .single();
    return { data, error };
  },

  // Delete event
  async deleteEvent(eventId: string) {
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    return { error };
  },

  // Mark event as done
  async completeEvent(eventId: string) {
    const { data, error } = await supabase
      .from("events")
      .update({ status: "done" })
      .eq("id", eventId)
      .select()
      .single();
    return { data, error };
  },

  // Get events from specific service
  async getEventsByService(userId: string, serviceName: "Gmail" | "Discord") {
    const { data, error } = await supabase
      .from("events")
      .select(
        `
        *,
        connected_services!inner(name, title)
      `
      )
      .eq("user_id", userId)
      .eq("connected_services.name", serviceName)
      .order("event_begin", { ascending: true });
    return { data, error };
  },
};

export const utilityService = {
  // Test database connection
  async testConnection() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);
      return { connected: !error, error };
    } catch (err) {
      return { connected: false, error: err };
    }
  },

  // Check if tables exist
  async checkTables() {
    const tables = [
      "profiles",
      "connected_services",
      "event_credentials",
      "transcriptions",
      "events",
    ];
    const results: Record<string, boolean> = {};

    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select("*").limit(1);
        results[table] = !error;
      } catch (err) {
        results[table] = false;
      }
    }

    return results;
  },

  // Get database stats
  async getDatabaseStats() {
    const stats: Record<string, number> = {};

    // Count records in each table
    const tables = [
      "profiles",
      "connected_services",
      "event_credentials",
      "transcriptions",
      "events",
    ];

    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select("*", { count: "exact", head: true });
        stats[table] = error ? 0 : count ?? 0;
      } catch (err) {
        stats[table] = 0;
      }
    }

    return stats;
  },
};

export const realtimeService = {
  // Subscribe to events changes
  subscribeEvents(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel("events-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  // Subscribe to transcriptions
  subscribeTranscriptions(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel("transcriptions-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transcriptions",
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  // Unsubscribe from channel
  unsubscribe(subscription: any) {
    return supabase.removeChannel(subscription);
  },
};
