const ActiveToggle = ({ isRunning, setIsRunning }) => {
  const handleStart = () => setIsRunning(!isRunning)

  return (
    <button className="start-btn" onClick={handleStart}>
      {isRunning ? 'stop' : 'start'}
    </button>
  )
}

export default ActiveToggle
