"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/lib/simple-database";

export interface UseAuthReturn {
  user: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: Profile | null) => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Auth error:", error);
          setUser(null);
          return;
        }
        const isUserAuthenticated = !!(
          data?.user?.user_metadata ||
          data?.user?.created_at ||
          data?.user?.updated_at
        );

        if (!isUserAuthenticated) {
          console.log("User not authenticated");
          setUser(null);
          return;
        }

        const userid = data?.user?.id;

        if (userid) {
          const userProfile: Profile = {
            id: userid,
            username: data.user.user_metadata?.username || "User",
            email: data.user.email || undefined,
            avatar_url: data.user.user_metadata?.avatar_url || null,
            created_at: data.user.created_at || new Date().toISOString(),
            updated_at: data.user.updated_at || new Date().toISOString(),
          };
          setUser(userProfile);
        } else {
          console.log("No user ID found");
          setUser(null);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user?.id) {
        // Use session user data directly
        const userProfile: Profile = {
          id: session.user.id,
          username: session.user.user_metadata?.username || "User",
          email: session.user.email || undefined,
          avatar_url: session.user.user_metadata?.avatar_url || null,
          created_at: session.user.created_at || new Date().toISOString(),
          updated_at: session.user.updated_at || new Date().toISOString(),
        };
        setUser(userProfile);
        setLoading(false);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    setUser,
  };
};
