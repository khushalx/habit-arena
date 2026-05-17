import { useEffect, useState } from 'react'
import DashboardPage from './pages/DashboardPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = {
    '/': LandingPage,
    '/login': LoginPage,
    '/signup': SignupPage,
    '/dashboard': DashboardPage,
  }

  const Page = pages[path] || LandingPage

  return <Page navigate={navigate} currentPath={path} />
}

export default App
