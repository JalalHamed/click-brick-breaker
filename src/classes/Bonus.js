// Constructor Instances
import topBorder from '../classes/borders/topBorder.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI =>
  topBorder.heightFromTop + SIZES.brick.height / 2 + state.grid.column[gCI];

export default class Bonus {
  constructor(props) {
    this.props = props;

    this.gridColumnIndex = 1;
    this.gridRowIndex = this.props.gridRowIndex;
    this.isGoingDown = true;
    this.ring = SIZES.ball.radius;

    this.pos = {
      x: state.grid.row[this.gridRowIndex] + SIZES.brick.width / 2,
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.gridColumnIndex + 1),
    };
  }

  nextRound() {
    this.gridColumnIndex++;
    this.pos.y = calcYPos(this.gridColumnIndex);
    this.pos.nextY = calcYPos(this.gridColumnIndex + 1);
  }

  swingRing() {
    const { radius } = SIZES.ball;
    if (this.ring > radius && this.isGoingDown) this.ring--;
    if (this.ring === radius) this.isGoingDown = false;
    if (this.ring < radius * 2 && !this.isGoingDown) this.ring++;
    if (this.ring === radius * 2) this.isGoingDown = true;
  }

  draw() {
    // bonus ball
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, SIZES.ball.radius, 0, 2 * Math.PI);
    C.fillStyle = COLORS.ball.bonus;
    C.fill();

    // bonus ball's ring
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.ring, 0, 2 * Math.PI);
    C.lineWidth = SIZES.border.height / 1.3;
    C.strokeStyle = COLORS.ball.bonus;
    C.stroke();

    // bonus ball's ring animation
    if (state.counter % 3 === 0) this.swingRing();
  }

  repoSize() {
    this.pos = {
      x: state.grid.row[this.gridRowIndex] + SIZES.brick.width / 2,
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.props.gridColumnIndex + 1),
    };

    this.r = SIZES.ball.radius;
  }
}
