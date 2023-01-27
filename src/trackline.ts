import LibAudio from './audio'

class Trackline {
  readonly canvas: HTMLCanvasElement
  readonly canvasCtx: CanvasRenderingContext2D
  readonly container: HTMLElement
  readonly libAudio: LibAudio

  constructor(container: HTMLElement | string, libAudio: LibAudio) {
    if (typeof container === 'string') {
      const el = document.querySelector(container)

      if (!el) throw new Error(`'${container}' DOM element not found`)

      this.container = el as HTMLElement
    } else {
      this.container = container
    }

    const c = document.createElement('canvas')
    c.id = 'cc'
    c.style.backgroundColor = '#000'
    c.style.border = '2px solid #000'

    this.canvas = c
    this.canvasCtx = c.getContext('2d')
    this.libAudio = libAudio

    this.container.appendChild(c)
  }

  public animate() {
    const analyser = this.libAudio.analyser

    const ctx = this.canvasCtx
    const canvas = this.canvas

    const bufferLength = analyser.frequencyBinCount

    const dataArray = new Uint8Array(bufferLength)
    const barWidth = this.canvas.width / bufferLength

    let x = 0
    function run() {
      x = 0
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      analyser.getByteFrequencyData(dataArray)
      for (let i = 0; i < bufferLength; i++) {
        let barHeight = dataArray[i]
        ctx.fillStyle = 'yellow'
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth
      }

      requestAnimationFrame(run)
    }

    run()
  }
}

export default Trackline
