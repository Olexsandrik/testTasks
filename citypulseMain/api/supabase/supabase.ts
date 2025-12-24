import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://veirszuesexfvyzmyivb.supabase.co";
const supabaseAnonKey = "sb_publishable_7mEN9ABKCryvURTqggd5kg_y4sJgPVq";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false, // Disable for React Native
	},
});

export default supabase;
