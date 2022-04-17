// Classes
import Statistics from './Statistics.js';
import topBorder from '../borders/topBorder.js';
// Configs
import { C, CANVAS } from '../../config.js';
// State
import state from '../../state.js';

class Record extends Statistics {
  constructor() {
    super();
    this.status = 'Record';
    this.pos.x = CANVAS.width / 2;
    this.count = state.getLS('record') || 1;
  }

  repoSize() {
    this.pos.x = CANVAS.width / 2;
  }
}

export default new Record();
