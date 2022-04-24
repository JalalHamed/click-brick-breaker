// Constructor Instance
import bottomBorder from '../../classes/borders/bottomBorder.js';
// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

const dropBonus = () => {
  console.log('dropping');
  state.collidedBonuses.forEach(bonus => {
    if (bonus.pos.y < bottomBorder.pos.y) bonus.pos.y += 7;
    else {
      bonus.pos.y = bottomBorder.pos.y - SIZES.projectile.radius;
      state.isBonusDropping = false;
    }
  });
};

export default dropBonus;
