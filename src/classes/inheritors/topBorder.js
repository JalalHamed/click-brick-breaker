// Classes
import Border from '../parents/Border.js';
// Configs
import { SIZES } from '../../utils/config.js';

class TobBorder extends Border {
  constructor() {
    super();
    this.pos.y = SIZES.border.margin;
  }
}

export default new TobBorder();
