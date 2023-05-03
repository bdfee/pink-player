import { useState, useEffect } from 'react'
import TracksGain from './tracks-gain'
import TracksFilter from './tracks-filter'
import Visuals from '../visuals/index'
import { filterRanges } from '../../helpers/trackDefaults'
import './index.css'

import {
  createAudioNodes,
  createPinkNoiseAudioBuffer,
  setAudioNodeParams,
  connectAudioNodes
} from '../../helpers/audio.helpers'
import TracksFilterToggle from './tracks-filter-toggle'
import ActiveToggle from './active-toggle'

// will try to run once on load, cannot initialize before user action per web audio
const audioContext = new AudioContext()
const gainNode = audioContext.createGain()
// this context and audio graph will be assembled in the audio obj
const audio = {
  context: audioContext,
  graph: {
    out: gainNode,
    tracks: {}
  }
}

const AudioParameters = () => {
  const [isRunning, setIsRunning] = useState(false)
  // state parameters of ui, values used to rebuild the audio object in handleStart and map the filter components
  const [showFilter, setShowFilter] = useState('lowPink')
  const [trackParams, setTrackParams] = useState([
    {
      id: 'rumble',
      name: 'rumble',
      gain: 0.6,
      highpassFreq: 30,
      lowpassFreq: 60
    },
    {
      id: 'low',
      name: 'low',
      gain: 0.6,
      highpassFreq: 60,
      lowpassFreq: 200
    },
    {
      id: 'midLow',
      name: 'wind',
      gain: 0.1,
      highpassFreq: 200,
      lowpassFreq: 500
    },
    {
      id: 'midHigh',
      name: 'rain',
      gain: 0.1,
      highpassFreq: 500,
      lowpassFreq: 3000
    },
    {
      id: 'high',
      name: 'hiss',
      gain: 0.4,
      highpassFreq: 10000,
      lowpassFreq: 12000
    }
  ])

  // todo
  useEffect(() => {
    !isRunning ? handleStop() : handleStart()
  }, [isRunning])

  const handleStart = () => {
    audio.graph.out.gain.value = 0.8
    // map params from inital or user defined state into audio on start
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
    <div className="audio-controls">
      <Visuals trackParams={trackParams} />
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
        <ActiveToggle isRunning={isRunning} setIsRunning={setIsRunning} />
      </div>
    </div>
  )
}

export default AudioParameters
