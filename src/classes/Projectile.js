// Constructor Instances
import bottomBorder from './borders/bottomBorder.js';
// Functions
import genID from '../functions/generators/genID.js';
// Configs
import { COLORS, SIZES, CANVAS, C } from '../config.js';
// State
import state from '../state.js';

export default class Projectile {
  constructor(props) {
    this.id = genID('projectile');

    this.pos = {
      x: state.getLS('projectile') || CANVAS.width / 2,
      y: bottomBorder.pos.y - SIZES.projectile.radius,
    };

    this.velocity = {
      x: props?.velocity?.x || 0,
      y: props?.velocity?.y || 0,
    };
  }

  draw() {
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
    state.innerWidth = innerWidth;
  }
}
