// Configs
import { BRICKS_AND_BONUSES_BOUNCE_SIZE as B_A_B_B_S } from '../../config.js';
// State
import state from '../../state.js';

let isGoingDown = true;

const bringDownBricksAndBonuses = () => {
  const velocity = 5;
  const BricksAndBonuses = [
    ...state.bricks,
    ...state.bonuses.filter(bonus => bonus.mode === 'stable'),
  ];

  BricksAndBonuses.forEach(item => {
    if (item.pos.y < item.pos.nextY + B_A_B_B_S && isGoingDown)
      item.pos.y += velocity;
    else if (item.pos.y - velocity > item.pos.nextY) {
      item.pos.y -= velocity;
      isGoingDown = false;
    } else {
      isGoingDown = true;
      state.isBringingDown.bricks = false;
      state.isBringingDown.bonuses = false;
    }
  });

  if (!state.isBringingDown.bricks && !state.isBringingDown.bonuses)
    BricksAndBonuses.forEach(item => item.updateYPos());
};

export default bringDownBricksAndBonuses;
