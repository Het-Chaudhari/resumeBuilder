import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/Auth'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import axios from 'axios'

function Header() {
  const navigate = useNavigate()
  const { logout, IsUserLoggedIn } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/auth/sign-in')
  }

  const handleChangePassword = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + '/api/auth/change-password',
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      )
      setSuccess(res.data.message)
      setOldPassword('')
      setNewPassword('')
      setTimeout(() => setOpen(false), 1000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-3 px-5 flex justify-between shadow-md items-center' id="no-print">
      <a href='/'><img src='logo.png' className='cursor-pointer size-16' width={100} height={100} /></a>

      {IsUserLoggedIn ? (
        <div className='flex gap-2 items-center'>
          <Link to='/dashboard'>
            <Button>Dashboard</Button>
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">Change Password</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleChangePassword()
                }}
                className="grid gap-4 py-2"
              >
                <Input
                  type='password'
                  placeholder='Old Password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  type='password'
                  placeholder='New Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? 'Changing...' : 'Submit'}
                </Button>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                {success && <p className='text-green-600 text-sm'>{success}</p>}
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className='text-black' onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <Link to='/auth/sign-in'>
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  )
}

export default Header