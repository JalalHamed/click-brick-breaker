// State
import state from '../state.js';

const newRound = () => {
  console.log('render');
  state.bricks.forEach(brick => {
    if (brick.pos.y < brick.pos.nextY) brick.pos.y += 5;
    else {
      brick.props.gridColumnIndex++;
      brick.setNextY();
      state.isSettingsNewRound = false;
    }
  });
};

export default newRound;
