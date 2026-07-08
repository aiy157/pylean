// src/store/authStore.js
import { create } from 'zustand';
import { supabase } from '../utils/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  isLoading: true,   // true on first load while we check session

  isAdmin: false,

  // ── Init: called once on app mount ──────────────────────────────────────
  init: async () => {
    // Get existing session
    const { data: { session } } = await supabase.auth.getSession();
    
    let adminStatus = false;
    if (session?.user?.id) {
      const { data } = await supabase.from('profiles').select('is_admin').eq('id', session.user.id).maybeSingle();
      adminStatus = data?.is_admin === true;
    }

    set({ user: session?.user ?? null, session, isAdmin: adminStatus, isLoading: false });

    // Listen for auth changes (login / logout / token refresh)
    supabase.auth.onAuthStateChange(async (_event, session) => {
      let updatedAdminStatus = false;
      if (session?.user?.id) {
        const { data } = await supabase.from('profiles').select('is_admin').eq('id', session.user.id).maybeSingle();
        updatedAdminStatus = data?.is_admin === true;
      }
      set({ user: session?.user ?? null, session, isAdmin: updatedAdminStatus });
      
      // Sync with adminStore if needed (we can dynamically import it or just let adminStore pull from authStore)
    });
  },

  // ── Register ─────────────────────────────────────────────────────────────
  register: async (email, password, username) => {
    // 1. Check if username is taken in profiles table
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST205') {
      // PGRST205 means table doesn't exist yet (user hasn't run the SQL). We ignore it to not break the app.
      console.warn('Error checking username:', checkError);
    }
    if (existingUser) {
      throw new Error('USERNAME_TAKEN');
    }

    // 2. Proceed with signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        // Redirect URL after email confirmation — uses current domain automatically
        // so it works on localhost (dev) AND production (Vercel) without hardcoding
        emailRedirectTo: `${window.location.origin}/dashboard`,
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
    set({ user: null, session: null, isAdmin: false });
  },

  // ── Password Reset ────────────────────────────────────────────────────────
  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) throw error;
  },

  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },

  // ── Helpers ───────────────────────────────────────────────────────────────
  getUsername: () => {
    const user = get().user;
    return user?.user_metadata?.username || user?.email?.split('@')[0] || 'ผู้เรียน';
  },

  isLoggedIn: () => !!get().user,
}));
