// Constructor Instances
import projectile from './projectiles/projectile.js';
import bottomBorder from './borders/bottomBorder.js';
// Configs
import { C, CANVAS, COLORS, SIZES } from '../config.js';
// State
import state from '../state.js';

class Coefficient {
  constructor() {
    this.count = state.getLS('coefficient') || 1;

    this.pos = {
      x: projectile.pos.x,
      y: bottomBorder.pos.y + projectile.r * 2.5,
    };
  }

  draw() {
    C.font = `${SIZES.font}rem play`;
    C.fillStyle = this.count > 0 ? COLORS.projectile : '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  decreaseCount() {
    this.count--;
  }

  regainCount() {
    this.count = state.getLS('coefficient') || 1;
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
