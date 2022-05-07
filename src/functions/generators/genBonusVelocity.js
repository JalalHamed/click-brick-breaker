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
  const bonuses = state.bonuses.filter(bonus => bonus.mode === 'merge');
  let closestBonus;

  bonuses.forEach(bonus => {
    if (!closestBonus) closestBonus = bonus;
    else if (getDist(bonus) < getDist(closestBonus)) closestBonus = bonus;
  });

  bonuses.forEach(bonus => {
    if (bonus.id !== closestBonus.id)
      bonus.velocity.x =
        (getDist(bonus) / getDist(closestBonus)) *
        SIZES.projectile.radius *
        1.3;
  });
};

export default genBonusVelocity;
