import { isMobile } from 'react-device-detect'

const TracksGain = ({ params, trackParams, setParams, trackNodes, context }) => {
  const { id, gain } = params

  const handleSetParams = (e) => {
    const value = Number(e.target.value)
    const id = e.target.parentElement.id
    const property = e.target.name
    // apply value directly to audio
    if (trackNodes !== undefined) {
      switch (property) {
        case 'gain':
          trackNodes.gainNode.gain.linearRampToValueAtTime(value, context.currentTime + 0.01)
          break
        case 'lowpassFreq':
          trackNodes.lowpassFilter.frequency.value = value
          break
        case 'highpassFreq':
          trackNodes.highpassFilter.frequency.value = value
          break
      }
    }

    // update state for ui and audio restart
    const newState = trackParams.map((track) => {
      if (track.id === id) track[property] = value
      return track
    })
    setParams(newState)
  }

  const mobileClass = isMobile ? '-mobile' : ''

  return (
    <div className={`gain-slider-container${mobileClass} ${id}`} id={id}>
      <input
        type="range"
        name={'gain'}
        orient="vert"
        min={0}
        max={0.7}
        step={0.01}
        value={gain}
        onChange={(e) => {
          handleSetParams(e)
        }}></input>
    </div>
  )
}

export default TracksGain
