// Constructor Instances
import coefficient from '../../classes/coefficient.js';
// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

function getDist(bonus) {
  return Math.abs(bonus.pos.x - coefficient.pos.x);
}

const genBonusVelocity = () => {
  let closestBonus;

  state.mergingBonuses.forEach(bonus => {
    if (!closestBonus) closestBonus = bonus;
    else if (getDist(bonus) < getDist(closestBonus)) closestBonus = bonus;
  });

  state.mergingBonuses.forEach(bonus => {
    if (bonus.id !== closestBonus.id)
      bonus.velocity.x =
        (getDist(bonus) / getDist(closestBonus)) * SIZES.projectile.radius;
  });
};

export default genBonusVelocity;
