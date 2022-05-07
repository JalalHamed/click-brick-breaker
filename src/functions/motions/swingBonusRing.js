// Configs
import { SIZES, BONUS_RING_MIN_ADD as B_R_M_A } from '../../config.js';
// State
import state from '../../state.js';

const { min, max } = SIZES.bonus.ring;
const numbers = [];
const diff = Math.round(max) - Math.round(min);
const diffSum = Array.from(Array(diff).keys()).reduce((acc, cur) => acc + cur);
const add = diff / 2 / diffSum;
for (let i = 0; i < diff; i++) numbers.push(B_R_M_A + add * i);

let isGoingDown = false;
let counter = diff - 1;

const swingBonusRing = () => {
  if (state.bonusRingRadius < max && !isGoingDown) {
    state.bonusRingRadius += numbers[counter];
    if (counter) counter--;
  }
  if (state.bonusRingRadius > min && isGoingDown) {
    state.bonusRingRadius -= numbers[counter];
    if (counter < diff - 1) counter++;
  }

  if (state.bonusRingRadius <= min) isGoingDown = false;
  if (state.bonusRingRadius >= max) isGoingDown = true;
};

export default swingBonusRing;
