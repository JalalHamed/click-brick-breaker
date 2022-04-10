// Classes
import Border from './Border.js';
// Configs
import { SIZES } from '../../config.js';

class TobBorder extends Border {
  constructor() {
    super();
    this.pos.y = SIZES.border.margin;
  }
}

export default new TobBorder();
