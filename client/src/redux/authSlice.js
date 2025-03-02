import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData)
    localStorage.setItem('token', response.data.token)
    return response.data
  }
)

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/login`, credentials)
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          return response.data
        } else {
          return rejectWithValue('Invalid response from server')
        }
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || 'Login failed. Please check your credentials.'
        )
      }
    }
  )

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
        state.user = null
        state.token = null
        state.status = 'idle'
        state.error = null
        localStorage.removeItem('token')
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading'
        state.error=null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.error=null
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        state.error=null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer