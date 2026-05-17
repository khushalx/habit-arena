const cors = require('cors')
const express = require('express')

const challengeRoutes = require('./routes/challenges')
const checkinRoutes = require('./routes/checkins')
const { isSupabaseConfigured } = require('./config/supabase')

const app = express()
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  }),
)
app.use(express.json())

app.use('/api/challenges', challengeRoutes)
app.use('/api/checkins', checkinRoutes)

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
