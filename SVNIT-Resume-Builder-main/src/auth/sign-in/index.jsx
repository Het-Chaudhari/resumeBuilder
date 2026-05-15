import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from '../../components/ui/button'
import { useAuth } from '../Auth'
import { Dialog, DialogTrigger, DialogContent } from '../../components/ui/dialog'

function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(import.meta.env.VITE_API_BASE_URL + '/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      if (res.status === 200) {
        await isLoggedIn()
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Wrong Email or Password, Please Try Again')
    } finally {
      setLoading(false)
    }
  }

  // Forgot password state (inside modal)
  const [fpEmail, setFpEmail] = useState('')
  const [fpMessage, setFpMessage] = useState('')
  const [fpError, setFpError] = useState('')
  const [fpLoading, setFpLoading] = useState(false)

  const handleForgotPassword = async () => {
    setFpMessage('')
    setFpError('')
    setFpLoading(true)
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + '/api/auth/forgot-password',
        { email: fpEmail }
      )
      setFpMessage(res.data.message || 'Reset link sent!')
    } catch (err) {
      setFpError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setFpLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute z-0 w-full h-full bg-none bg-no-repeat"
        style={{
          backgroundImage: "url('/svnit_entrance.jpg')",
          backgroundPosition: "center top",
          backgroundSize: "100vw 100vh"
        }}
      />
      <div className="absolute inset-0 z-10 bg-black bg-opacity-60" />
      <div className="flex min-h-screen relative z-20">
        <div
          className="w-1/2 bg-no-repeat bg-contain bg-center"
          style={{
            backgroundImage: "url('/logo.png')",
            backgroundSize: '70%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="w-1/2 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white flex flex-col items-center justify-center shadow-lg rounded-xl p-8 w-full max-w-md"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 mb-4"
            />

            <h2 className="text-xl font-semibold text-[#004d99]">Sign in to SVNIT Resume Builder</h2>
            <p className="text-sm text-gray-500 mt-1 mb-6 text-center">
              Welcome back! Please sign in to continue
            </p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-4 px-4 py-2 border rounded"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mb-2 px-4 py-2 border rounded"
            />

            {/* Forgot Password Dialog Trigger */}
            <Dialog>
              <div className="w-full flex justify-end mb-4">
                <DialogTrigger asChild>
                  <button type="button" className="text-sm text-[#004d99] hover:text-[#003366] hover:underline">
                    Forgot Password?
                  </button>
                </DialogTrigger>
              </div>

              <DialogContent className="max-w-md w-full">
                <h2 className="text-xl font-bold mb-2">Forgot Password</h2>
                <div
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <input
                    type="email"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter your email"
                    value={fpEmail}
                    onChange={(e) => setFpEmail(e.target.value)}
                    required
                  />
                  {fpMessage && <p className="text-green-600 text-center mb-4">{fpMessage}</p>}
                  {fpError && <p className="text-red-600 text-center mb-4">{fpError}</p>}
                  <button
                    type="submit"
                    className="w-full bg-[#004d99] hover:bg-[#003366] text-white p-2 rounded"
                    onClick={handleForgotPassword}
                    disabled={fpLoading}
                  >
                    {fpLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </DialogContent>
            </Dialog>

            {error && (
              <p className="text-red-500 mb-4 text-center text-sm">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004d99] hover:bg-[#003366] text-white"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInPage