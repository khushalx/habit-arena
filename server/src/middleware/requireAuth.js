const { isSupabaseConfigured, supabaseAdmin } = require('../config/supabase')

async function requireAuth(req, res, next) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return res.status(500).json({
      error:
        'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to server/.env.',
    })
  }

  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.replace('Bearer ', '')
    : null

  if (!token) {
    return res.status(401).json({ error: 'Missing Supabase access token.' })
  }

  // Supabase Auth owns login. The API verifies the browser session token here
  // before allowing any challenge or check-in writes.
  const { data, error } = await supabaseAdmin.auth.getUser(token)

  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid or expired session.' })
  }

  const email = data.user.email || ''

  // Keep a simple public users row for joins and app-owned data.
  const { error: profileError } = await supabaseAdmin.from('users').upsert(
    {
      id: data.user.id,
      email,
    },
    { onConflict: 'id' },
  )

  if (profileError) {
    return res.status(500).json({ error: profileError.message })
  }

  req.user = {
    id: data.user.id,
    email,
  }

  return next()
}

module.exports = requireAuth
