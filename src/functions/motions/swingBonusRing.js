// Configs
import { SIZES, BONUS_RING_MIN_ADD as B_R_M_A } from '../../config.js';

const numbers = [];
const diff =
  Math.round(SIZES.bonus.ring.max) - Math.round(SIZES.bonus.ring.min);
const diffSum = Array.from(Array(diff).keys()).reduce((acc, cur) => acc + cur);
const add = diff / 2 / diffSum;
for (let i = 0; i < diff; i++) numbers.push(B_R_M_A + add * i);

let isGoingDown = false;
let counter = diff - 1;

const swingBonusRing = () => {
  if (SIZES.bonus.ring.radius < SIZES.bonus.ring.max && !isGoingDown) {
    SIZES.bonus.ring.radius += numbers[counter];
    if (counter) counter--;
  }
  if (SIZES.bonus.ring.radius > SIZES.bonus.ring.min && isGoingDown) {
    SIZES.bonus.ring.radius -= numbers[counter];
    if (counter < diff - 1) counter++;
  }

  if (SIZES.bonus.ring.radius <= SIZES.bonus.ring.min) isGoingDown = false;
  if (SIZES.bonus.ring.radius >= SIZES.bonus.ring.max) isGoingDown = true;
};

export default swingBonusRing;
