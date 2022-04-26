// Constructor Instances
import projectile from './Projectile.js';
import bottomBorder from './borders/bottomBorder.js';
// Configs
import { C, COLORS, SIZES } from '../config.js';
// State
import state from '../state.js';

class Coefficient {
  constructor() {
    this.count = 1;
    this.displayCount = 1;

    this.pos = {
      x: projectile.pos.x,
      y: bottomBorder.pos.y + projectile.r * 2.5,
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
    this.count += state.mergingBonusesCount;
  }

  regainCount() {
    this.displayCount = this.count;
    this.repoSize();
  }

  repoSize() {
    this.pos = {
      x: projectile.pos.x,
      y: bottomBorder.pos.y + projectile.r * 2.5,
    };
  }
}

export default new Coefficient();
