// Classes
import Statistics from '../parents/Statistics.js';
// Configs
import { SIZES, C } from '../../utils/config.js';
// Helpers
import { storage } from '../../utils/helpers.js';

const { height } = SIZES.brick;

class Score extends Statistics {
  constructor() {
    super();
    this.status = 'Score';
    this.pos.y = height * 1.3 + height;
    this.count = storage.get()?.score || 1;
  }
}

export default new Score();
