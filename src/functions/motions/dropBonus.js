// Constructor Instance
import bottomBorder from '../../classes/borders/bottomBorder.js';
// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

const dropBonus = () => {
  state.droppingBonuses.forEach(bonus => {
    if (bonus.pos.y < bottomBorder.pos.y) bonus.pos.y += 7;
    else {
      bonus.pos.y = bottomBorder.pos.y - SIZES.projectile.radius;
      state.mergingBonuses.push(bonus);
      state.droppingBonuses = state.droppingBonuses.filter(
        item => item.id !== bonus.id
      );
    }
  });
};

export default dropBonus;
