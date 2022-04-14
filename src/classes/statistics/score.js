// Classes
import Statistics from './Statistics.js';
import record from './record.js';
// Configs
import { C, CANVAS } from '../../config.js';
// State
import { state } from '../../state.js';

class Score extends Statistics {
  constructor() {
    super();
    this.status = 'Score';
    this.pos.y = record.pos.y + 37;
    this.count = state.getLS('score') || 1;
  }

  repoSize() {
    this.pos = {
      x: CANVAS.width / 2 + 70,
      y: record.pos.y + 35,
    };
  }
}

export default new Score();
