// Classes
import Border from './Border.js';
// Configs
import { SIZES, CANVAS } from '../../utils/config.js';

class BottomBorder extends Border {
  constructor() {
    super();
    this.pos.y = CANVAS.height - SIZES.border.margin;
  }
}

export default new BottomBorder();
