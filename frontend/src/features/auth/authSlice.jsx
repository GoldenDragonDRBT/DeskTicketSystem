import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null, // Checking State property of getting user from the local storage
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register new user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    // console.log(user)
    try {
      return await authService.register(user) // Here we call the register
    } catch (error) { // When the register is an existing user the message will be send from the backend
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue(message) // Rejected and then put it in the payload
      // So if sum thing gets wrong the message will passed in ".rejectWithValue(message)"
    }
  }
)

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    // console.log(user)
    try {
      return await authService.login(user) // Here we call the register
    } catch (error) { // When the register is an existing user the message will be send from the backend
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue(message) // Rejected and then put it in the payload
      // So if sum thing gets wrong the message will passed in ".rejectWithValue(message)"
    }
  }
)

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        // If fulfilled then are user gets put in the ".payload"
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        // If fulfilled then are user gets put in the ".payload"
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => { // To clear it out from our state 
        state.user = null // In Redux toolkit this state represent by "auth/logout/fulfilled"
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer

/* Note:
If we create sum thing inside the "reducer" then we need to "export" it like we did:
"export const { reset } = authSlice.actions"
*/