// Config
import { SIZES } from '../modules/config.js';

export default class Border {
  constructor(props) {
    this.props = props;
    const { status, canvas } = props;
    const { _border } = SIZES;

    this.pos = {
      x: 0,
      y: status === 'top' ? _border.margin : canvas.height - _border.margin,
    };

    this.width = canvas.width;
    this.height = _border.height;
  }

  draw() {
    const { c, canvas } = this.props;

    this.width = canvas.width;
    c.fillStyle = '#000';
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  repoSize({ _border }) {
    const { canvas } = this.props;

    this.width = canvas.width;
    this.height = _border.height;
  }
}
