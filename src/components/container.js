import { useState } from 'react'
import Audio from './audio/index'
import ActiveToggle from './active-toggle'

const Container = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [showSection, setShowSection] = useState(true)

  return (
    <div className="grid">
      <div className="main-display">
        <Audio isRunning={isRunning} showSection={showSection} />
      </div>
      <div className="start row">
        <ActiveToggle
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          setShowSection={setShowSection}
          showSection={showSection}
        />
      </div>
    </div>
  )
}

export default Container
