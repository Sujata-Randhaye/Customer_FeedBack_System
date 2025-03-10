import express from 'express'
import { signup, login, logout } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'  // Make sure this import exists

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', protect, logout)

export default router