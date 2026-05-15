import React, { useEffect, useState } from 'react'

const DeviceCheck = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(null)

  useEffect(() => {
    const screenCheck = () => window.innerWidth >= 1024
    const uaCheck = () => !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    if (screenCheck() && uaCheck()) {
      setIsAllowed(true)
    } else {
      setIsAllowed(false)
    }
  }, [])

  if (isAllowed === null) return null // or a loading spinner

  if (!isAllowed) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <img src="/logo.png" alt="Logo" className="w-32 h-32" />
        <h2 className='mt-10'>Unsupported Device</h2>
        <p>This website is only accessible on laptops or desktops.</p>
      </div>
    )
  }

  return <>{children}</>
}

export default DeviceCheck