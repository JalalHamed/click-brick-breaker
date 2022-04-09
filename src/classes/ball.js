// Config
import { COLORS, SIZES } from '../modules/config.js';
// Utils
import { storage } from '../modules/utils.js';

export default class Ball {
  constructor(props) {
    this.props = props;
    const { canvas, velocity, delay } = props;

    this.r = SIZES.ball.radius;

    this.pos = {
      x: storage.get()?.ball || canvas.width / 2,
      y: canvas.height - SIZES.border.margin - this.r,
    };

    this.velocity = {
      x: velocity?.x || 0,
      y: velocity?.y || 0,
    };

    this.delay = delay || 0;

    this.canvasWidthTracker = canvas.width;
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
    const { canvas } = this.props;

    console.log('tracker', this.canvasWidthTracker);
    console.log('current', canvas.width);
    console.log('ball x pos', this.pos.x);

    this.pos = {
      ...this.pos,
      x: (canvas.width * this.pos.x) / this.canvasWidthTracker,
    };

    storage.set({ ball: this.pos.x });

    this.r = SIZES.ball.radius;
  }
}
