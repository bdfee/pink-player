// will try to run once on load, cannot initialize before user action per web audio
const audioContext = new AudioContext()
const gainNode = audioContext.createGain()
//  context and audio graph will be reassembled in the audio obj on play
export const audio = {
  context: audioContext,
  graph: {
    out: gainNode,
    tracks: {}
  }
}
