import { getPercentageInRange } from '../../helpers/visuals.helpers'
import { filterRanges } from '../../helpers/trackDefaults'

const Circle = ({ track, cx }) => {
  console.log(track)

  const {
    highpass: { min: hpMin, max: hpMax },
    lowpass: { min: lpMin, max: lpMax }
  } = filterRanges[track.id]

  const highBand = getPercentageInRange(hpMin, hpMax, track.highpassFreq)
  const lowBand = getPercentageInRange(lpMin, lpMax, track.lowpassFreq)
  const gradientId = track.id + '-gradient'

  return (
    <>
      <linearGradient id={gradientId}>
        <stop offset="0%" stopOpacity={highBand} id={gradientId}></stop>
        <stop offset="50%" id={gradientId}></stop>
        <stop offset="100%" stopOpacity={lowBand} id={gradientId}></stop>
      </linearGradient>
      <ellipse cx={cx} cy="50" ry={track.gain * 100} fill={`url(#${gradientId})`} />
    </>
  )
}

export default Circle
