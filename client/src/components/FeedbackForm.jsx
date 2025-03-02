import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitFeedback } from './redux/feedbackSlice'
const FeedbackForm = () => {
    const dispatch = useDispatch()
    const feedbackList = useSelector(state => state.feedback.items)
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      userName: ''
    })
  
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
      <div className="app-container">
        <h1>Product Feedback System</h1>
        
        <div className="feedback-form">
          <h2>Submit Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Brief title for your feedback"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Detailed feedback description"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="userName">Your Name (Optional)</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your name (optional)"
              />
            </div>
  
            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </form>
        </div>
  
        <div className="feedback-list">
          <h2>Recent Feedback</h2>
          {feedbackList.map((feedback, index) => (
            <div key={index} className="feedback-card">
              <h3>{feedback.title}</h3>
              <p>{feedback.description}</p>
              {feedback.userName && (
                <p className="user-name">Submitted by: {feedback.userName}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
}

export default FeedbackForm
