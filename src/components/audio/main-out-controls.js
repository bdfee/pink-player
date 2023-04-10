const MainOutControls = ({ gain, setGain, handleStart, handleStop, isActive, context, out }) => {
  // handler (audio and state) and ui
  const handleGain = (value) => {
    // apply value directly to audio
    out.gain.linearRampToValueAtTime(value, context.currentTime + 0.1)
    // update state for ui and audio restart
    setGain(value)
  }

  return (
    <div className="audio-main-out">
      {!isActive ? (
        <button className="audio-play-btn" onClick={() => handleStart()}>
          play
        </button>
      ) : (
        <button className="audio-play-btn" onClick={() => handleStop()}>
          stop
        </button>
      )}

      <div className="audio-horizontal-range-container">
        <input
          value={gain}
          orient="horizontal"
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={({ target }) => {
            handleGain(Number(target.value))
          }}></input>
      </div>
    </div>
  )
}

export default MainOutControls
