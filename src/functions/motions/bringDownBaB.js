// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

let isGoingDown = true;

const bringDownBricksAndBonuses = () => {
  [...state.bricks, ...state.bonuses].forEach(item => {
    const posY = Math.round(item.pos.y);
    const posNextY = Math.round(item.pos.nextY);

    if (posY < posNextY + SIZES.BaB_bounce && isGoingDown) item.pos.y += 5;
    if (posY >= posNextY + SIZES.BaB_bounce && isGoingDown) isGoingDown = false;
    if (posY > posNextY && !isGoingDown) item.pos.y -= 1;
    if (posY === posNextY && !isGoingDown) {
      isGoingDown = true;
      state.isMoving.BaB = false;
    }
  });

  if (!state.isMoving.BaB)
    [...state.bricks, ...state.bonuses].forEach(item => item.updateYPos());
};

export default bringDownBricksAndBonuses;
