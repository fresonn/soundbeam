export {}

declare global {
  interface Window {
    webkitAudioContext: typeof window.AudioContext
  }
}

declare module 'howler' {
  interface Howl {
    _duration: number

    _sprite: any
    _src: string | Array<string> //typeof o.src !== 'string' ? o.src : [o.src]

    _format: string | Array<string> // typeof o.format !== 'string' ? o.format : [o.format]

    changeSong(o: any): void
  }
}
