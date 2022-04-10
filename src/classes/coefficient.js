// Configs
import { COLORS, SIZES, C } from '../utils/config.js';
// Helpers
import { storage } from '../utils/helpers.js';

export default class Coefficient {
  constructor(props) {
    this.props = props;
    const { mainBall } = props;

    this.count = storage.get()?.coefficient || 1;

    this.pos = {
      x: mainBall.pos.x,
      y: mainBall.pos.y + SIZES.border.height + mainBall.r * 3,
    };
  }

  draw() {
    C.font = `1.5rem play`;
    C.fillStyle = this.count > 0 ? COLORS.ball.main : '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  decreaseCount() {
    this.count--;
  }

  regainCount() {
    this.count = storage.get()?.coefficient || 1;
  }

  repoSize() {
    const { ball } = this.props;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + SIZES.border.height + ball.r * 3,
    };
  }
}
