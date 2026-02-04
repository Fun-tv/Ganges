import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient'; // Ensure correct import path

/**
 * Standardized Response Wrapper
 */
export type DbResult<T> =
    | { data: T; error: null }
    | { data: null; error: PostgrestError | Error };

/**
 * Generic Helper for Safe Database Operations
 */
export async function safeQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: any }>
): Promise<DbResult<T>> {
    try {
        const { data, error } = await queryFn();
        if (error) throw error;
        return { data: data as T, error: null };
    } catch (err: any) {
        console.error('Database Query Error:', err.message || err);
        return { data: null, error: err };
    }
}

/**
 * DATABASE QUERY HELPERS
 */
export const db = {
    // GENERIC SELECT
    getById: async (table: string, id: string) => {
        return safeQuery(async () =>
            supabase.from(table).select('*').eq('id', id).single()
        );
    },

    // GENERIC INSERT
    insert: async (table: string, payload: any) => {
        return safeQuery(async () =>
            supabase.from(table).insert(payload).select().single()
        );
    },

    // GENERIC UPDATE
    update: async (table: string, id: string, payload: any) => {
        return safeQuery(async () =>
            supabase.from(table).update(payload).eq('id', id).select().single()
        );
    },

    // GENERIC DELETE
    delete: async (table: string, id: string) => {
        return safeQuery(async () =>
            supabase.from(table).delete().eq('id', id)
        );
    },

    // SPECIFIC HELPERS (Examples)
    users: {
        getProfile: (userId: string) => db.getById('user_profiles', userId),
        updateProfile: (userId: string, data: any) => db.update('user_profiles', userId, data),
    },

    packages: {
        listMine: async () => {
            return safeQuery(async () =>
                supabase.from('packages').select('*').order('created_at', { ascending: false })
            )
        }
    }
};
