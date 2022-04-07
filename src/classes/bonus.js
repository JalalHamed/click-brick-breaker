// Config
import { COLORS, SIZES } from '../modules/config.js';

export default class Bonus {
  constructor(props) {
    this.props = props;
    const { state, yVelocity, index, grid, counter } = props;

    this.r = SIZES.ball.radius;
    this.swingR = SIZES.ball.radius;
    this.isGoingDown = true;
    this.counter = 0;

    this.pos = {
      x: grid[index] + SIZES.brick.width / 2,
      y:
        SIZES.border.margin +
        SIZES.border.height +
        SIZES.brick.height +
        SIZES.brick.height / 2,
    };

    this.yVelocity = yVelocity || 0;
  }

  swingRadius() {
    if (this.swingR > this.r && this.isGoingDown) this.swingR--;
    if (this.swingR === this.r) this.isGoingDown = false;
    if (this.swingR < this.r * 2 && !this.isGoingDown) this.swingR++;
    if (this.swingR === this.r * 2) this.isGoingDown = true;
  }

  draw() {
    // prettier-ignore
    const { c, } = this.props;

    // bonus ball
    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = COLORS.bonus;
    c.fill();

    // bonus ball's border wrapper
    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.swingR, 0, 2 * Math.PI);
    c.lineWidth = SIZES.border.height;
    c.strokeStyle = COLORS.bonus;
    c.stroke();
  }

  render() {
    this.counter++;
    if (this.counter % 5 === 0) this.swingRadius();
  }

  update() {
    this.pos.y += this.yVelocity;
  }

  repoSize({ grid }) {
    const { border, ball, brick } = SIZES;

    this.pos = {
      x: grid[this.props.index] + SIZES.brick.width / 2,
      y:
        SIZES.border.margin +
        SIZES.border.height +
        SIZES.brick.height +
        SIZES.brick.height / 2,
    };

    this.r = SIZES.ball.radius;
  }
}
