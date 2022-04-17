// Classes
import topBorder from './borders/topBorder.js';
// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import state from '../state.js';

export default class Bonus {
  constructor(props) {
    this.props = props;
    this.r = SIZES.ball.radius;
    this.ringR = SIZES.ball.radius;
    this.isGoingDown = true;
    this.counter = 0;
    this.gridRowIndex = props.gridRowIndex;

    this.pos = {
      x: state.grid.row[props.gridRowIndex] + SIZES.brick.width / 2,
      y:
        topBorder.heightFromTop +
        SIZES.brick.height +
        SIZES.brick.height / 2 +
        props.gridColumnIndex,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  ringRadius() {
    if (this.ringR > this.r && this.isGoingDown) this.ringR--;
    if (this.ringR === this.r) this.isGoingDown = false;
    if (this.ringR < this.r * 2 && !this.isGoingDown) this.ringR++;
    if (this.ringR === this.r * 2) this.isGoingDown = true;
  }

  draw() {
    // bonus ball
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    C.fillStyle = COLORS.ball.bonus;
    C.fill();

    // bonus ball's ring
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.ringR, 0, 2 * Math.PI);
    C.lineWidth = SIZES.border.height;
    C.strokeStyle = COLORS.ball.bonus;
    C.stroke();
  }

  render() {
    this.counter++;
    if (this.counter % 5 === 0) this.ringRadius();
  }

  update() {
    this.pos.y += this.velocity.y;
  }

  repoSize() {
    this.pos = {
      x: state.grid[this.props.gridRowIndex] + SIZES.brick.width / 2,
      y: topBorder.heightFromTop + SIZES.brick.height + SIZES.brick.height / 2,
    };

    this.r = SIZES.ball.radius;
  }
}
