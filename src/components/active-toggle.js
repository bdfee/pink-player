const ActiveToggle = ({ isRunning, setIsRunning }) => {
  const handleStart = () => setIsRunning(!isRunning)

  const stopStyle = { backgroundColor: 'black', color: 'white' }
  const startStyle = { backgroundColor: 'black', color: 'white' }

  return (
    <button className="start-btn" onClick={handleStart} style={isRunning ? stopStyle : startStyle}>
      {isRunning ? 'stop' : 'start'}
    </button>
  )
}

export default ActiveToggle
