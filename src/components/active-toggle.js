const ActiveToggle = ({ isRunning, setIsRunning, setShowSection }) => {
  const handleStart = () => {
    setIsRunning(!isRunning)
    setShowSection(!isRunning ? 'audio' : '')
  }

  const stopStyle = { backgroundColor: 'black', color: 'white' }
  const startStyle = { backgroundColor: 'black', color: 'white' }

  return (
    <button className="start-btn" onClick={handleStart} style={isRunning ? stopStyle : startStyle}>
      {isRunning ? 'stop' : 'start'}
    </button>
  )
}

export default ActiveToggle
