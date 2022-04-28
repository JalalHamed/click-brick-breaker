// Classes
import Projectile from '../../classes/Projectile.js';
// State
import state from '../../state.js';

const genFirstProjectile = () => {
  state.projectile = new Projectile();
};

export default genFirstProjectile;
