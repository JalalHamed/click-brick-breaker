// Configs
import { SIZES, BONUS_RING_MAX_RADIUS as B_R_M_R } from '../../config.js';
// State
import state from '../../state.js';

let isGoingDown = false;

const swingBonusRing = () => {
  if (SIZES.bonus.radius > SIZES.projectile.radius && isGoingDown)
    SIZES.bonus.radius--;
  if (SIZES.bonus.radius <= SIZES.projectile.radius) isGoingDown = false;
  if (SIZES.bonus.radius < Math.floor(B_R_M_R) && !isGoingDown)
    SIZES.bonus.radius += SIZES.bonus.radius / 20;
  if (SIZES.bonus.radius >= Math.floor(B_R_M_R)) isGoingDown = true;
};

export default swingBonusRing;
