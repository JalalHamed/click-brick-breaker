// Config
import { COLORS, SIZES } from '../modules/config.js';

export default class Coefficient {
  constructor(props) {
    this.props = props;
    const { state, ball } = props;
    const { _border } = SIZES;

    this.count = state?.coefficient || 1;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + _border.height + ball.r * 3,
    };
  }

  draw() {
    const { c } = this.props;

    c.font = `1.5rem play`;
    c.fillStyle = this.count > 0 ? COLORS.ball : '#fff';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  decreaseCount() {
    this.count--;
  }

  regainCount() {
    this.count = this.props.state?.coefficient || 1;
  }

  repoSize() {
    // prettier-ignore
    const { ball } = this.props;
    const { _border } = SIZES;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + _border.height + ball.r * 3,
    };
  }
}
