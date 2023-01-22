class Player {
  readonly name: string

  constructor(name: string = 'oasis player') {
    this.name = name
  }

  run() {
    console.log('start')
    const c = document.body.appendChild(document.createElement('canvas'))
    c.style.backgroundColor = 'limegreen'
    c.style.border = '2px solid #000'
  }
}

const p = new Player()
p.run()
