// Classes
import score from './statistics/score.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import { state } from '../state.js';

export default class Brick {
  constructor(props) {
    this.props = props;
    const { width, height } = SIZES.brick;

    this.pos = {
      x: state.grid[props.index],
      y: SIZES.border.margin + SIZES.border.height + height, // must be greater/less than the topBorder/bottomBorder's y pos +/- the border height
    };

    this.weight = score.count;
  }

  draw() {
    const { width, height } = SIZES.brick;
    C.fillStyle = COLORS.brick;
    C.fillRect(this.pos.x, this.pos.y, width, height);
    C.font = `1.5rem play`;
    C.fillStyle = '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(this.weight, this.pos.x + width / 2, this.pos.y + height / 2);
  }

  repoSize() {
    this.pos = {
      ...this.pos,
      x: state.grid[this.props.index],
    };
  }
}
