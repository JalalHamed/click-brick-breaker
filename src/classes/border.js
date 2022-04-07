// Config
import { SIZES } from '../modules/config.js';

export default class Border {
  constructor(props) {
    this.props = props;
    const { status, canvas } = props;

    this.pos = {
      x: 0,
      y:
        status === 'top'
          ? SIZES.border.margin
          : canvas.height - SIZES.border.margin,
    };

    this.width = canvas.width;
    this.height = SIZES.border.height;
  }

  draw() {
    const { c, canvas } = this.props;

    this.width = canvas.width;
    c.fillStyle = '#000';
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  repoSize() {
    const { canvas } = this.props;

    this.width = canvas.width;
    this.height = SIZES.border.height;
  }
}
