// Constructor Instances
import mainBall from './balls/mainBall.js';
import bottomBorder from './borders/bottomBorder.js';
// Configs
import {
  C,
  CANVAS,
  COLORS,
  MAX_COEFFICIENT_FONT_SIZE as M_C_F_S,
} from '../config.js';
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
    C.font = `${
      CANVAS.width / 400 > M_C_F_S ? M_C_F_S : CANVAS.width / 400
    }rem play`;
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
