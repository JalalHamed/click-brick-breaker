// Configs
import { MERGING_VELOCITY as M_V } from '../../config.js';
// State
import state from '../../state.js';

const mergeProjectiles = () => {
  state.mergingProjectiles.forEach(projectile => {
    if (projectile.pos.x > state.projectile.pos.x + M_V)
      projectile.pos.x -= M_V;
    else if (projectile.pos.x < state.projectile.pos.x - M_V)
      projectile.pos.x += M_V;
    else {
      state.mergingProjectiles = state.mergingProjectiles.filter(
        item => item.id !== projectile.id
      );
      state.projectiles = state.projectiles.filter(
        item => item.id !== projectile.id
      );
    }
  });
};

export default mergeProjectiles;
