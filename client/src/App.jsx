import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import FeedbackForm from './components/FeedbackForm'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to signup */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/feedback" 
          element={
            <ProtectedRoute>
              <FeedbackForm />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App