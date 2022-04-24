// Constructor Instance
import projectile from '../../classes/projectiles/projectile.js';
// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

const velocity = SIZES.projectile.radius;

const mergeBonus = () => {
  console.log('merging');
  state.collidedBonuses.forEach(bonus => {
    if (bonus.pos.x > projectile.pos.x + velocity) bonus.pos.x -= velocity;
    else if (bonus.pos.x < projectile.pos.x - velocity) bonus.pos.x += velocity;
    else {
      state.collidedBonuses = state.collidedBonuses.filter(
        item => item.id !== bonus.id
      );
      state.isBonusMerging = false;
    }
  });
};

export default mergeBonus;
