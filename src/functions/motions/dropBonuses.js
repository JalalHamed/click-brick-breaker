// Constructor Instance
import { bottomBorder } from '../../classes/exports.js';
// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

const { radius } = SIZES.projectile;

const dropBonuses = () => {
  state.droppingBonuses.forEach(bonus => {
    if (bonus.pos.y < bottomBorder.pos.y - radius) bonus.pos.y += 10;
    else {
      bonus.pos.y = bottomBorder.pos.y - radius;
      state.mergingBonuses.push(bonus);
      state.mergingBonusesCount++;
      state.droppingBonuses = state.droppingBonuses.filter(
        item => item.id !== bonus.id
      );
    }
  });
};

export default dropBonuses;
