// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

let isGoingDown = false;

const swingBonusRing = () => {
  const { radius } = SIZES.projectile;
  if (state.bonusRing > radius && isGoingDown) state.bonusRing--;
  if (state.bonusRing <= radius) isGoingDown = false;
  if (state.bonusRing < Math.floor(radius * 1.7) && !isGoingDown)
    state.bonusRing += state.bonusRing / 20;
  if (state.bonusRing >= Math.floor(radius * 1.7)) isGoingDown = true;
};

export default swingBonusRing;
