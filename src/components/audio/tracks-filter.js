import { isMobile } from 'react-device-detect'

const TracksFilter = ({
  params,
  trackParams,
  setParams,
  trackNodes,
  context,
  trackFilterDefaults,
  showFilter
}) => {
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
          trackNodes.highpassFilter.frequency.value = reverseValue(value)
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

  const { id, lowpassFreq, highpassFreq } = params

  const display = {
    display: showFilter === id ? 'flex' : 'none'
  }

  const { min, max } = trackFilterDefaults

  const reverseValue = (value) => {
    const percent = (value - min) / (max - min)
    return percent * (min - max) + max
  }

  const mobileClass = isMobile ? '-mobile' : ''

  return (
    <div className="filter-cutoff-sliders" style={display}>
      <div className={`filter-reverse-slider-container${mobileClass} ${id}`} id={id}>
        <input
          className={`filter-slider${mobileClass}`}
          orient="horizontal"
          min={min}
          name={'highpassFreq'}
          max={max}
          step={1}
          type="range"
          value={highpassFreq}
          onChange={(e) => {
            handleSetParams(e)
          }}></input>
      </div>
      <div className={`filter-slider-container${mobileClass} ${id}`} id={id}>
        <input
          className={`filter-slider${mobileClass}`}
          min={min}
          max={max}
          orient="horizontal"
          name={'lowpassFreq'}
          step={1}
          type="range"
          value={lowpassFreq}
          onChange={(e) => {
            handleSetParams(e)
          }}></input>
      </div>
    </div>
  )
}

export default TracksFilter
