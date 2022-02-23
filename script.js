// DOM elements
const td = document.querySelector('td');
const canvas = document.createElement('canvas');

class Game {
  constructor() {
    this._setSize();
    window.addEventListener('resize', this._setSize);

    this.ctx = canvas.getContext('2d');
    this._renderGameField();
  }

  _setSize() {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
  }

  _renderGameField() {
    console.log(this.ctx);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 50);
    this.ctx.lineTo(window.innerWidth, 50);
    this.ctx.stroke();
  }
}

const game = new Game();
td.appendChild(canvas);
