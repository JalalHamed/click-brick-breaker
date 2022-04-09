// Config
import { COLORS, SIZES, C } from '../modules/config.js';
// Utils
import { storage } from '../modules/utils.js';

export default class Coefficient {
  constructor(props) {
    this.props = props;
    const { ball } = props;

    this.count = storage.get()?.coefficient || 1;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + SIZES.border.height + ball.r * 3,
    };
  }

  draw() {
    C.font = `1.5rem play`;
    C.fillStyle = this.count > 0 ? COLORS.ball : '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  decreaseCount() {
    this.count--;
  }

  regainCount() {
    this.count = this.props.storage.get()?.coefficient || 1;
  }

  repoSize() {
    const { ball } = this.props;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + SIZES.border.height + ball.r * 3,
    };
  }
}
