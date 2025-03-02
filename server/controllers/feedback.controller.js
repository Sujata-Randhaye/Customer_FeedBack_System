import { body, validationResult } from 'express-validator'
import {Feedback} from '../models/feedback.model.js'
// Validation middleware
const validateFeedback = [
    body('title').trim().isLength({ min: 3 }).escape(),
    body('description').trim().isLength({ min: 10 }).escape(),
    body('userName').optional().trim().escape()
  ]
  
  // Routes
  const submitFeedback=async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const user=req.body
      const feedback = new Feedback(
        {
          ...req.body,
        }
        )
      await feedback.save()
      res.status(201).json(feedback)
    } catch (error) {
      res.status(500).json({ error: 'Error submitting feedback' })
    }
  }
  
  const getFeedbackList=async (req, res) => {
    try {
      const feedback = await Feedback.find()
        .populate('user', 'name email') // Populate user details
        .sort({ createdAt: -1 })
      res.json(feedback)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching feedback' })
    }
  }
  export {submitFeedback,getFeedbackList}