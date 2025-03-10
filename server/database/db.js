import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables')
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // These options help ensure reliable connections
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error('MongoDB connection error:', error.message)
        process.exit(1)
    }
}

export default connectDB