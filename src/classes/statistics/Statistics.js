// Configs
import { CANVAS, C, SIZES } from '../../config.js';

export default class Statistics {
  constructor() {
    this.pos = {
      x: CANVAS.width / 2,
      y: 30,
    };
  }

  draw() {
    C.font = `${SIZES.font}rem play`;
    C.fillStyle = '#000';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(
      `${this.status.toUpperCase()} : ${this.count}`,
      this.pos.x,
      this.pos.y
    );
  }

  addOne() {
    this.count++;
  }
}
