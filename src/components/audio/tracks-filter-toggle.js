const TracksFilterToggle = ({ showFilter, setShowFilter, params }) => {
  const { id } = params

  const selectedClass = showFilter === id ? `toggle-${id}` : ''

  return (
    <div
      className={`filter-toggle ${selectedClass}`}
      onClick={() => {
        setShowFilter(id)
      }}>
      {id}
    </div>
  )
}

export default TracksFilterToggle
