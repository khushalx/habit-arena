require('dotenv').config()

const app = require('./app')

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`Habit Arena API running on http://localhost:${PORT}`)
})
