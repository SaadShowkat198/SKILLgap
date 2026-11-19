// ==========================================================
// SUPABASE CLIENT
// The publishable key is safe to expose in the browser.
// Security is enforced by Row Level Security (RLS) on every table.
// NEVER put an sb_secret_... / service_role key in client code.
// ==========================================================
const SUPABASE_URL = 'https://pnmynhwcksqpbnzbjzue.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ki6JxGuu0Idz5y1Al6pDNw_zjBF1lho';

const supabaseClient = window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    })
    : null;

if (!supabaseClient) {
    console.error('Supabase library failed to load. Accounts are unavailable.');
}
