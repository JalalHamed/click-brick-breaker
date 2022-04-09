// Config
import { SIZES, CANVAS, C } from '../modules/config.js';

export default class Border {
  constructor(props) {
    this.props = props;
    const { status } = props;

    this.pos = {
      x: 0,
      y:
        status === 'top'
          ? SIZES.border.margin
          : CANVAS.height - SIZES.border.margin,
    };

    this.width = CANVAS.width;
    this.height = SIZES.border.height;
  }

  draw() {
    this.width = CANVAS.width;
    C.fillStyle = '#000';
    C.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  repoSize() {
    this.width = CANVAS.width;
    this.height = SIZES.border.height;
  }
}
