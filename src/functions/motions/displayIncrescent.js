// Constructor Instances
import increscent from '../../classes/increscent.js';
import bottomBorder from '../../classes/borders/bottomBorder.js';
// Configs
import {
  INCRESCENT_DISTANCE_TO_TAKE as I_D_T_T,
  COLORS,
} from '../../config.js';
// State
import state from '../../state.js';

const displayIncrescent = () => {
  increscent.draw();
  if (increscent.pos.y > bottomBorder.pos.y - I_D_T_T) {
    increscent.pos.y -= 5;
    increscent.transparency -= 0.05;
    increscent.color = `${COLORS.projectile.slice(0, -1)}, ${
      increscent.transparency
    })`;
  } else {
    increscent.repoSize();
    increscent.transparency = 1;
    increscent.color = COLORS.projectile;
    state.isMoving.increscent = false;
    state.mergingBonusesCount = 0;
  }
};

export default displayIncrescent;
