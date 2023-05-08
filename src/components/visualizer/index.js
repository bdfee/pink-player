import { useRef, useEffect } from 'react'

const Visualizer = ({ audio }) => {
  const canvasRef = useRef(null)
  const colors = ['#FF5733', '#DAF7A6', '#C70039', '#0074D9', '#FFDC00']

  const draw = (canvasContext, frequencyData, canvasWidth, canvasHeight, color) => {
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
    const barWidth = canvasWidth / frequencyData.length

    for (let j = 0; j < frequencyData.length; j++) {
      const barHeight = (frequencyData[j] / 255) * canvasHeight
      const x =
        (Math.log(j) / Math.log(audio.graph.analyser.frequencyBinCount)) * canvasRef.current.width
      const y = canvasHeight - barHeight
      canvasContext.fillStyle = color
      canvasContext.fillRect(x, y, barWidth, barHeight)
    }
  }

  useEffect(() => {
    let frequencyData
    const canvasContext = canvasRef.current.getContext('2d')
    const canvasWidth = canvasRef.current.width
    const canvasHeight = canvasRef.current.height

    function animate() {
      if (audio?.graph?.analyser) {
        for (let track in audio.graph.tracks) {
          audio.graph.tracks[track].highpassFilter.connect(audio.graph.analyser)
          frequencyData = new Uint8Array(audio.graph.analyser.frequencyBinCount)
          audio.graph.analyser.getByteFrequencyData(frequencyData)
          draw(
            canvasContext,
            frequencyData,
            canvasWidth,
            canvasHeight,
            colors[Math.floor(Math.random() * 5 + 1)]
          )
        }
      }
      requestAnimationFrame(animate)
    }

    animate()
  }, [audio])

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight / 3}></canvas>
}

export default Visualizer
