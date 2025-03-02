import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import authRoutes from './routes/auth.route.js'
import feedbackRoutes from './routes/feedback.route.js'

// Load environment variables
dotenv.config()

// Initialize express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/feedback', feedbackRoutes)

const PORT = process.env.PORT || 3000

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()