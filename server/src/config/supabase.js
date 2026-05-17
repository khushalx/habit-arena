const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey)

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
