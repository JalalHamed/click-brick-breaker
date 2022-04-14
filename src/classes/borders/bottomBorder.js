// Classes
import Border from './Border.js';
// Configs
import { SIZES, CANVAS } from '../../config.js';

class BottomBorder extends Border {
  constructor() {
    super();
    this.pos.y = CANVAS.height - SIZES.border.margin;
  }

  repoSize() {
    this.width = CANVAS.width;
    this.height = SIZES.border.height;
    this.pos.y = CANVAS.height - SIZES.border.margin;
  }
}

export default new BottomBorder();
