// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

let isGoingDown = false;

const swingBonusRing = () => {
  const { radius } = SIZES.ball;
  if (state.bonusRing > radius && isGoingDown) state.bonusRing--;
  if (state.bonusRing === radius) isGoingDown = false;
  if (state.bonusRing < Math.floor(radius * 1.7) && !isGoingDown)
    state.bonusRing++;
  if (state.bonusRing === Math.floor(radius * 1.7)) isGoingDown = true;
};

export default swingBonusRing;
