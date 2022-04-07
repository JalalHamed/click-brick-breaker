// Config
import { COLORS, SIZES } from '../modules/config.js';

export default class Bonus {
  constructor(props) {
    this.props = props;
    // prettier-ignore
    const { state, yVelocity, index, grid, counter } = props;
    const { _border, _ball, _brick } = SIZES;

    this.r = _ball.radius;
    this.swingR = _ball.radius;
    this.isGoingDown = true;
    this.counter = 0;

    this.pos = {
      x: grid[index] + _brick.width / 2,
      y: _border.margin + _border.height + _brick.height + _brick.height / 2,
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
    c.lineWidth = SIZES._border.height;
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

  repoSize({ SIZES: { _border, _ball, _brick }, grid }) {
    this.pos = {
      x: grid[this.props.index] + _brick.width / 2,
      y: _border.margin + _border.height + _brick.height + _brick.height / 2,
    };

    this.r = _ball.radius;
  }
}
