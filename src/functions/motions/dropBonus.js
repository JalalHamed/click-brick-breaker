// Constructor Instance
import bottomBorder from '../../classes/borders/bottomBorder.js';
// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

const { radius } = SIZES.projectile;

const dropBonus = () => {
  state.droppingBonuses.forEach(bonus => {
    if (bonus.pos.y < bottomBorder.pos.y - radius) bonus.pos.y += 10;
    else {
      bonus.pos.y = bottomBorder.pos.y - radius;
      state.mergingBonuses.push(bonus);
      state.droppingBonuses = state.droppingBonuses.filter(
        item => item.id !== bonus.id
      );
    }
  });
};

export default dropBonus;
