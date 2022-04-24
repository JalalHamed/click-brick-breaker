// Constructor Instances
import topBorder from './borders/topBorder.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI =>
  topBorder.heightFromTop + SIZES.brick.height / 2 + state.grid.column[gCI];

export default class Bonus {
  constructor(props) {
    this.props = props;

    this.id = state.bonusID;
    state.bonusID++;
    this.displayRing = true;
    this.gridColumnIndex = 0;
    this.gridRowIndex = this.props.gridRowIndex;

    this.pos = {
      x: state.grid.row[this.gridRowIndex] + SIZES.brick.width / 2,
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.gridColumnIndex + 1),
    };
  }

  updateYPos() {
    this.gridColumnIndex++;
    this.pos.y = calcYPos(this.gridColumnIndex);
    this.pos.nextY = calcYPos(this.gridColumnIndex + 1);
  }

  draw() {
    // bonus
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, SIZES.projectile.radius, 0, 2 * Math.PI);
    C.fillStyle = COLORS.bonus;
    C.fill();

    // bonus' ring
    if (this.displayRing) {
      C.beginPath();
      C.setLineDash([]);
      C.arc(this.pos.x, this.pos.y, state.bonusRing, 0, 2 * Math.PI);
      C.lineWidth = SIZES.border.height;
      C.strokeStyle = COLORS.bonus;
      C.stroke();
    }
  }

  repoSize() {
    this.pos = {
      x: state.grid.row[this.gridRowIndex] + SIZES.brick.width / 2,
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.props.gridColumnIndex + 1),
    };

    state.bonusRing = SIZES.projectile.radius;
  }
}
