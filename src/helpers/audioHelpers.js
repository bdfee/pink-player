// track is a skeleton audio object when passed in here, and returns with audio nodes
export const createAudioNodes = (track, context) => {
  track.audioSource = context.createBufferSource()
  track.gainNode = context.createGain()
  track.lowpassFilter = context.createBiquadFilter()
  track.highpassFilter = context.createBiquadFilter()
}

export const createPinkNoiseAudioBuffer = (audioSource, context) => {
  // pink noise audio buffer code is adapted from Paul Kellet's refined method
  // https://www.firstpr.com.au/dsp/pink-noise/
  // referenced in Zach Denton's Noisehack blog
  // https://noisehack.com/generate-noise-web-audio-api/

  const bufferSize = 5 * context.sampleRate
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate)
  const output = buffer.getChannelData(0)

  let b0 = 0
  let b1 = 0
  let b2 = 0
  let b3 = 0
  let b4 = 0
  let b5 = 0
  let b6 = 0

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.969 * b2 + white * 0.153852
    b3 = 0.8665 * b3 + white * 0.3104856
    b4 = 0.55 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.016898
    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
    output[i] *= 0.11
    b6 = white * 0.115926
  }

  audioSource.buffer = buffer
}

// end of adapted code

export const setAudioNodeParams = (
  { gainNode, audioSource, lowpassFilter, highpassFilter },
  { gain, lowpassFreq, highpassFreq }
) => {
  gainNode.gain.value = gain
  audioSource.loop = true
  lowpassFilter.type = 'lowpass'
  highpassFilter.type = 'highpass'
  lowpassFilter.frequency.value = lowpassFreq
  highpassFilter.frequency.value = highpassFreq
}

export const connectAudioNodes = (
  { audioSource, gainNode, lowpassFilter, highpassFilter },
  out,
  destination
) => {
  audioSource.connect(gainNode)
  gainNode.connect(lowpassFilter)
  lowpassFilter.connect(highpassFilter)
  highpassFilter.connect(out)
  out.connect(destination)
}

export const reverseHighpassValue = (value, hpMin, hpMax) => {
  const percent = (value - hpMin) / (hpMax - hpMin)
  return percent * (hpMin - hpMax) + hpMax
}
