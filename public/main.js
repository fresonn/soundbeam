import Soundbeam from '../dist/esm/soundbeam.js'

const nodeEl = document.getElementById('player')

const player = new Soundbeam({
  node: nodeEl
})

const playBtn = document.getElementById('play')
const pauseBtn = document.getElementById('pause')

player.load('../assets/second.mp3')

playBtn.addEventListener('click', () => {
  player.play()
})

pauseBtn.addEventListener('click', () => {
  player.pause()
})
