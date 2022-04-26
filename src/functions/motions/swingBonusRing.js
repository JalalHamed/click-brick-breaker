// Configs
import { SIZES, BONUS_RING_MAX_RADIUS as B_R_M_R } from '../../config.js';
// State
import state from '../../state.js';

let isGoingDown = false;

const swingBonusRing = () => {
  const { radius } = SIZES.projectile;
  if (state.bonusRingRadius > radius && isGoingDown) state.bonusRingRadius--;
  if (state.bonusRingRadius <= radius) isGoingDown = false;
  if (state.bonusRingRadius < Math.floor(B_R_M_R) && !isGoingDown)
    state.bonusRingRadius += state.bonusRingRadius / 20;
  if (state.bonusRingRadius >= Math.floor(B_R_M_R)) isGoingDown = true;
};

export default swingBonusRing;
