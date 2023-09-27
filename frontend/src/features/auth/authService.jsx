import axios from 'axios'

const API_URL = '/api/users'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  // Implementing the same way like we did in Postman "api/users"

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data // Which will be "user.data" and "token"
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)
  // Implementing the same way like we did in Postman "api/users"

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data // Which will be "user.data" and "token"
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login
}

export default authService