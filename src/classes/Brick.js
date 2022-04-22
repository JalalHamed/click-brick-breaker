// Constructor Instances
import score from './statistics/score.js';
import topBorder from './borders/topBorder.js';
// Configs
import { SIZES, C } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI => topBorder.heightFromTop + state.grid.column[gCI];

export default class Brick {
  constructor(props) {
    this.props = props;

    this.id = state.brickID;
    state.brickID++;

    this.gridColumnIndex = 1;
    this.gridRowIndex = props.gridRowIndex;

    this.pos = {
      x: state.grid.row[this.gridRowIndex],
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.gridColumnIndex + 1),
    };

    this.weight = score.count;
  }

  nextRound() {
    this.gridColumnIndex++;
    this.pos.y = calcYPos(this.gridColumnIndex);
    this.pos.nextY = calcYPos(this.gridColumnIndex + 1);
  }

  getRGB(color) {
    // heaviest: 'rgb(240, 80, 80)' & lightest: 'rgb(240, 160, 120)'
    const difference = score.count - this.weight;
    const coefficient = color === 'green' ? 80 : 40;
    const x = coefficient / (score.count - 1);
    if (difference > 0) return 80 + difference * x;
    else return 80;
  }

  draw() {
    const { width, height } = SIZES.brick;
    C.fillStyle = `rgb(240, ${this.getRGB('green')}, ${this.getRGB('red')})`;
    C.fillRect(this.pos.x, this.pos.y, width, height);
    C.font = `${SIZES.font}rem play`;
    C.fillStyle = '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(this.weight, this.pos.x + width / 2, this.pos.y + height / 2);
  }

  repoSize() {
    this.pos = {
      x: state.grid.row[this.gridRowIndex],
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.props.gridColumnIndex + 1),
    };
  }
}
