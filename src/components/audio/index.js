import { useState, useEffect } from 'react'
import TracksGain from './tracks-gain'
import TracksFilter from './tracks-filter'
import { filterRanges } from '../../helpers/trackDefaults'
import './index.css'

import {
  createAudioNodes,
  createPinkNoiseAudioBuffer,
  setAudioNodeParams,
  connectAudioNodes
} from '../../helpers/audioHelpers'
import { defaultParams } from '../../helpers/trackDefaults'
import TracksFilterToggle from './tracks-filter-toggle'
import ActiveToggle from './active-toggle'
import { audio } from './audioObject'

const AudioParameters = () => {
  const [isRunning, setIsRunning] = useState(false)
  // state parameters of ui, values used to rebuild the audio object in handleStart and map the filter components
  const [showFilter, setShowFilter] = useState('lowPink')
  const [trackParams, setTrackParams] = useState(defaultParams)

  useEffect(() => {
    !isRunning ? handleStop() : handleStart()
  }, [isRunning])

  const handleStart = () => {
    audio.graph.out.gain.value = 0.8
    // map params from inital state into audio object on start
    trackParams.map((params) => {
      const track = (audio.graph.tracks[params.id] = {})
      createAudioNodes(track, audio.context)
      createPinkNoiseAudioBuffer(track.audioSource, audio.context)
      setAudioNodeParams(track, params)
      connectAudioNodes(track, audio.graph.out, audio.context.destination)
      track.audioSource.start()
    })
  }

  const handleStop = () => {
    Object.values(audio.graph.tracks).map((track) => track.audioSource.stop())
  }

  return (
    <>
      <div className="audio-controls">
        <div className="gain-sliders-container">
          {trackParams.map((params) => {
            return (
              <TracksGain
                key={params.id}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                params={params}
                trackParams={trackParams}
                setParams={setTrackParams}
                trackNodes={audio.graph.tracks[params.id]}
                context={audio.context}
              />
            )
          })}
        </div>
        <div className="filters">
          <div className="filter-toggle-row">
            {trackParams.map((params) => {
              return (
                <TracksFilterToggle
                  key={params.id}
                  showFilter={showFilter}
                  setShowFilter={setShowFilter}
                  params={params}
                />
              )
            })}
          </div>
          <div>
            {trackParams.map((params) => {
              return (
                <TracksFilter
                  key={params.id}
                  showFilter={showFilter}
                  params={params}
                  rangeDefaults={filterRanges[params.id]}
                  trackParams={trackParams}
                  setParams={setTrackParams}
                  trackNodes={audio.graph.tracks[params.id]}
                  context={audio.context}
                />
              )
            })}
          </div>
        </div>
        <ActiveToggle isRunning={isRunning} setIsRunning={setIsRunning} />
      </div>
    </>
  )
}

export default AudioParameters
