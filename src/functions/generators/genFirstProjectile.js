// Classes
import Projectile from '../../classes/Projectile.js';
// State
import state from '../../state.js';

const genFirstProjectile = () => {
  const firstProjectile = new Projectile();
  state.projectiles.push(firstProjectile);
  state.projectile = firstProjectile;
};

export default genFirstProjectile;
