// Configs
import { BRICKS_AND_BONUSES_BOUNCE_SIZE as B_A_B_B_S } from '../config.js';
// State
import state from '../state.js';

let isGoingDown = true;
let hasCalculatedSteps = false;

const loweringBricksAndBonuses = () => {
  const velocity = 7;
  const bricksAndBonuses = [...state.bricks, ...state.bonuses].filter(
    item => item.mode === 'lower'
  );

  bricksAndBonuses.forEach(item => {
    if (item.pos.y < item.pos.nextY + B_A_B_B_S && isGoingDown)
      item.pos.y += velocity;
    else if (item.pos.y - velocity > item.pos.nextY) {
      item.pos.y -= velocity;
      isGoingDown = false;
    } else {
      isGoingDown = true;
      hasCalculatedSteps = false;
      bricksAndBonuses.forEach(item => (item.mode = 'stable'));
    }
  });

  if (bricksAndBonuses.every(item => item.mode === 'stable'))
    bricksAndBonuses.forEach(item => item.updateYPos());
};

export default loweringBricksAndBonuses;
