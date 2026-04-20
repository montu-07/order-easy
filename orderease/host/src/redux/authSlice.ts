import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Base URL
const API_BASE_URL = 'http://localhost:3001/api'

// Types
interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthResponse {
  message: string
  data: User
  token: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  success: string | null
  error: string | null
}

// Async thunks
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData: { name: string; email: string; password: string; role: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data: AuthResponse = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || 'Signup failed')
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      return data
    } catch (error) {
      return rejectWithValue('Network error. Please try again.')
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data: AuthResponse = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed')
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      return data
    } catch (error) {
      return rejectWithValue('Network error. Please try again.')
    }
  }
)

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  success: null,
  error: null,
}

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSuccess: (state) => {
      state.success = null
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.success = null
      state.error = null
      localStorage.removeItem('token')
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.message
        state.user = action.payload.data
        state.token = action.payload.token
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.message
        state.user = action.payload.data
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearSuccess, logout, setCredentials } = authSlice.actions
export default authSlice.reducer
