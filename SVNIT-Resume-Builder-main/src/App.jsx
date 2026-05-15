import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { useAuth } from './auth/Auth'
import './App.css'

function App() {
  const { IsUserLoggedIn, authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/logo.png" alt="Logo" className="w-32 h-32" />
      </div>
    )
  }
  if (!IsUserLoggedIn) {
    return <Navigate to="/auth/sign-in" />
  }
  
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}

export default App