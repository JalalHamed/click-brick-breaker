// Classes
import topBorder from './borders/topBorder.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import state from '../state.js';

// TEMP IMPORT, MAKE SURE TO DELETE LATER
import bottomBorder from './borders/bottomBorder.js';

export default class Brick {
  constructor(props) {
    this.props = props;

    this.pos = {
      x: state.grid.row[props.gridRowIndex],
      y: topBorder.heightFromTop + state.grid.column[props.gridColumnIndex],
    };

    this.weight = props.weight;
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
      y:
        topBorder.heightFromTop + state.grid.column[this.props.gridColumnIndex],
    };
  }
}
