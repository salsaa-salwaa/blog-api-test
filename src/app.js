require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')

app.get('/', (req, res) => {
  res.json({
    message: 'Blog API is running'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

module.exports = app