// Functions
import { getBrickYPos } from '../functions/helpers.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import state from '../state.js';

export default class Brick {
  constructor(props) {
    this.props = props;

    this.pos = {
      x: state.grid.row[props.gridRowIndex],
      y: getBrickYPos(props.gridColumnIndex),
      nextY: getBrickYPos(props.gridColumnIndex + 1),
    };

    this.weight = props.weight;
  }

  nextRound() {
    this.props.gridColumnIndex++;
    this.pos.y = getBrickYPos(this.props.gridColumnIndex);
    this.pos.nextY = getBrickYPos(this.props.gridColumnIndex + 1);
  }

  draw() {
    const { width, height } = SIZES.brick;
    C.fillStyle = COLORS.brick;
    C.fillRect(this.pos.x, this.pos.y, width, height);
    C.font = `${SIZES.font}rem play`;
    C.fillStyle = '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(this.weight, this.pos.x + width / 2, this.pos.y + height / 2);
  }

  repoSize() {
    this.pos = {
      x: state.grid.row[this.props.gridRowIndex],
      y: getBrickYPos(this.props.gridColumnIndex),
      nextY: getBrickYPos(this.props.gridColumnIndex + 1),
    };
  }
}
