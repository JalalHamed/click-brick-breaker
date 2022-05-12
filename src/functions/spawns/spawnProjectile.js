// Classes
import Projectile from '../../classes/Projectile.js';
// State
import state from '../../state.js';

const spawnProjectile = () => {
  const projectile = new Projectile();
  state.projectile = projectile;
  state.projectiles.push(projectile);
};

export default spawnProjectile;
