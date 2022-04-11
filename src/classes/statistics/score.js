// Classes
import Statistics from './Statistics.js';
// Configs
import { SIZES, C, CANVAS } from '../../config.js';
// State
import { state } from '../../state.js';

const { height } = SIZES.brick;

class Score extends Statistics {
  constructor() {
    super();
    this.status = 'Score';
    this.pos.y = height * 1.3 + height;
    this.count = state.getLocalStorage()?.score || 1;
  }

  repoSize() {
    const { height } = SIZES.brick;

    this.pos = {
      x: CANVAS.width / 2 + 75,
      y: height * 1.3 + height,
    };
  }
}

export default new Score();
