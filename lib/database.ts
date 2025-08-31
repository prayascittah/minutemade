import { supabase } from "./supabaseClient";

// Types
export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  meeting_type?: "video" | "phone" | "in-person" | "hybrid";
  priority?: "urgent" | "important" | "regular" | "low";
  status?: "scheduled" | "ongoing" | "completed" | "cancelled";
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: "urgent" | "important" | "regular" | "low";
  status?: "todo" | "in_progress" | "completed" | "cancelled";
  due_date?: string;
  completed_at?: string;
  created_by: string;
  assigned_to?: string;
  meeting_id?: string;
  created_at: string;
  updated_at: string;
}

export interface MeetingParticipant {
  id: string;
  meeting_id: string;
  user_id: string;
  role?: "organizer" | "participant" | "optional";
  response?: "pending" | "accepted" | "declined" | "tentative";
  joined_at?: string;
  left_at?: string;
  created_at: string;
}

// Auth Service
export const authService = {
  // Get current user
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user, error };
  },

  // Sign up with email and password
  async signUp(email: string, password: string, userData?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
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

  // Sign in with OAuth (Google, etc.)
  async signInWithOAuth(provider: "google" | "github" | "discord") {
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

  // Reset password
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  },
};

// Profile Service
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

  // Get all profiles (for user search)
  async searchProfiles(query: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, full_name, avatar_url")
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .limit(10);

    return { data, error };
  },
};

// Meeting Service
export const meetingService = {
  // Get all meetings for current user
  async getMeetings(): Promise<{ data: Meeting[] | null; error: any }> {
    const { data, error } = await supabase
      .from("meetings")
      .select(
        `
        *,
        meeting_participants(
          user_id,
          role,
          response,
          profiles(username, full_name, avatar_url)
        )
      `
      )
      .order("start_time", { ascending: true });

    return { data, error };
  },

  // Get meetings by date range
  async getMeetingsByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from("meetings")
      .select("*")
      .gte("start_time", startDate)
      .lte("start_time", endDate)
      .order("start_time", { ascending: true });

    return { data, error };
  },

  // Create new meeting
  async createMeeting(
    meeting: Omit<Meeting, "id" | "created_at" | "updated_at">
  ) {
    const { data, error } = await supabase
      .from("meetings")
      .insert([meeting])
      .select()
      .single();

    return { data, error };
  },

  // Update meeting
  async updateMeeting(meetingId: string, updates: Partial<Meeting>) {
    const { data, error } = await supabase
      .from("meetings")
      .update(updates)
      .eq("id", meetingId)
      .select()
      .single();

    return { data, error };
  },

  // Delete meeting
  async deleteMeeting(meetingId: string) {
    const { error } = await supabase
      .from("meetings")
      .delete()
      .eq("id", meetingId);

    return { error };
  },

  // Add participant to meeting
  async addParticipant(
    meetingId: string,
    userId: string,
    role: string = "participant"
  ) {
    const { data, error } = await supabase
      .from("meeting_participants")
      .insert([
        {
          meeting_id: meetingId,
          user_id: userId,
          role: role,
        },
      ])
      .select()
      .single();

    return { data, error };
  },

  // Update participant response
  async updateParticipantResponse(
    meetingId: string,
    userId: string,
    response: string
  ) {
    const { data, error } = await supabase
      .from("meeting_participants")
      .update({ response })
      .eq("meeting_id", meetingId)
      .eq("user_id", userId)
      .select()
      .single();

    return { data, error };
  },
};

// Task Service
export const taskService = {
  // Get all tasks for current user
  async getTasks(): Promise<{ data: Task[] | null; error: any }> {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
        *,
        assigned_user:profiles!tasks_assigned_to_fkey(username, full_name),
        created_user:profiles!tasks_created_by_fkey(username, full_name),
        meeting:meetings(title)
      `
      )
      .order("created_at", { ascending: false });

    return { data, error };
  },

  // Get tasks by priority
  async getTasksByPriority(priority: string) {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("priority", priority)
      .order("created_at", { ascending: false });

    return { data, error };
  },

  // Create new task
  async createTask(task: Omit<Task, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("tasks")
      .insert([task])
      .select()
      .single();

    return { data, error };
  },

  // Update task
  async updateTask(taskId: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", taskId)
      .select()
      .single();

    return { data, error };
  },

  // Delete task
  async deleteTask(taskId: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    return { error };
  },

  // Mark task as completed
  async completeTask(taskId: string) {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", taskId)
      .select()
      .single();

    return { data, error };
  },
};

// Real-time subscriptions
export const realtimeService = {
  // Subscribe to meeting changes
  subscribeMeetings(callback: (payload: any) => void) {
    return supabase
      .channel("meetings-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "meetings" },
        callback
      )
      .subscribe();
  },

  // Subscribe to task changes
  subscribeTasks(callback: (payload: any) => void) {
    return supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        callback
      )
      .subscribe();
  },

  // Unsubscribe from channel
  unsubscribe(subscription: any) {
    return supabase.removeChannel(subscription);
  },
};

// Utility functions
export const dbUtils = {
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

  // Get database health
  async getHealthCheck() {
    const start = Date.now();
    const { connected, error } = await this.testConnection();
    const responseTime = Date.now() - start;

    return {
      status: connected ? "healthy" : "unhealthy",
      responseTime,
      error,
    };
  },
};
