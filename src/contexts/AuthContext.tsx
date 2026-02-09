import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    role?: string;
    [key: string]: any;
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshSession: () => Promise<Session | null | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const initialized = useRef(false);

    // Helper to fetch profile
    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.warn('⚠️ Auth: Profile fetch issue:', error.message);
            } else {
                setProfile(data);
            }
        } catch (err) {
            console.error('❌ Auth: Profile exception:', err);
        }
    };

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        let mounted = true;

        // 1. Strict Resolution Timeout (6 seconds)
        const timeoutId = setTimeout(() => {
            if (loading && mounted) {
                console.warn('⚠️ Auth: Resolution timed out - forcing loading=false');
                setLoading(false);
            }
        }, 6000);

        async function initializeAuth() {
            try {
                // console.log('🔄 Auth: Resolving session...');
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    // Suppress "Session from URL is stale" error as it's common and harmless
                    if (!error.message?.includes('stale')) {
                        console.error('❌ Auth: Session init error', error.message);
                    }
                }

                if (mounted) {
                    // If we have a session, use it
                    if (data?.session) {
                        setSession(data.session);
                        setUser(data.session.user);

                        // Clean up hash if needed (legacy OAuth cleanup)
                        if (window.location.hash && window.location.hash.includes('access_token=')) {
                            window.history.replaceState(null, '', window.location.pathname);
                        }

                        await fetchProfile(data.session.user.id);
                    }
                }
            } catch (err: any) {
                console.error('❌ Auth: Critical init failure', err);
            } finally {
                if (mounted) {
                    setLoading(false);
                    clearTimeout(timeoutId);
                }
            }
        }

        initializeAuth();

        // 3. Subscription Management
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            if (!mounted) return;
            console.log(`🔔 Auth Event: ${event}`);

            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
                setSession(currentSession);
                setUser(currentSession?.user ?? null);
                if (currentSession?.user) await fetchProfile(currentSession.user.id);
            }

            if (event === 'SIGNED_OUT') {
                setSession(null);
                setUser(null);
                setProfile(null);
            }

            setLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
            clearTimeout(timeoutId);
        };
    }, []);

    const signOut = async () => {
        try {
            // Do NOT set loading(true) here. It triggers ProtectedRoute loader and unmounts the app,
            // which can confuse the user ("buffering") or race with navigation.
            // We want an immediate redirect via the User state change.

            // 1. Optimistic Cleanup
            setSession(null);
            setUser(null);
            setProfile(null);

            // 2. Perform Supabase SignOut (background)
            const { error } = await supabase.auth.signOut();
            if (error) console.error('Error signing out:', error);
        } catch (err) {
            console.error('Unexpected error during sign out:', err);
        }
    };

    const refreshSession = async () => {
        const { data, error } = await supabase.auth.getSession(); // getSession is better than refreshSession for just checking state
        if (error) throw error;

        if (data.session) {
            setSession(data.session);
            setUser(data.session.user);
            await fetchProfile(data.session.user.id);
            return data.session;
        }
    };

    const value = {
        session,
        user,
        profile,
        loading,
        signOut,
        refreshSession
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
