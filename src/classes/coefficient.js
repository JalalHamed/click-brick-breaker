// Constructor Instances
import bottomBorder from './borders/bottomBorder.js';
// Configs
import { C, COLORS, SIZES, CANVAS } from '../config.js';
// State
import state from '../state.js';

class Coefficient {
  constructor() {
    this.count = 1;
    this.displayCount = 1;

    this.pos = {
      x: state.getLS('projectile') || CANVAS.width / 2,
      y: bottomBorder.pos.y + SIZES.projectile.radius * 2.5,
    };
  }

  draw() {
    C.font = `${SIZES.font}rem play`;
    C.fillStyle = this.displayCount > 0 ? COLORS.projectile : '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(`x${this.displayCount}`, this.pos.x, this.pos.y);
  }

  decreaseCount() {
    this.displayCount--;
  }

  increaseCount() {
    this.count++;
    this.regainCount();
  }

  regainCount() {
    this.displayCount = this.count;
    this.repoSize();
  }

  repoSize() {
    this.pos = {
      x: state.projectiles[0].pos.x,
      y: bottomBorder.pos.y + SIZES.projectile.radius * 2.5,
    };
  }
}

export default new Coefficient();
