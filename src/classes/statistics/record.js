// Classes
import Statistics from './Statistics.js';
// Configs
import { SIZES, C } from '../../config.js';
// Helpers
import { storage } from '../../functions/helpers.js';

class Record extends Statistics {
  constructor() {
    super();
    this.status = 'Record';
    this.pos.y = SIZES.brick.height * 1.3;
    this.count = storage.get()?.record || 1;
  }

  repoSize() {
    const { height } = SIZES.brick;

    this.pos = {
      x: CANVAS.width / 2 + 75,
      y: height * 1.3,
    };
  }
}

export default new Record();
