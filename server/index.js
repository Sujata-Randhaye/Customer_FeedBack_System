import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import feedbackRoutes from './routes/feedback.route.js'
import connectDB from './database/db.js'

dotenv.config({
    path:'./env',
})
connectDB()
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

app.use('/api/feedback',feedbackRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})