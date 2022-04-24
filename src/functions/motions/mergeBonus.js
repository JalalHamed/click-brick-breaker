// Constructor Instance
import projectile from '../../classes/projectiles/projectile.js';
// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

const velocity = SIZES.projectile.radius;

const mergeBonus = () => {
  state.mergingBonuses.forEach(bonus => {
    if (bonus.pos.x > projectile.pos.x + velocity) bonus.pos.x -= velocity;
    else if (bonus.pos.x < projectile.pos.x - velocity) bonus.pos.x += velocity;
    else
      state.mergingBonuses = state.mergingBonuses.filter(
        item => item.id !== bonus.id
      );
  });
};

export default mergeBonus;
