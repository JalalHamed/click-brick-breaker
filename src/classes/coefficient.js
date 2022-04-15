// Constructor Instances
import mainBall from './balls/mainBall.js';
import bottomBorder from './borders/bottomBorder.js';
// Functions
import { getFontSize } from '../functions/helpers.js';
// Configs
import { C, CANVAS, COLORS } from '../config.js';
// State
import { state } from '../state.js';

class Coefficient {
  constructor() {
    this.count = state.getLS('coefficient') || 1;

    this.pos = {
      x: mainBall.pos.x,
      y: bottomBorder.pos.y + mainBall.r * 2.5,
    };
  }

  draw() {
    C.font = `${getFontSize()}rem play`;
    C.fillStyle = this.count > 0 ? COLORS.ball.main : '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  decreaseCount() {
    this.count--;
  }

  regainCount() {
    this.count = state.getLS('coefficient') || 1;
  }

  repoSize() {
    this.pos = {
      x: mainBall.pos.x,
      y: bottomBorder.pos.y + mainBall.r * 2.5,
    };
  }
}

export default new Coefficient();
