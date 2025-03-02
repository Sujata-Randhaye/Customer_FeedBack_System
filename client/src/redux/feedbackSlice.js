import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//localhost
// const API_URL = 'http://localhost:3000/api/auth'
//production
const API_URL = 'https://customer-feedback-api.onrender.com/api/feedback';

export const submitFeedback = createAsyncThunk(
  'feedback/submit',
  async (feedbackData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
      const response = await axios.post(API_URL, feedbackData, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to submit feedback')
    }
  }
)

export const fetchFeedback = createAsyncThunk(
  'feedback/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
      const response = await axios.get(API_URL, config)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch feedback')
    }
  }
)

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    clearFeedback: (state) => {
      state.items = []
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.unshift(action.payload) // Add new feedback at the beginning
        state.error = null
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchFeedback.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { clearFeedback } = feedbackSlice.actions
export default feedbackSlice.reducer 