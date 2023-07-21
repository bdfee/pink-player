import { isMobile } from 'react-device-detect'
import { reverseHighpassValue } from '../../helpers/audioHelpers'

const TracksFilter = ({
  params,
  trackParams,
  setParams,
  trackNodes,
  context,
  rangeDefaults,
  showFilter
}) => {
  const {
    highpass: { min: hpMin, max: hpMax },
    lowpass: { min: lpMin, max: lpMax }
  } = rangeDefaults

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
          trackNodes.highpassFilter.frequency.value = reverseHighpassValue(value, hpMin, hpMax)
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

  const mobileClass = isMobile ? '-mobile' : ''

  return (
    <div className="filter-cutoff-sliders" style={display}>
      <div className={`filter-reverse-slider-container${mobileClass} ${id}`} id={id}>
        <input
          className={`filter-slider${mobileClass}`}
          orient="horizontal"
          min={hpMin}
          name={'highpassFreq'}
          max={hpMax}
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
          min={lpMin}
          max={lpMax}
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
