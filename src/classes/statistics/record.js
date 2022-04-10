// Classes
import Statistics from './Statistics.js';
// Configs
import { SIZES, C, CANVAS } from '../../config.js';
// Storage
import { storage } from '../../state.js';

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
