import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [IsUserLoggedIn, setLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState()
  const [authLoading, setAuthLoading] = useState(true)

  const isLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoggedIn(false)
      } else {
        const response = await axios.get(import.meta.env.VITE_API_BASE_URL+'/api/auth/login', {
          headers: { Authorization: token },
        })
        if (response.data) {
          setUserDetails(response.data)
          setLoggedIn(true)
        } else {
          logout()
        }
      }
    } catch (error) {
      console.error('Profile fetch failed', error)
      setLoggedIn(false)
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    setUserDetails(null)
  }

  return (
    <AuthContext.Provider value={{ IsUserLoggedIn, userDetails, logout, setLoggedIn, isLoggedIn, authLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};
