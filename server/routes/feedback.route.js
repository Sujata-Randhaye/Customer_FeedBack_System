import express from 'express'
import { submitFeedback, getFeedbackList } from '../controllers/feedback.controller.js'
import { protect } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/',protect, submitFeedback)
router.get('/',protect, getFeedbackList)  // Add this line for getting feedback list

export default router