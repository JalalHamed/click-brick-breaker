// Configs
import { SIZES, MERGING_VELOCITY as M_V } from '../../config.js';
// State
import state from '../../state.js';

function getDist(bonus) {
  return Math.abs(bonus.pos.x - state.projectile.pos.x);
}

const genBonusVelocity = () => {
  const bonuses = state.bonuses.filter(bonus => bonus.mode === 'merge');
  let furthestBonus;

  bonuses.forEach(bonus => {
    if (!furthestBonus) furthestBonus = bonus;
    else if (getDist(bonus) > getDist(furthestBonus)) furthestBonus = bonus;
  });

  bonuses.forEach(bonus => {
    if (bonus.id !== furthestBonus.id)
      bonus.velocity.x /= getDist(furthestBonus) / getDist(bonus);
  });
};

export default genBonusVelocity;
