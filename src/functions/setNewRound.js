// Classes
import Brick from '../classes/Brick.js';
import Bonus from '../classes/Bonus.js';
// Constructor Instances
import score from '../classes/statistics/score.js';
import record from '../classes/statistics/record.js';
// State
import state from '../state.js';
import generateBricksAndBonus from './generateBricksAndBonus.js';

const setNewRound = () => {
  let isDone = { bricks: false, bonuses: false };

  // Bring down bricks
  state.bricks.forEach(brick => {
    if (brick.pos.y < brick.pos.nextY) brick.pos.y += 3;
    else {
      brick.nextRound();
      isDone.bricks = true;
    }
  });

  // Bring down bonus balls
  state.bonuses.forEach(bonus => {
    if (bonus.pos.y < bonus.pos.nextY) bonus.pos.y += 3;
    else {
      bonus.nextRound();
      isDone.bonuses = true;
    }
  });

  if (isDone.bricks && isDone.bonuses) {
    // Increase score and record (if necessary)
    score.addOne();
    if (record.count < score.count) record.addOne();

    generateBricksAndBonus();

    state.isSettingNewRound = false;
  }
};

export default setNewRound;
