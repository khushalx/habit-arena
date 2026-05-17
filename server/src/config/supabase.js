const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const hasValidSupabaseUrl =
  supabaseUrl &&
  (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://'))

const isSupabaseConfigured = Boolean(
  hasValidSupabaseUrl && supabaseServiceRoleKey,
)

// Real backend keys belong in server/.env. Never expose the service role key.
const supabaseAdmin = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
      },
    })
  : null

module.exports = {
  isSupabaseConfigured,
  supabaseAdmin,
}
