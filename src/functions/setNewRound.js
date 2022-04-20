// Constructor Instances
import score from '../classes/statistics/score.js';
import record from '../classes/statistics/record.js';
// State
import state from '../state.js';

const setNewRound = () => {
  let isDone = { bricks: false, bonuses: false };

  // Bring down bricks
  state.bricks.forEach(brick => {
    if (brick.pos.y < brick.pos.nextY) brick.pos.y += 5;
    else {
      brick.nextRound();
      isDone.bricks = true;
    }
  });

  // Bring down bonus balls
  state.bonuses.forEach(bonus => {
    if (bonus.pos.y < bonus.pos.nextY) bonus.pos.y += 5;
    else {
      bonus.nextRound();
      isDone.bonuses = true;
    }
  });

  if (isDone.bricks && isDone.bonuses) {
    score.addOne();
    if (record.count < score.count) record.addOne();
    state.isSettingNewRound = false;
  }
};

export default setNewRound;
