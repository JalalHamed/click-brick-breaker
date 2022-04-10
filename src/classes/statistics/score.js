// Classes
import Statistics from './Statistics.js';
// Configs
import { SIZES, C, CANVAS } from '../../config.js';
// Helpers
import { storage } from '../../functions/helpers.js';

const { height } = SIZES.brick;

class Score extends Statistics {
  constructor() {
    super();
    this.status = 'Score';
    this.pos.y = height * 1.3 + height;
    this.count = storage.get()?.score || 1;
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
