// State
import state from '../state.js';

const newRound = () => {
  let isDone = { bricks: false, bonuses: false };

  state.bricks.forEach(brick => {
    if (brick.pos.y < brick.pos.nextY) brick.pos.y += 5;
    else {
      brick.nextRound();
      isDone.bricks = true;
    }
  });

  state.bonuses.forEach(bonus => {
    if (bonus.pos.y < bonus.pos.nextY) bonus.pos.y += 5;
    else {
      bonus.nextRound();
      isDone.bonuses = true;
    }
  });

  if (isDone.bricks && isDone.bonuses) state.isSettingsNewRound = false;
};

export default newRound;
