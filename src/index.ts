import LibAudio from './audio'

const playBtn = document.getElementById('play') as HTMLButtonElement
const pauseBtn = document.getElementById('pause') as HTMLButtonElement

class Player {
  isActive: boolean
  readonly node: HTMLElement
  readonly libAudio: LibAudio

  constructor(node: HTMLElement | string, src: string) {
    if (typeof node === 'string') {
      const el = document.querySelector(node)

      if (!el) throw new Error(`'${node}' DOM element not found`)

      this.node = el as HTMLElement
    } else {
      this.node = node
    }

    this.isActive = false
    this.libAudio = new LibAudio(src)
  }

  init() {
    this.isActive = true
    this.libAudio.init()
  }

  public create() {
    const c = document.createElement('canvas')
    c.id = 'cc'
    this.node.appendChild(c)

    c.style.backgroundColor = '#000'
    c.style.border = '2px solid #000'
  }

  public play() {
    if (!this.isActive) {
      this.init()
    }
    this.libAudio.play()
  }

  public pause() {
    this.libAudio.pause()
  }

  public log() {
    // console.log(this.node)
  }
}

const player = new Player('#player', '../assets/magnum.mp3')

player.create()
player.log()

const canvas = document.getElementById('cc') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

// window.addEventListener('load', () => {
//   console.log('load event')
//   player.init()
// })

playBtn.addEventListener('click', () => {
  player.play()
  run()
})

pauseBtn.addEventListener('click', () => {
  player.pause()
})

function run() {
  const analyser = player.libAudio.analyser

  const bufferLength = analyser.frequencyBinCount

  const dataArray = new Uint8Array(bufferLength)
  const barWidth = canvas.width / bufferLength

  let x = 0
  function animate() {
    x = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    analyser.getByteFrequencyData(dataArray)
    for (let i = 0; i < bufferLength; i++) {
      let barHeight = dataArray[i]
      ctx.fillStyle = 'yellow'
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
      x += barWidth
    }

    requestAnimationFrame(animate)
  }

  animate()
}
