// src/store/authStore.js
import { create } from 'zustand';
import { supabase } from '../utils/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  isLoading: true,   // true on first load while we check session

  // ── Init: called once on app mount ──────────────────────────────────────
  init: async () => {
    // Get existing session
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, session, isLoading: false });

    // Listen for auth changes (login / logout / token refresh)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, session });
    });
  },

  // ── Register ─────────────────────────────────────────────────────────────
  register: async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, // stored in user_metadata
      },
    });
    if (error) throw error;
    return data;
  },

  // ── Login ─────────────────────────────────────────────────────────────────
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // ── Logout ────────────────────────────────────────────────────────────────
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  // ── Helpers ───────────────────────────────────────────────────────────────
  getUsername: () => {
    const user = get().user;
    return user?.user_metadata?.username || user?.email?.split('@')[0] || 'ผู้เรียน';
  },

  isLoggedIn: () => !!get().user,
}));
