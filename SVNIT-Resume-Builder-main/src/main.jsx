import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
import DeviceCheck from './components/custom/DeviceCheck.jsx'
import { AuthProvider } from './auth/Auth.jsx'
import ForgotPassword from './auth/ForgetPass.jsx'
import ResetPassword from './auth/ResetPassword.jsx'
import ErrorPage from './ErrorPage/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      },
    ]
  },
  ,
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  }, {
    path: '/reset-password/:token',
    element: <ResetPassword />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <DeviceCheck>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </DeviceCheck>
  ,
)
