// Configs
import { CANVAS, C } from '../utils/config.js';

export default class Statistics {
  constructor() {
    this.pos = {
      x: CANVAS.width / 2 + 80,
    };
  }

  draw() {
    C.font = `2rem play`;
    C.fillStyle = '#000';
    C.textAlign = 'right';
    C.textBaseline = 'middle';
  }

  addOne() {
    this.count++;
  }
}
