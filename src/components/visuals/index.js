import Circle from './circle'

const Visuals = ({ trackParams }) => {
  return (
    <div className="visuals">
      <svg height="200" width="100%" viewBox="0 0 100 50">
        {trackParams.map((track, index) => (
          <Circle key={track.id} track={track} cx={index * 50 - 60} />
        ))}
      </svg>
    </div>
  )
}

export default Visuals
