// Classes
import Border from '../parents/Border.js';
// Configs
import { SIZES, CANVAS } from '../../utils/config.js';

class TobBorder extends Border {
  constructor() {
    super();
    this.pos.y = CANVAS.height - SIZES.border.margin;
  }
}

export default new TobBorder();
