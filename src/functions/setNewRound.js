// Classes
import Brick from '../classes/Brick.js';
import Bonus from '../classes/Bonus.js';
// Constructor Instances
import score from '../classes/statistics/score.js';
import record from '../classes/statistics/record.js';
// State
import state from '../state.js';
import generateBricksAndBonus from './generateBricksAndBonus.js';
// Configs
import { BRICK_AND_BONUS_BOUNCE_SIZE as B_A_B_B_S } from '../config.js';

let isGoingDown = true;

const setNewRound = () => {
  let isDone = false;

  // Bring down bricks and bonus balls 1 row
  [...state.bricks, ...state.bonuses].forEach(item => {
    const posY = Math.round(item.pos.y);
    const posNextY = Math.round(item.pos.nextY);

    if (posY < posNextY + B_A_B_B_S && isGoingDown) item.pos.y += 5;
    if (posY >= posNextY + B_A_B_B_S && isGoingDown) isGoingDown = false;
    if (posY > posNextY && !isGoingDown) item.pos.y -= 1;
    if (posY === posNextY && !isGoingDown) {
      isDone = true;
      isGoingDown = true;
    }
  });

  if (isDone) {
    [...state.bricks, ...state.bonuses].forEach(item => item.nextRound());

    // Increase score (and record if necessary)
    score.addOne();
    if (record.count < score.count) record.addOne();

    generateBricksAndBonus();

    state.isSettingNewRound = false;
  }
};

export default setNewRound;
