const crypto = require('crypto')
const express = require('express')

const { supabaseAdmin } = require('../config/supabase')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

function ensureSupabase(res) {
  if (!supabaseAdmin) {
    res.status(500).json({
      error:
        'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to server/.env.',
    })
    return false
  }

  return true
}

function getAppUrl(req) {
  return process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`
}

function cleanEmail(email) {
  return String(email || '').trim().toLowerCase()
}

router.post('/create', requireAuth, async (req, res) => {
  const habitName = String(req.body.habit_name || '').trim()
  const durationDays = Number(req.body.duration_days)
  const opponentEmail = cleanEmail(req.body.opponent_email)

  if (!habitName || !durationDays || !opponentEmail) {
    return res.status(400).json({
      error: 'habit_name, duration_days, and opponent_email are required.',
    })
  }

  if (durationDays < 1 || durationDays > 365) {
    return res.status(400).json({
      error: 'duration_days must be between 1 and 365.',
    })
  }

  if (opponentEmail === cleanEmail(req.user.email)) {
    return res.status(400).json({
      error: 'Pick an opponent other than yourself.',
    })
  }

  const inviteToken = crypto.randomUUID()

  const { data, error } = await supabaseAdmin
    .from('challenges')
    .insert({
      creator_id: req.user.id,
      habit_name: habitName,
      duration_days: durationDays,
      opponent_email: opponentEmail,
      invite_token: inviteToken,
      status: 'pending',
    })
    .select('*')
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(201).json({
    challenge: data,
    invite_link: `${getAppUrl(req)}/invite/${inviteToken}`,
  })
})

router.get('/invite/:token', async (req, res) => {
  if (!ensureSupabase(res)) return

  const { data, error } = await supabaseAdmin
    .from('challenges')
    .select(
      'id, habit_name, duration_days, opponent_email, status, invite_token, accepted_at, start_date, created_at, creator:users!challenges_creator_id_fkey(email)',
    )
    .eq('invite_token', req.params.token)
    .maybeSingle()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  if (!data) {
    return res.status(404).json({ error: 'Invite not found.' })
  }

  return res.json({ challenge: data })
})

router.post('/accept/:token', requireAuth, async (req, res) => {
  const { data: challenge, error: findError } = await supabaseAdmin
    .from('challenges')
    .select('*')
    .eq('invite_token', req.params.token)
    .maybeSingle()

  if (findError) {
    return res.status(500).json({ error: findError.message })
  }

  if (!challenge) {
    return res.status(404).json({ error: 'Invite not found.' })
  }

  if (challenge.status !== 'pending') {
    return res.status(400).json({ error: 'This invite is no longer pending.' })
  }

  if (cleanEmail(req.user.email) !== cleanEmail(challenge.opponent_email)) {
    return res.status(403).json({
      error: `This invite is for ${challenge.opponent_email}. Log in with that email to accept it.`,
    })
  }

  const today = new Date().toISOString().slice(0, 10)

  const { data, error } = await supabaseAdmin
    .from('challenges')
    .update({
      opponent_id: req.user.id,
      status: 'active',
      accepted_at: new Date().toISOString(),
      start_date: today,
    })
    .eq('id', challenge.id)
    .select('*')
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json({ challenge: data })
})

router.get('/my', requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('challenges')
    .select(
      '*, creator:users!challenges_creator_id_fkey(email), opponent:users!challenges_opponent_id_fkey(email), checkins(id, user_id, checkin_date)',
    )
    .or(`creator_id.eq.${req.user.id},opponent_id.eq.${req.user.id}`)
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.json({ challenges: data || [] })
})

module.exports = router
