import axios from 'axios'
import { store } from './src/redux/store.js'
import { logout } from './src/redux/authSlice.js'

// Add request interceptor
const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
const responseInterceptor = axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

// Export function to clear interceptors
export const clearInterceptors = () => {
  axios.interceptors.request.eject(requestInterceptor)
  axios.interceptors.response.eject(responseInterceptor)
}