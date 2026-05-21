import { useState } from 'react'
import Welcome  from './screens/Welcome.jsx'
import Waitlist from './screens/Waitlist.jsx'
import Success  from './screens/Success.jsx'
import Explore  from './screens/Explore.jsx'

export default function App() {
  const [screen,   setScreen]   = useState('welcome')
  const [position, setPosition] = useState(null)

  const goTo = (s) => {
    setScreen(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSuccess = (pos) => {
    setPosition(pos)
    goTo('success')
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {screen === 'welcome'  && <Welcome  goTo={goTo} />}
      {screen === 'waitlist' && <Waitlist goTo={goTo} onSuccess={handleSuccess} />}
      {screen === 'success'  && <Success  goTo={goTo} position={position} />}
      {screen === 'explore'  && <Explore  goTo={goTo} />}
    </div>
  )
}
