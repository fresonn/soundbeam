class LibAudio {
  private active: boolean
  public audio: HTMLAudioElement
  public audioCtx: AudioContext | null
  public analyser: AnalyserNode | null

  constructor(audio: string) {
    if (!audio) throw new Error(`audio is not specified`)

    this.active = false
    this.audioCtx = null
    this.analyser = null
    this.audio = new Audio(audio)
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

  play() {
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  isActive(): boolean {
    return this.active
  }
}

export default LibAudio
