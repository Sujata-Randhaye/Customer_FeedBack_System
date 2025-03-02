import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitFeedback,fetchFeedback} from '../redux/feedbackSlice.js'
import { logout } from '../redux/authSlice.js'
const FeedbackForm = () => {
  const dispatch = useDispatch()
  const feedbackList = useSelector(state => state.feedback.items)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userName: ''
  })
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  useEffect(() => {
    dispatch(fetchFeedback())
  }, [dispatch])
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(submitFeedback(formData))
    setFormData({ title: '', description: '', userName: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Product Feedback System
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Submit Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Brief title for your feedback"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Detailed feedback description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="userName" 
              className="block text-sm font-medium text-gray-700"
            >
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Recent Feedback
        </h2>
        {feedbackList.map((feedback, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feedback.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {feedback.description}
            </p>
            {feedback.userName && (
              <p className="text-sm text-gray-500 italic">
                Submitted by: {feedback.userName}
              </p>
            )}
          </div>
        ))}
        {feedbackList.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No feedback submitted yet
          </p>
        )}
      </div>
    </div>
  )
}

export default FeedbackForm
