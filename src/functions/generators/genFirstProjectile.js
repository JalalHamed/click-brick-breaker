// Classes
import Projectile from '../../classes/Projectile.js';
// State
import state from '../../state.js';

const genFirstProjectile = () => {
  const firstProjectile = new Projectile();
  state.projectile = firstProjectile;
  state.projectiles.push(firstProjectile);
};

export default genFirstProjectile;
