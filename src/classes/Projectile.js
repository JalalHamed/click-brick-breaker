// Objects
import bottomBorder from './borders/bottomBorder.js';
// Functions
import { getID } from '../helpers.js';
// Configs
import { COLORS, SIZES, CANVAS, C, VELOCITY } from '../config.js';
// State
import state from '../state.js';

export default class Projectile {
  constructor(props) {
    this.id = getID('projectile');
    this.mode = 'stable';

    this.pos = {
      x: state.getLS('projectile') || CANVAS.width / 2,
      y: bottomBorder.pos.y - SIZES.projectile.radius,
    };

    this.velocity = { x: 0, y: 0 };
  }

  perimeter(sector) {
    switch (sector) {
      case 'left':
        return this.pos.x - SIZES.projectile.radius;
      case 'top':
        return this.pos.y - SIZES.projectile.radius;
      case 'right':
        return this.pos.x + SIZES.projectile.radius;
      case 'bottom':
        return this.pos.y + SIZES.projectile.radius;
      default:
        return;
    }
  }

  merge() {
    if (this.pos.x + VELOCITY.merging < state.projectile.pos.x)
      this.pos.x += VELOCITY.merging;
    else if (this.pos.x - VELOCITY.merging > state.projectile.pos.x)
      this.pos.x -= VELOCITY.merging;
    else {
      this.pos.x = state.projectile.pos.x;
      this.mode = 'stable';
    }
  }

  draw() {
    if (this.mode === 'merge') this.merge();

    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, SIZES.projectile.radius, 0, 2 * Math.PI);
    C.fillStyle = COLORS.projectile;
    C.fill();
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  repoSize() {
    this.pos = {
      x: (this.pos.x * innerWidth) / state.innerWidth,
      y: bottomBorder.pos.y - SIZES.projectile.radius,
    };

    state.setLS({ projectile: this.pos.x });
  }
}
