// Constructor Instances
import topBorder from './borders/topBorder.js';
// Functions
import genID from '../functions/generators/genID.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI =>
  topBorder.heightFromTop + SIZES.brick.height / 2 + state.grid.column[gCI];

export default class Bonus {
  constructor(props) {
    this.props = props;

    this.id = genID('bonus');

    this.color = COLORS.bonus;
    this.displayRing = true;

    this.gridColumnIndex = 0;
    this.gridRowIndex = this.props.gridRowIndex;

    this.pos = {
      x: state.grid.row[this.gridRowIndex] + SIZES.brick.width / 2,
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.gridColumnIndex + 1),
    };

    this.velocity = {
      x: SIZES.projectile.radius * 1.3,
      y: 10,
    };
  }

  calcSteps() {
    this.steps = Math.floor(
      Math.abs(this.pos.x - state.projectiles[0].pos.x) / this.velocity.x
    );
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
    C.fillStyle = this.color;
    C.fill();

    // bonus' ring
    if (this.displayRing) {
      C.beginPath();
      C.setLineDash([]);
      C.arc(this.pos.x, this.pos.y, SIZES.bonus.radius, 0, 2 * Math.PI);
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
  }
}
