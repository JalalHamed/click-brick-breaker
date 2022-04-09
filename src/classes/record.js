// Classes
import Statistics from './Statistics.js';
// Configs
import { SIZES } from '../utils/config.js';

class Record extends Statistics {
  constructor() {
    super();
    this.pos.y = SIZES.brick.height * 1.3;
  }
}

export default new Record();
