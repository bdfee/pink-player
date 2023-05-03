import { useState } from 'react'
import Audio from './audio/index'
import ActiveToggle from './active-toggle'

const Container = () => {
  const [isRunning, setIsRunning] = useState(false)

  return (
    <>
      <div>
        <Audio isRunning={isRunning} />
      </div>
      <div>
        <ActiveToggle isRunning={isRunning} setIsRunning={setIsRunning} />
      </div>
    </>
  )
}

export default Container
