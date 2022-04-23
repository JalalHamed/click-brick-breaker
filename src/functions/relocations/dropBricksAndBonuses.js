// Configs
import { BRICK_AND_BONUS_BOUNCE_SIZE as B_A_B_B_S } from '../../config.js';
// State
import state from '../../state.js';

let isGoingDown = true;

const dropBricksAndBonuses = () => {
  [...state.bricks, ...state.bonuses].forEach(item => {
    const posY = Math.round(item.pos.y);
    const posNextY = Math.round(item.pos.nextY);

    if (posY < posNextY + B_A_B_B_S && isGoingDown) item.pos.y += 5;
    if (posY >= posNextY + B_A_B_B_S && isGoingDown) isGoingDown = false;
    if (posY > posNextY && !isGoingDown) item.pos.y -= 1;
    if (posY === posNextY && !isGoingDown) {
      isGoingDown = true;
      state.areBricksAndBonusesMoving = false;
    }
  });

  if (state.areBricksAndBonusesMoving === false)
    [...state.bricks, ...state.bonuses].forEach(item => item.goDownOneRow());
};

export default dropBricksAndBonuses;
