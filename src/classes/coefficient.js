// Constructor Instances
import mainBall from './balls/mainBall.js';
import bottomBorder from './borders/bottomBorder.js';
// Configs
import {
  C,
  CANVAS,
  SIZES,
  COLORS,
  MAX_COEFFICIENT_Y_POS as M_C_Y_P,
  MAX_COEFFICIENT_FONT_SIZE as M_C_F_S,
} from '../config.js';
// State
import { state } from '../state.js';

class Coefficient {
  constructor() {
    this.count = state.getLS('coefficient') || 1;

    this.posY = bottomBorder.heightFromTop + mainBall.r * 2.5;

    this.pos = {
      x: mainBall.pos.x,
      y: this.posY < M_C_Y_P ? this.posY : M_C_Y_P,
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
    this.posY = bottomBorder.heightFromTop + mainBall.r * 2.5;
    this.pos.x = mainBall.pos.x;
    this.pos.y = this.posY < M_C_Y_P ? this.posY : M_C_Y_P;
  }
}

export default new Coefficient();
