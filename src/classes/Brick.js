// Classes
import topBorder from './borders/topBorder.js';
// Functions
import { getFontSize } from '../functions/helpers.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import { state } from '../state.js';

export default class Brick {
  constructor(props) {
    this.props = props;

    this.index = props.index;

    this.pos = {
      x: state.grid[this.index],
      y: topBorder.heightFromTop + SIZES.brick.height, // must be greater/less than the topBorder/bottomBorder's y pos +/- the border height
    };

    this.weight = props.weight;
  }

  draw() {
    const { width, height } = SIZES.brick;
    C.fillStyle = COLORS.brick;
    C.fillRect(this.pos.x, this.pos.y, width, height);
    C.font = `${getFontSize()}rem play`;
    C.fillStyle = '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(this.weight, this.pos.x + width / 2, this.pos.y + height / 2);
  }

  repoSize() {
    this.pos.x = state.grid[this.props.index];
  }
}
