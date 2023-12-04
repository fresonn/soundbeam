import { Howl } from 'howler'

// Info: why is instance prototype expanded
// https://github.com/goldfire/howler.js/issues/825
Howl.prototype.changeSong = function (o) {
  this.unload()
  this._duration = 0 // init duration
  this._sprite = {} // init sprite
  this._src = typeof o.src !== 'string' ? o.src : [o.src]

  this._format = typeof o.format !== 'string' ? o.format : [o.format]
  this.load() // => update duration, sprite(var timeout)
}

export default Howl
