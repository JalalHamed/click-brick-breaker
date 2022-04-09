// Config
import { SIZES, CANVAS, C } from '../modules/config.js';

export default class Detail {
  constructor(props) {
    this.props = props;
    const { state, status } = props;
    const { height } = SIZES.brick;

    this.pos = {
      x: CANVAS.width / 2 + 80,
      y: status === 'RECORD' ? height * 1.3 : height * 1.3 + height,
    };

    const count = status === 'RECORD' ? state?.record : state?.score;
    this.count = count || 1;
  }

  draw() {
    const { status } = this.props;

    C.font = `2rem play`;
    C.fillStyle = '#000';
    C.textAlign = 'right';
    C.textBaseline = 'middle';
    C.fillText(`${status}: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }

  repoSize({ status }) {
    const { height } = SIZES.brick;

    this.pos = {
      x: CANVAS.width / 2 + 75,
      y: status === 'record' ? height * 1.3 : height * 1.3 + height,
    };
  }
}
