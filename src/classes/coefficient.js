// Constructor Instances
import mainBall from './balls/mainBall.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import { state } from '../state.js';

class Coefficient {
  constructor() {
    this.count = state.getLocalStorage()?.coefficient || 1;

    this.pos = {
      x: mainBall.pos.x,
      y: mainBall.pos.y + SIZES.border.height + mainBall.r * 3,
    };
  }

  draw() {
    C.font = `1.5rem play`;
    C.fillStyle = this.count > 0 ? COLORS.ball.main : '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  decreaseCount() {
    this.count--;
  }

  regainCount() {
    this.count = state.getLocalStorage()?.coefficient || 1;
  }

  repoSize() {
    this.pos = {
      x: mainBall.pos.x,
      y: mainBall.pos.y + SIZES.border.height + mainBall.r * 3,
    };
  }
}

export default new Coefficient();
