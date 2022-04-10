// Classes
import Statistics from './Statistics.js';
// Configs
import { SIZES, C } from '../../utils/config.js';
// Helpers
import { storage } from '../../utils/helpers.js';

class Record extends Statistics {
  constructor() {
    super();
    this.status = 'Record';
    this.pos.y = SIZES.brick.height * 1.3;
    this.count = storage.get()?.record || 1;
  }
}

export default new Record();
