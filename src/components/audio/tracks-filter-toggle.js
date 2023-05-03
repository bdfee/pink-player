const TracksFilterToggle = ({ showFilter, setShowFilter, params }) => {
  const { id, name } = params

  const selectedClass = showFilter === id ? `toggle-${id}` : ''

  return (
    <div
      className={`filter-toggle ${selectedClass}`}
      onClick={() => {
        setShowFilter(id)
      }}>
      {name}
    </div>
  )
}

export default TracksFilterToggle
