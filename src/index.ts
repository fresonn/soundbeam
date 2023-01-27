import LibAudio from './audio'
import Trackline from './trackline'

const playBtn = document.getElementById('play') as HTMLButtonElement
const pauseBtn = document.getElementById('pause') as HTMLButtonElement

interface PProps {
  node: HTMLElement | string
  src?: string
}

class Player {
  isActive: boolean
  readonly libAudio: LibAudio
  readonly trackline: Trackline

  constructor(args: PProps) {
    this.isActive = false
    this.libAudio = new LibAudio(args.src)
    this.trackline = new Trackline(args.node, this.libAudio)
  }

  init() {
    this.isActive = true
    this.libAudio.init()
  }

  public play() {
    if (!this.isActive) {
      this.init()
    }
    this.libAudio.play()
    this.trackline.animate()
  }

  public pause() {
    this.libAudio.pause()
  }

  public log() {
    // console.log(this.node)
  }
}

const player = new Player({
  node: '#player',
  src: '../assets/main.mp3'
})

player.log()

playBtn.addEventListener('click', () => {
  player.play()
})

pauseBtn.addEventListener('click', () => {
  player.pause()
})
