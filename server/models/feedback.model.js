import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userName: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now }
})

export const Feedback = mongoose.model('Feedback', feedbackSchema)