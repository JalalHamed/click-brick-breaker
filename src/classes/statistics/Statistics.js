// Configs
import { CANVAS, C, SIZES } from '../../config.js';

export default class Statistics {
  constructor() {
    this.pos = {
      x: CANVAS.width / 2 + 75,
    };
  }

  draw() {
    C.font = `2rem play`;
    C.fillStyle = '#000';
    C.textAlign = 'right';
    C.textBaseline = 'middle';
    C.fillText(`${this.status}: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }
}