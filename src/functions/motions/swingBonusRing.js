// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

const swingBonusRing = () => {
  if (
    SIZES.bonus.radius > SIZES.projectile.radius &&
    state.bonusRingStatus === 'dwindle'
  )
    SIZES.bonus.radius--;
  if (SIZES.bonus.radius <= SIZES.projectile.radius)
    state.bonusRingStatus = 'widen';
  if (
    SIZES.bonus.radius < SIZES.bonus.maxRadius &&
    state.bonusRingStatus === 'widen'
  )
    SIZES.bonus.radius += SIZES.bonus.radius / 20;
  if (SIZES.bonus.radius >= SIZES.bonus.maxRadius)
    state.bonusRingStatus = 'dwindle';
};

export default swingBonusRing;
