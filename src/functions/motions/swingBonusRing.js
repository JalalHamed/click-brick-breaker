// Configs
import { SIZES, BONUS_RING_MAX_RADIUS as B_R_M_R } from '../../config.js';
// State
import state from '../../state.js';

let isGoingDown = false;

const swingBonusRing = () => {
  const { radius } = SIZES.projectile;
  if (state.bonusRing > radius && isGoingDown) state.bonusRing--;
  if (state.bonusRing <= radius) isGoingDown = false;
  if (state.bonusRing < Math.floor(B_R_M_R) && !isGoingDown)
    state.bonusRing += state.bonusRing / 20;
  if (state.bonusRing >= Math.floor(B_R_M_R)) isGoingDown = true;
};

export default swingBonusRing;
