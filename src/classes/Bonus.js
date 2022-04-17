// Classes
import topBorder from './borders/topBorder.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import state from '../state.js';

export default class Bonus {
  constructor(props) {
    this.props = props;
    this.isGoingDown = true;
    this.ring = SIZES.ball.radius;

    this.pos = {
      x: state.grid.row[props.gridRowIndex] + SIZES.brick.width / 2,
      y:
        topBorder.heightFromTop +
        SIZES.brick.height / 2 +
        state.grid.column[props.gridColumnIndex],
    };
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
      x: state.grid.row[this.props.gridRowIndex] + SIZES.brick.width / 2,
      y:
        topBorder.heightFromTop +
        SIZES.brick.height / 2 +
        state.grid.column[this.props.gridColumnIndex],
    };

    this.r = SIZES.ball.radius;
  }
}
