import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body
  
      // Input validation
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Please provide both email and password' 
        })
      }
  
      // Find user
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ 
          message: 'Invalid email or password' 
        })
      }
  
      // Check password
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        return res.status(401).json({ 
          message: 'Invalid email or password' 
        })
      }
  
      // Generate token
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
      )
  
      // Send response
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ 
        message: 'Server error during login. Please try again.' 
      })
    }
  }

export const logout = async (req, res) => {
    try {
      // Since we're using JWT, we don't need to do anything server-side
      // The client will remove the token
      res.json({ message: 'Logged out successfully' })
    } catch (error) {
      res.status(500).json({ 
        message: 'Error logging out', 
        error: error.message 
      })
    }
  }