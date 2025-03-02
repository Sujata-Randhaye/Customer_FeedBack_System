import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3000//api/feedback'

export const submitFeedback = createAsyncThunk(
  'feedback/submit',
  async (feedbackData) => {
    const response = await axios.post(API_URL, feedbackData)
    return response.data
  }
)

export const fetchFeedback = createAsyncThunk(
  'feedback/fetch',
  async () => {
    const response = await axios.get(API_URL)
    return response.data
  }
)

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.push(action.payload)
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
  }
})

export default feedbackSlice.reducer 