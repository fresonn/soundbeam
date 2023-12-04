import Soundbeam from './soundbeam'

const nodeEl = document.getElementById('player') as HTMLElement

const player = new Soundbeam({
  node: nodeEl
})

console.log(player)

const playBtn = document.getElementById('play')
const pauseBtn = document.getElementById('pause')

player.load('../assets/main.mp3')

if (playBtn && pauseBtn) {
  playBtn.addEventListener('click', () => {
    player.play()
  })

  pauseBtn.addEventListener('click', () => {
    player.pause()
  })
}
