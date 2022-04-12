// Configs
import { COLORS, SIZES, C } from '../config.js';
// State
import { state } from '../state.js';

export default class Bonus {
  constructor(props) {
    this.props = props;

    this.r = SIZES.ball.radius;
    this.swingR = SIZES.ball.radius;
    this.isGoingDown = true;
    this.counter = 0;

    this.pos = {
      x: state.grid[props.index] + SIZES.brick.width / 2,
      y:
        SIZES.border.margin +
        SIZES.border.height +
        SIZES.brick.height +
        SIZES.brick.height / 2,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  swingRadius() {
    if (this.swingR > this.r && this.isGoingDown) this.swingR--;
    if (this.swingR === this.r) this.isGoingDown = false;
    if (this.swingR < this.r * 2 && !this.isGoingDown) this.swingR++;
    if (this.swingR === this.r * 2) this.isGoingDown = true;
  }

  draw() {
    // bonus ball
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    C.fillStyle = COLORS.ball.bonus;
    C.fill();

    // bonus ball's border wrapper
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.swingR, 0, 2 * Math.PI);
    C.lineWidth = SIZES.border.height;
    C.strokeStyle = COLORS.ball.bonus;
    C.stroke();
  }

  render() {
    this.counter++;
    if (this.counter % 5 === 0) this.swingRadius();
  }

  update() {
    this.pos.y += this.velocity.y;
  }

  repoSize() {
    const { border, ball, brick } = SIZES;

    this.pos = {
      x: state.grid[this.props.index] + brick.width / 2,
      y: border.margin + border.height + brick.height + brick.height / 2,
    };

    this.r = ball.radius;
  }
}
