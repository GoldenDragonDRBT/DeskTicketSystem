import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux' // For selecting the user from our state for "Redux" to see if we logged in or not.

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  // Once we get the status, once its loaded we find if user logged in or not and then we set it to false.

  const { user } = useSelector((state) => state.auth)  // Get the user from the "state.auth"

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setCheckingStatus(false)
  }, [user]) // Pass in user as a dependence

  return { loggedIn, checkingStatus }
}