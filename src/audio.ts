class LibAudio {
  private src: string
  private active: boolean
  public audio: HTMLAudioElement
  public audioCtx: AudioContext | null
  public analyser: AnalyserNode | null

  constructor(src?: string) {
    this.active = false
    this.audioCtx = null
    this.analyser = null
    this.audio = new Audio(src)
    this.src = src
  }

  init() {
    console.log('audio: init()')

    if (this.active) throw new Error('web audio already initialized')

    const ctx = new (window.AudioContext || window.webkitAudioContext)()

    let audioSource = ctx.createMediaElementSource(this.audio)
    let analyser = ctx.createAnalyser()

    audioSource.connect(analyser)
    analyser.connect(ctx.destination)

    analyser.fftSize = 128

    this.audioCtx = ctx
    this.analyser = analyser
    this.active = true
  }

  public play() {
    if (!this.src) throw new Error('nothing to play: specify src or call load() method')
    this.audio.play()
  }

  public pause() {
    this.audio.pause()
  }

  public isActive(): boolean {
    return this.active
  }

  public load() {}
}

export default LibAudio
