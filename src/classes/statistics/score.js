// Classes
import { Statistics, record } from '../exports.js';
// Configs
import { C, CANVAS, SIZES } from '../../config.js';
// State
import state from '../../state.js';

class Score extends Statistics {
  constructor() {
    super();
    this.status = 'Score';
    this.pos.y = record.pos.y + 15 * SIZES.font;
    this.count = 1;
  }

  repoSize() {
    this.pos = {
      x: CANVAS.width / 2,
      y: record.pos.y + 15 * SIZES.font,
    };
  }
}

export default new Score();
