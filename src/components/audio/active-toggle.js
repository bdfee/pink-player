const ActiveToggle = ({ isRunning, setIsRunning }) => (
  <div className="start">
    <button className="start-btn" onClick={() => setIsRunning(!isRunning)}>
      {isRunning ? 'stop' : 'start'}
    </button>
  </div>
)

export default ActiveToggle
