// Classes
import bottomBorder from './borders/bottomBorder.js';
// Configs
import {
  C,
  SIZES,
  COLORS,
  INCRESCENT_DISTANCE_TO_TAKE as I_D_T_T,
} from '../config.js';
// State
import state from '../state.js';

class Increscent {
  constructor() {
    this.transparency = 1;
    this.color = COLORS.projectile;

    this.pos = { y: bottomBorder.pos.y - SIZES.projectile.radius * 3 };
  }

  goUp() {
    if (this.pos.y > bottomBorder.pos.y - I_D_T_T) {
      this.pos.y -= 5;
      this.transparency -= 0.05;
      this.color = `${COLORS.projectile.slice(0, -1)}, ${this.transparency})`;
    } else {
      state.isMoving.increscent = false;
      this.repoSize();
      this.transparency = 1;
      state.mergingBonusesCount = 0;
    }
  }

  draw() {
    this.goUp();

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
