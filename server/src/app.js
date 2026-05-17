const cors = require('cors')
const express = require('express')

const { isSupabaseConfigured } = require('./config/supabase')

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
)
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    name: 'Habit Arena API',
    status: 'running',
    supabaseConfigured: isSupabaseConfigured,
  })
})

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Habit Arena API is healthy',
  })
})

module.exports = app
