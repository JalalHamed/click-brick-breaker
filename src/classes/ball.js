// Config
import { COLORS, SIZES } from '../modules/config.js';

export default class Ball {
  constructor(props) {
    this.props = props;
    const { state, canvas, velocity, delay } = props;
    const { _border, _ball } = SIZES;

    this.r = _ball.radius;

    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: canvas.height - _border.margin - this.r,
    };

    this.velocity = {
      x: velocity?.x || 0,
      y: velocity?.y || 0,
    };

    this.delay = delay || 0;
  }

  draw() {
    const { c } = this.props;

    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = COLORS.ball;
    c.fill();
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  repoSize() {
    const { state, canvas } = this.props;
    const { _border, _ball } = SIZES;

    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: canvas.height - _border.margin - this.r,
    };

    this.r = _ball.radius;
  }
}
