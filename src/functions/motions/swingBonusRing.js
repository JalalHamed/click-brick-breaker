// Configs
import { SIZES } from '../../config.js';

let isGoingDown = false;

const swingBonusRing = () => {
  if (SIZES.bonus.radius > SIZES.projectile.radius && isGoingDown)
    SIZES.bonus.radius--;
  if (SIZES.bonus.radius <= SIZES.projectile.radius) isGoingDown = false;
  if (SIZES.bonus.radius < SIZES.bonus.maxRadius && !isGoingDown)
    SIZES.bonus.radius += SIZES.bonus.radius / 20;
  if (SIZES.bonus.radius >= SIZES.bonus.maxRadius) isGoingDown = true;
};

export default swingBonusRing;
