const express = require('express')

const { supabaseAdmin } = require('../config/supabase')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.post('/', requireAuth, async (req, res) => {
  const challengeId = req.body.challenge_id

  if (!challengeId) {
    return res.status(400).json({ error: 'challenge_id is required.' })
  }

  const { data: challenge, error: challengeError } = await supabaseAdmin
    .from('challenges')
    .select('*')
    .eq('id', challengeId)
    .maybeSingle()

  if (challengeError) {
    return res.status(500).json({ error: challengeError.message })
  }

  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found.' })
  }

  const isPlayer =
    challenge.creator_id === req.user.id || challenge.opponent_id === req.user.id

  if (!isPlayer) {
    return res.status(403).json({ error: 'You are not in this challenge.' })
  }

  if (challenge.status !== 'active') {
    return res.status(400).json({ error: 'Only active challenges can be checked in.' })
  }

  const today = new Date().toISOString().slice(0, 10)

  const { data: existingCheckin, error: existingError } = await supabaseAdmin
    .from('checkins')
    .select('id')
    .eq('challenge_id', challengeId)
    .eq('user_id', req.user.id)
    .eq('checkin_date', today)
    .maybeSingle()

  if (existingError) {
    return res.status(500).json({ error: existingError.message })
  }

  if (existingCheckin) {
    return res.status(409).json({ error: 'You already checked in today.' })
  }

  const { data, error } = await supabaseAdmin
    .from('checkins')
    .insert({
      challenge_id: challengeId,
      user_id: req.user.id,
      checkin_date: today,
    })
    .select('*')
    .single()

  if (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'You already checked in today.' })
    }

    return res.status(500).json({ error: error.message })
  }

  return res.status(201).json({ checkin: data })
})

module.exports = router
