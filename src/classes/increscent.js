// Classes
import bottomBorder from './borders/bottomBorder.js';
// Configs
import { C, SIZES, COLORS } from '../config.js';
// State
import state from '../state.js';

class Increscent {
  constructor() {
    this.pos = {
      y: bottomBorder.pos.y - SIZES.projectile.radius * 3,
    };

    this.transparency = 1;
    this.color = COLORS.projectile;
  }

  draw() {
    C.font = `${SIZES.font * 1.5}rem play`;
    C.fillStyle = this.color;
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(
      `+${state.mergingBonusesCount}`,
      state.projectile.pos.x,
      this.pos.y
    );
  }

  repoSize() {
    this.pos.y = bottomBorder.pos.y - SIZES.projectile.radius * 3;
  }
}

export default new Increscent();
