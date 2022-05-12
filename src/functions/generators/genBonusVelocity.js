// Configs
import { SIZES, MERGING_VELOCITY as M_V } from '../../config.js';
// FUnctions
import { getXDist } from '../helpers.js';
// State
import state from '../../state.js';

const genBonusVelocity = () => {
  const bonuses = state.bonuses.filter(bonus => bonus.mode === 'merge');
  let furthestBonus;

  bonuses.forEach(bonus => {
    if (!furthestBonus) furthestBonus = bonus;
    else if (
      getXDist(bonus, state.projectile) >
      getXDist(furthestBonus, state.projectile)
    )
      furthestBonus = bonus;
  });

  bonuses.forEach(bonus => {
    if (bonus.id !== furthestBonus.id)
      bonus.velocity.x /=
        getXDist(furthestBonus, state.projectile) /
        getXDist(bonus, state.projectile);
  });
};

export default genBonusVelocity;
