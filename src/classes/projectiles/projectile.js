// Classes
import Projectile from './Projectile.js';
// Constructor Instances
import bottomBorder from '../borders/bottomBorder.js';
// State
import state from '../../state.js';
// Configs
import { SIZES } from '../../config.js';

class MainProjectile extends Projectile {
  constructor() {
    super();
  }

  repoSize() {
    this.r = SIZES.projectile.radius;

    this.pos.y = bottomBorder.pos.y - this.r;

    this.pos.x = (this.pos.x * innerWidth) / state.innerWidth;
    state.setLS({ projectile: this.pos.x });
    state.innerWidth = innerWidth;
  }
}

export default new MainProjectile();
